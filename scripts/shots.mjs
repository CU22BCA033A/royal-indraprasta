// Design-round screenshots: every built page at 390 and 1440 px.
// Usage: node scripts/shots.mjs <round-name> [--no-photos]
// Serves dist/ itself, so no preview server is needed. CHROME_PATH may point at a local Chromium.
import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const round = process.argv[2] ?? 'round-x';
const noPhotos = process.argv.includes('--no-photos');
const out = join(root, 'docs/design-rounds', round);
mkdirSync(out, { recursive: true });

const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.wasm': 'application/wasm',
};
const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(dist, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) f = join(dist, '404.html');
  res.setHeader('Content-Type', types[extname(f)] ?? 'application/octet-stream');
  res.end(readFileSync(f));
}).listen(4399);

function pages(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return ['pagefind', '_astro', 'fonts', 'photos'].includes(f) ? [] : pages(p);
    return f.endsWith('.html') ? ['/' + relative(dist, p).replace(/index\.html$/, '')] : [];
  });
}
const only = process.env.PAGES ? process.env.PAGES.split(',') : null;
const list = (only ?? pages(dist)).sort();
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--no-sandbox', '--no-zygote', '--disable-gpu'],
});
for (const path of list) {
  for (const width of [390, 1440]) {
    const ctx = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 900 },
      deviceScaleFactor: 1,
      colorScheme: process.env.DARK ? 'dark' : 'light',
    });
    await ctx.addInitScript(() => {
      try {
        globalThis.localStorage.setItem('ri-notice', 'ok');
      } catch {}
    });
    const page = await ctx.newPage();
    if (noPhotos) await page.route('**/photos/**', (r) => r.abort());
    await page.goto(`http://localhost:4399${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const name = (path.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home') + `-${width}.png`;
    await page.screenshot({ path: join(out, name), fullPage: true });
    await ctx.close();
  }
}
await browser.close();
server.close();
console.log(`${list.length} pages x 2 widths -> docs/design-rounds/${round}/`);
