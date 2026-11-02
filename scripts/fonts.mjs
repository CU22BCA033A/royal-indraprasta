// Copies the self-hosted font files (SIL OFL 1.1) from @fontsource into
// public/fonts/ under stable names. Run: npm run fonts
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'public/fonts');
mkdirSync(out, { recursive: true });
const src = (pkg, file) => join(root, 'node_modules/@fontsource', pkg, 'files', file);

const files = [
  ['zilla-slab', 'zilla-slab-latin-700-normal.woff2', 'zilla-slab-700.woff2'],
  ['yellowtail', 'yellowtail-latin-400-normal.woff2', 'yellowtail-400.woff2'],
  ['figtree', 'figtree-latin-400-normal.woff2', 'figtree-400.woff2'],
  ['figtree', 'figtree-latin-600-normal.woff2', 'figtree-600.woff2'],
];
for (const [pkg, file, name] of files) copyFileSync(src(pkg, file), join(out, name));
for (const f of readdirSync(out)) console.log(f.padEnd(24), statSync(join(out, f)).size, 'bytes');
