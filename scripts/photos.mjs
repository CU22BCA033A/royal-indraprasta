// Turns photos dropped into public/photos-incoming/ into responsive AVIF and
// WebP files in public/photos/, strips metadata (including GPS), and writes
// src/config/photos.generated.json with sizes for <picture>.
// Originals are never deployed: scripts/postbuild.mjs removes the incoming folder from dist.
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const inDir = join(root, 'public/photos-incoming');
const outDir = join(root, 'public/photos');
const manifestPath = join(root, 'src/config/photos.generated.json');
const WIDTHS = [480, 800, 1200, 1600];

mkdirSync(inDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

const manifest = {};
const files = readdirSync(inDir).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
for (const file of files) {
  const slug = parse(file).name.toLowerCase();
  const src = sharp(join(inDir, file)).rotate();
  const meta = await src.metadata();
  const w0 = meta.autoOrient?.width ?? meta.width;
  const h0 = meta.autoOrient?.height ?? meta.height;
  const widths = WIDTHS.filter((w) => w <= w0);
  if (widths.length === 0) widths.push(w0);
  const sources = [];
  for (const w of widths) {
    const h = Math.round((h0 * w) / w0);
    const base = join(outDir, `${slug}-${w}`);
    if (!existsSync(`${base}.avif`)) {
      await sharp(join(inDir, file)).rotate().resize(w).avif({ quality: 52 }).toFile(`${base}.avif`);
    }
    if (!existsSync(`${base}.webp`)) {
      await sharp(join(inDir, file)).rotate().resize(w).webp({ quality: 72 }).toFile(`${base}.webp`);
    }
    if (!existsSync(`${base}.jpg`) && w === widths.at(-1)) {
      await sharp(join(inDir, file)).rotate().resize(w).jpeg({ quality: 78, mozjpeg: true }).toFile(`${base}.jpg`);
    }
    sources.push({ w, h });
  }
  manifest[slug] = { width: w0, height: h0, widths: sources.map((s) => s.w) };
  console.log(`photo ${slug}: ${sources.map((s) => s.w).join(', ')}`);
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`${files.length} photo(s) processed`);
