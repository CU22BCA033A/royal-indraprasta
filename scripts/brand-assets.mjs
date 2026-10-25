// Builds the favicon set and the Open Graph image from the original wordmark.
// Uses sharp only; fonts come from the self-hosted OFL files (converted to TTF
// with fonttools, since the text renderer needs TTF). Run: npm run brand
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const pub = (f) => join(root, 'public', f);
const IVORY = '#F6EFE2';
const MAROON = '#6E1F2B';
const BRASS = '#B8893B';
const BRASS_TEXT = '#6F5116';
const INK = '#2A1D16';

const mark = (size, stroke, bg) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  ${bg ? `<rect width="32" height="32" fill="${bg}"/>` : ''}
  <g fill="none" stroke="${stroke}" stroke-width="1.8">
    <path d="M16 3 29 16 16 29 3 16Z"/><path d="M16 9.5 22.5 16 16 22.5 9.5 16Z"/>
    <path d="M9.5 9.5 22.5 22.5M22.5 9.5 9.5 22.5" stroke-width="1.2"/>
  </g>
</svg>`;

// Favicons
for (const [name, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(Buffer.from(mark(size, MAROON, IVORY)))
    .png()
    .toFile(pub(name));
}
const png32 = await sharp(Buffer.from(mark(32, MAROON, IVORY)))
  .png()
  .toBuffer();
// ICO container holding one PNG image.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png32.length, 8);
entry.writeUInt32LE(22, 12);
writeFileSync(pub('favicon.ico'), Buffer.concat([header, entry, png32]));

writeFileSync(
  pub('site.webmanifest'),
  JSON.stringify(
    {
      name: 'Royal Indraprastha',
      short_name: 'Indraprastha',
      start_url: '/',
      display: 'browser',
      background_color: IVORY,
      theme_color: IVORY,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ) + '\n',
);

// Open Graph image, 1200 x 630
const tmp = mkdtempSync(join(tmpdir(), 'ri-fonts-'));
const toTtf = (woff2, out) => {
  execFileSync('fonttools', ['ttLib.woff2', 'decompress', '-o', join(tmp, out), woff2]);
  return join(tmp, out);
};
const serif = toTtf(pub('fonts/young-serif-400.woff2'), 'YoungSerif.ttf');
const sans = toTtf(pub('fonts/figtree-600.woff2'), 'Figtree-600.ttf');
const text = (t, font, fontfile, size, color) =>
  sharp({
    text: {
      text: `<span foreground="${color}">${t}</span>`,
      font: `${font} ${size}`,
      fontfile,
      rgba: true,
      dpi: 72,
    },
  })
    .png()
    .toBuffer();

const W = 1200;
const H = 630;
const frame = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${IVORY}"/>
  <g stroke="${BRASS}" fill="none">
    <path d="M60 70H1140M60 76H1140M60 554H1140M60 560H1140" stroke-width="1.5"/>
  </g>
</svg>`;
const royal = await text('R O Y A L', 'Figtree Semi-Bold', sans, 30, BRASS_TEXT);
const name = await text('Indraprastha', 'Young Serif', serif, 96, INK);
const line = await text(
  'Pure vegetarian South and North Indian food, Rajarajeshwari Nagar, Bengaluru',
  'Figtree Semi-Bold',
  sans,
  26,
  MAROON,
);
const meta = async (b) => sharp(b).metadata();
const [mr, mn, ml] = await Promise.all([meta(royal), meta(name), meta(line)]);
const markSize = 170;
const markPng = await sharp(Buffer.from(mark(markSize, MAROON)))
  .png()
  .toBuffer();
const gap = 44;
const groupW = markSize + gap + Math.max(mr.width, mn.width);
const left = Math.round((W - groupW) / 2);
const textH = mr.height + 10 + mn.height;
const top = Math.round(315 - 40 - Math.max(markSize, textH) / 2);
await sharp(Buffer.from(frame))
  .composite([
    { input: markPng, left, top: top + Math.round((Math.max(markSize, textH) - markSize) / 2) },
    { input: royal, left: left + markSize + gap + 6, top: top + Math.round((Math.max(markSize, textH) - textH) / 2) },
    {
      input: name,
      left: left + markSize + gap,
      top: top + Math.round((Math.max(markSize, textH) - textH) / 2) + mr.height + 10,
    },
    { input: line, left: Math.round((W - ml.width) / 2), top: 450 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(pub('og.png'));
console.log('brand assets written', { royal: mr.width, name: mn.width, line: ml.width });
void readFileSync;
