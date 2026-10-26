// Runs after `astro build` and `pagefind`:
// - removes photo originals and any stray files that must not deploy
// - writes robots.txt with the sitemap URL
// - fails if any inline script appears, because the Content-Security-Policy
//   in vercel.json (and _headers for Cloudflare) allows only same-origin scripts
// - writes _headers for Cloudflare Pages (skipped on Vercel, which uses vercel.json)
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const SITE = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://royal-indraprasta.vercel.app')
).replace(/\/$/, '');

for (const p of ['photos-incoming']) rmSync(join(dist, p), { recursive: true, force: true });

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return f.endsWith('.html') ? [p] : [];
  });
}

const inline = [];
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type="application\/ld\+json"/.test(m[1] ?? '')) continue;
    inline.push(relative(dist, file));
  }
}
if (inline.length) {
  throw new Error(`Inline scripts would be blocked by the CSP. Move them to files: ${[...new Set(inline)].join(', ')}`);
}

// Cloudflare Pages reads dist/_headers; generate it from vercel.json so both hosts send the same headers.
if (!process.env.VERCEL) {
  const { headers: rules } = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
  const blocks = rules.map(
    (r) => `${r.source.replace('/(.*)', '/*')}\n${r.headers.map((h) => `  ${h.key}: ${h.value}`).join('\n')}`,
  );
  writeFileSync(join(dist, '_headers'), blocks.join('\n\n') + '\n');
}

writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap-index.xml\n`);

if (!existsSync(join(dist, '404.html'))) throw new Error('404.html missing from build');
console.log(`postbuild: no inline scripts, robots.txt${process.env.VERCEL ? '' : ' and _headers'} written`);
