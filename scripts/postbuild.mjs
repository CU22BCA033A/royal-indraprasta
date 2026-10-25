// Runs after `astro build` and `pagefind`:
// - removes photo originals and any stray files that must not deploy
// - writes robots.txt with the sitemap URL
// - writes _headers with a strict Content-Security-Policy, hashing every
//   inline script actually present in the built HTML
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const SITE = (process.env.SITE_URL ?? 'https://royal-indraprastha.pages.dev').replace(/\/$/, '');

for (const p of ['photos-incoming']) rmSync(join(dist, p), { recursive: true, force: true });

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return f.endsWith('.html') ? [p] : [];
  });
}

const hashes = new Set();
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    const attrs = m[1] ?? '';
    if (/type="application\/ld\+json"/.test(attrs)) continue;
    hashes.add(
      `'sha256-${createHash('sha256')
        .update(m[2] ?? '')
        .digest('base64')}'`,
    );
  }
}

const csp = [
  "default-src 'self'",
  `script-src 'self' 'wasm-unsafe-eval' ${[...hashes].join(' ')}`.trim(),
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

const headers = `/*
  Content-Security-Policy: ${csp}
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cross-Origin-Opener-Policy: same-origin
  X-Frame-Options: DENY

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/photos/*
  Cache-Control: public, max-age=2592000
`;
writeFileSync(join(dist, '_headers'), headers);

writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap-index.xml\n`);

if (!existsSync(join(dist, '404.html'))) throw new Error('404.html missing from build');
console.log(`postbuild: ${hashes.size} inline script hash(es), _headers and robots.txt written`);
