// Lists every business fact still null (brand-wide and per branch) and fails in
// production mode if a launch-required fact is missing. DEMO=1 reports only.
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const { site, LAUNCH_REQUIRED } = await import(join(root, 'src/config/site.ts'));
const { hoursComplete } = await import(join(root, 'src/config/hours.ts'));
const { menu } = await import(join(root, 'src/config/menu.ts'));
const { photoAlt } = await import(join(root, 'src/config/photos.ts'));
const { liveBranches } = await import(join(root, 'src/data/branches.ts'));
const demo = Boolean(process.env.DEMO);

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const blocking = LAUNCH_REQUIRED.filter((p) => get(site, p) == null);

const walk = (o, prefix, out) => {
  for (const [k, v] of Object.entries(o)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v === null) out.push(p);
    else if (v && typeof v === 'object' && !Array.isArray(v) && k !== 'hours') walk(v, p, out);
  }
  return out;
};

console.log('Brand-wide null values (src/config/site.ts; the site hides whatever depends on them):');
for (const n of walk(site, '', [])) console.log(`  ${blocking.includes(n) ? 'BLOCKS LAUNCH' : 'optional     '}  ${n}`);

for (const b of liveBranches) {
  console.log(`\nBranch "${b.name}" (src/data/branches.ts)${b.confirmed ? '' : ' NOT CONFIRMED'}:`);
  for (const n of walk(b, '', [])) console.log(`  optional       ${n}`);
  if (!hoursComplete(b.hours)) console.log('  optional       hours: opening and/or closing time not confirmed');
  if (!b.phone) console.log('  NOTE           no phone: Call buttons for this branch are hidden');
}

const advisory = [];
const unpriced = menu.flatMap((c) => c.items.filter((i) => i.price === null)).length;
if (unpriced) advisory.push(`menu: ${unpriced} item(s) without a price (only priced items show a price)`);
const singleSource = menu.flatMap((c) => c.items.filter((i) => i.sources.length < 2).map((i) => i.id));
if (singleSource.length) advisory.push(`menu: confirm with owner (one listing only): ${singleSource.join(', ')}`);
const noPhotos = Object.entries(photoAlt).filter(([, v]) => v === null).length;
if (noPhotos) advisory.push(`photos: none supplied yet for ${noPhotos} of ${Object.keys(photoAlt).length} shots`);
console.log('\nOther open items:');
for (const a of advisory) console.log(`  ${a}`);

if (blocking.length) {
  const msg = `\n${blocking.length} launch-blocking value(s) missing: ${blocking.join(', ')}`;
  if (demo) console.log(`${msg}\nDEMO mode: not failing.`);
  else {
    console.error(msg);
    process.exit(1);
  }
} else console.log('\naudit:placeholders passed');
