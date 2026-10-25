// Lists every business fact still null in src/config and fails in production
// mode if any launch-required fact is missing. DEMO=1 reports without failing.
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const { site, LAUNCH_REQUIRED } = await import(join(root, 'src/config/site.ts'));
const { hours, hoursComplete } = await import(join(root, 'src/config/hours.ts'));
const { menu } = await import(join(root, 'src/config/menu.ts'));
const { photoAlt } = await import(join(root, 'src/config/photos.ts'));
const demo = Boolean(process.env.DEMO);

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const blocking = LAUNCH_REQUIRED.filter((p) => get(site, p) == null);

const nulls = [];
(function walk(o, prefix) {
  for (const [k, v] of Object.entries(o)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v === null) nulls.push(p);
    else if (v && typeof v === 'object' && !Array.isArray(v)) walk(v, p);
  }
})(site, '');

const advisory = [];
if (!hoursComplete()) {
  const missing = Object.entries(hours)
    .filter(([, h]) => !h.closed && (!h.open || !h.close))
    .map(([d]) => d);
  advisory.push(`hours: opening time not confirmed for ${missing.join(', ')}`);
}
const unpriced = menu.flatMap((c) => c.items.filter((i) => i.price === null)).length;
if (unpriced) advisory.push(`menu: ${unpriced} item(s) without a price (only priced items show a price)`);
const singleSource = menu.flatMap((c) => c.items.filter((i) => i.sources.length < 2).map((i) => i.id));
if (singleSource.length) advisory.push(`menu: confirm with owner (one listing only): ${singleSource.join(', ')}`);
const noPhotos = Object.entries(photoAlt)
  .filter(([, v]) => v === null)
  .map(([k]) => k);
if (noPhotos.length) advisory.push(`photos: none supplied yet for ${noPhotos.length} of 12 shots`);

console.log('Null values in src/config/site.ts (the site hides whatever depends on them):');
for (const n of nulls) console.log(`  ${blocking.includes(n) ? 'BLOCKS LAUNCH' : 'optional     '}  ${n}`);
console.log('\nOther open items:');
for (const a of advisory) console.log(`  ${a}`);

if (blocking.length) {
  const msg = `\n${blocking.length} launch-blocking value(s) missing: ${blocking.join(', ')}`;
  if (demo) {
    console.log(`${msg}\nDEMO mode: not failing.`);
  } else {
    console.error(msg);
    process.exit(1);
  }
} else {
  console.log('\naudit:placeholders passed');
}
