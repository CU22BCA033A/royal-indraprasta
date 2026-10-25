// Checks every link in the built site with linkinator.
// Internal links must all resolve (the script fails otherwise). External links
// are listed and checked once; set LINKS_OFFLINE=1 where outbound requests are
// blocked, and they are listed without being fetched.
import { LinkChecker } from 'linkinator';
import { writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const offline = Boolean(process.env.LINKS_OFFLINE);
const dist = join(root, 'dist');
function pages(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === 'pagefind' ? [] : pages(p);
    return f.endsWith('.html') ? [relative(dist, p)] : [];
  });
}
const checker = new LinkChecker();
const external = new Map();
const broken = [];
const internalSeen = new Set();

checker.on('link', (r) => {
  const isExternal = /^https?:\/\//.test(r.url) && !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(r.url);
  if (!isExternal) internalSeen.add(r.url);
  if (isExternal) {
    external.set(r.url, r.state === 'SKIPPED' ? 'listed, not fetched' : `${r.state} ${r.status ?? ''}`.trim());
    if (!offline && r.state === 'BROKEN') broken.push(`${r.url} (from ${r.parent})`);
  } else if (r.state === 'BROKEN') {
    broken.push(`${r.url} (${r.status}) from ${r.parent}`);
  }
});

const result = await checker.check({
  path: pages(dist),
  recurse: false,
  serverRoot: dist,
  directoryListing: false,
  linksToSkip: offline ? ['^https?://(?!localhost|127\\.0\\.0\\.1)'] : [],
  timeout: 15000,
});

mkdirSync(join(root, 'docs'), { recursive: true });
const lines = [
  '# External links',
  '',
  `Checked ${new Date().toISOString().slice(0, 10)}${offline ? ' (listed only: outbound requests blocked in the build environment)' : ''}.`,
  '',
  '| URL | Result |',
  '|---|---|',
  ...[...external.entries()].sort().map(([u, s]) => `| ${u} | ${s} |`),
  '',
];
writeFileSync(join(root, 'docs/EXTERNAL-LINKS.md'), lines.join('\n'));

void result;
console.log(
  `links: ${internalSeen.size} internal URLs checked, ${external.size} external ${offline ? 'listed' : 'checked'}`,
);
if (broken.length) {
  console.error(`links: ${broken.length} broken`);
  for (const b of broken) console.error(`  ${b}`);
  process.exit(1);
}
console.log('links: no broken links');
