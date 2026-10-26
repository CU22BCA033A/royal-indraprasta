// Builds the favicon set and the Open Graph image in the signboard style.
// Uses sharp only; fonts come from the self-hosted OFL files (converted to TTF
// with fonttools, because the text renderer needs TTF). Run: npm run brand
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const pub = (f) => join(root, 'public', f);
const SIGN = '#4A1219';
const CREAM = '#F3E6CF';
const CREAM_MUTED = '#D9C7A8';
const BRASS = '#D8AE62';

// Lattice diamond mark: brass strokes on the signboard colour.
const mark = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${SIGN}"/>
  <g fill="none" stroke="${BRASS}" stroke-width="1.8">
    <path d="M16 3 29 16 16 29 3 16Z"/><path d="M16 9.5 22.5 16 16 22.5 9.5 16Z"/>
    <path d="M9.5 9.5 22.5 22.5M22.5 9.5 9.5 22.5" stroke-width="1.2"/>
  </g>
</svg>`;

writeFileSync(pub('favicon.svg'), mark(32).replace(/\n\s*/g, '').replace(' width="32" height="32"', ''));
for (const [name, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(Buffer.from(mark(size)))
    .png()
    .toFile(pub(name));
}
const png32 = await sharp(Buffer.from(mark(32)))
  .png()
  .toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
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
      background_color: SIGN,
      theme_color: SIGN,
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
const display = toTtf(pub('fonts/rozha-one-400.woff2'), 'RozhaOne.ttf');
const sans = toTtf(pub('fonts/figtree-600.woff2'), 'Figtree-600.ttf');
const text = (t, font, fontfile, size, color) =>
  sharp({
    text: { text: `<span foreground="${color}">${t}</span>`, font: `${font} ${size}`, fontfile, rgba: true, dpi: 72 },
  })
    .png()
    .toBuffer();

const W = 1200;
const H = 630;
const frame = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${SIGN}"/>
  <g fill="none" stroke="${BRASS}" stroke-width="1.5">
    <rect x="48" y="48" width="${W - 96}" height="${H - 96}"/>
    <rect x="58" y="58" width="${W - 116}" height="${H - 116}"/>
    <path d="M600 40 608 48 600 56 592 48Z M600 ${H - 56} 608 ${H - 48} 600 ${H - 40} 592 ${H - 48}Z" fill="${SIGN}"/>
  </g>
</svg>`;
const royal = await text('R O Y A L', 'Figtree Semi-Bold', sans, 30, BRASS);
const name = await text('Indraprastha', 'Rozha One', display, 150, CREAM);
const line = await text(
  'Pure vegetarian · Rajarajeshwari Nagar, Bengaluru',
  'Figtree Semi-Bold',
  sans,
  30,
  CREAM_MUTED,
);
const meta = (b) => sharp(b).metadata();
const [mr, mn, ml] = await Promise.all([meta(royal), meta(name), meta(line)]);
const left = 120;
const top = Math.round((H - (mr.height + 6 + mn.height + 28 + ml.height)) / 2);
await sharp(Buffer.from(frame))
  .composite([
    { input: royal, left: left + 4, top },
    { input: name, left, top: top + mr.height + 6 },
    { input: line, left: left + 4, top: top + mr.height + 6 + mn.height + 28 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(pub('og.png'));
console.log('brand assets written', { name: mn.width, line: ml.width });
