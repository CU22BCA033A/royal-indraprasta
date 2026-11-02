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
const SIGN = '#2B1712';
const CREAM = '#F4EBDD';
const CREAM_MUTED = '#D8C6B0';
const BRASS = '#D9A947';
const BRICK = '#7A3324';

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
const display = toTtf(pub('fonts/zilla-slab-700.woff2'), 'ZillaSlab-700.ttf');
const script = toTtf(pub('fonts/yellowtail-400.woff2'), 'Yellowtail.ttf');
const sans = toTtf(pub('fonts/figtree-600.woff2'), 'Figtree-600.ttf');
const text = (t, font, fontfile, size, color) =>
  sharp({
    text: { text: `<span foreground="${color}">${t}</span>`, font: `${font} ${size}`, fontfile, rgba: true, dpi: 72 },
  })
    .png()
    .toBuffer();

const W = 1200;
const H = 630;
// Wood panel with the filigree eave trim along the top and a brick base.
const scallops = Array.from({ length: Math.ceil(W / 48) }, (_, i) => {
  const x = i * 48;
  return `<path d="M${x} 40h48v6c0 11-10.8 20-24 20S${x} 57 ${x} 46Z"/><circle cx="${x + 24}" cy="52" r="3.4" fill="${CREAM}"/>`;
}).join('');
const frame = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect y="0" width="${W}" height="40" fill="${SIGN}"/>
  <g fill="${SIGN}">${scallops}</g>
  <rect x="70" y="100" width="${W - 140}" height="${H - 190}" fill="${SIGN}"/>
  <rect y="${H - 46}" width="${W}" height="46" fill="${BRICK}"/>
  <g stroke="#6C2C1F" stroke-width="2">
    ${Array.from({ length: 3 }, (_, r) => `<path d="M0 ${H - 46 + r * 16}h${W}"/>`).join('')}
    ${Array.from({ length: 40 }, (_, i) => `<path d="M${i * 64 + (i % 2) * 32} ${H - 46}v16M${i * 64 + 32} ${H - 30}v16"/>`).join('')}
  </g>
</svg>`;
const royal = await text('Royal', 'Yellowtail', script, 92, BRASS);
const name = await text('Indraprastha', 'Zilla Slab Bold', display, 150, CREAM);
const shadow = await sharp(await text('Indraprastha', 'Zilla Slab Bold', display, 150, '#000000'))
  .blur(2.5)
  .ensureAlpha(0.55)
  .png()
  .toBuffer();
const tag = await text('Relish. Like a King', 'Yellowtail', script, 52, BRASS);
const line = await text(
  'Pure vegetarian · Rajarajeshwari Nagar, Bengaluru',
  'Figtree Semi-Bold',
  sans,
  28,
  CREAM_MUTED,
);
const meta = (b) => sharp(b).metadata();
const [mr, mn, mt] = await Promise.all([meta(royal), meta(name), meta(tag)]);
const left = 130;
const top = 158;
const nameTop = top + mr.height - 22;
await sharp(Buffer.from(frame))
  .composite([
    { input: royal, left: left + 6, top },
    { input: shadow, left: left + 6, top: nameTop + 8 },
    { input: name, left, top: nameTop },
    { input: tag, left: left + 4, top: nameTop + mn.height + 6 },
    { input: line, left: left + 4, top: nameTop + mn.height + mt.height + 22 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(pub('og.png'));

// Favicon raster set: gold script R on the wood panel.
const r = await text('R', 'Yellowtail', script, 380, BRASS);
const rm = await meta(r);
const iconBase = (size) =>
  sharp({ create: { width: 512, height: 512, channels: 4, background: SIGN } })
    .composite([{ input: r, left: Math.round((512 - rm.width) / 2) + 6, top: Math.round((512 - rm.height) / 2) + 10 }])
    .png()
    .toBuffer()
    .then((b) => sharp(b).resize(size).png().toBuffer());
for (const [file, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  writeFileSync(pub(file), await iconBase(size));
}
const ico32 = await iconBase(32);
const hdr = Buffer.alloc(6);
hdr.writeUInt16LE(0, 0);
hdr.writeUInt16LE(1, 2);
hdr.writeUInt16LE(1, 4);
const ent = Buffer.alloc(16);
ent.writeUInt8(32, 0);
ent.writeUInt8(32, 1);
ent.writeUInt16LE(1, 4);
ent.writeUInt16LE(32, 6);
ent.writeUInt32LE(ico32.length, 8);
ent.writeUInt32LE(22, 12);
writeFileSync(pub('favicon.ico'), Buffer.concat([hdr, ent, ico32]));
const ico64 = (await iconBase(64)).toString('base64');
writeFileSync(
  pub('favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><image width="64" height="64" href="data:image/png;base64,${ico64}"/></svg>`,
);
console.log('brand assets written', { name: mn.width });
