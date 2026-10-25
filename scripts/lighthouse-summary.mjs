// Prints a one-line summary per Lighthouse report in .lighthouseci/reports.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = new URL('../.lighthouseci/reports/', import.meta.url).pathname;
for (const f of readdirSync(dir)
  .filter((n) => n.endsWith('.report.json'))
  .sort()) {
  const r = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  const c = r.categories;
  const a = r.audits;
  const js = a['resource-summary']?.details?.items?.find((i) => i.resourceType === 'script')?.transferSize ?? 0;
  console.log(
    `${new URL(r.finalDisplayedUrl).pathname.padEnd(12)} perf ${Math.round(c.performance.score * 100)}, a11y ${Math.round(
      c.accessibility.score * 100,
    )}, best practices ${Math.round(c['best-practices'].score * 100)}, SEO ${Math.round(c.seo.score * 100)}, LCP ${Math.round(
      a['largest-contentful-paint'].numericValue,
    )} ms, CLS ${a['cumulative-layout-shift'].numericValue.toFixed(3)}, TBT ${Math.round(
      a['total-blocking-time'].numericValue,
    )} ms, JS ${(js / 1024).toFixed(1)} KB`,
  );
}
