// Copies the Latin font files and builds Kannada subsets into public/fonts/.
// Kannada fonts are cut down to the characters actually used in src/, with all
// OpenType shaping features kept so conjuncts render correctly.
// Needs Python fonttools with brotli: pip install fonttools brotli
// Run after any change to Kannada copy: npm run fonts
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'public/fonts');
mkdirSync(out, { recursive: true });
const fs = (pkg, file) => join(root, 'node_modules/@fontsource', pkg, 'files', file);

const latin = [
  ['young-serif', 'young-serif-latin-400-normal.woff2', 'young-serif-400.woff2'],
  ['figtree', 'figtree-latin-400-normal.woff2', 'figtree-400.woff2'],
  ['figtree', 'figtree-latin-600-normal.woff2', 'figtree-600.woff2'],
];
for (const [pkg, file, name] of latin) copyFileSync(fs(pkg, file), join(out, name));

// Collect every Kannada character used in source files.
const chars = new Set();
function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|astro|md|mjs)$/.test(f)) {
      for (const ch of readFileSync(p, 'utf8')) {
        const c = ch.codePointAt(0);
        if (c >= 0x0c80 && c <= 0x0cff) chars.add(c);
      }
    }
  }
}
walk(join(root, 'src'));
const unicodes = [...chars, 0x200c, 0x200d, 0x25cc, 0x20, 0x2e, 0x2c, 0x3f]
  .map((c) => `U+${c.toString(16).toUpperCase().padStart(4, '0')}`)
  .join(',');

const kannada = [
  ['noto-sans-kannada', 'noto-sans-kannada-kannada-400-normal.woff2', 'noto-sans-kannada-400.woff2'],
  ['noto-sans-kannada', 'noto-sans-kannada-kannada-600-normal.woff2', 'noto-sans-kannada-600.woff2'],
  ['noto-serif-kannada', 'noto-serif-kannada-kannada-600-normal.woff2', 'noto-serif-kannada-600.woff2'],
];
for (const [pkg, file, name] of kannada) {
  execFileSync('pyftsubset', [
    fs(pkg, file),
    `--unicodes=${unicodes}`,
    '--layout-features=*',
    '--flavor=woff2',
    '--no-hinting',
    `--output-file=${join(out, name)}`,
  ]);
}

for (const f of readdirSync(out)) console.log(f.padEnd(32), statSync(join(out, f)).size, 'bytes');
console.log(`Kannada characters kept: ${chars.size}`);
