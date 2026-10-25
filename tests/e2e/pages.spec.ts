/**
 * Every built page at every width: no horizontal overflow, no console errors,
 * zero axe violations (WCAG 2.2 A and AA rules), unique title and description.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../../dist', import.meta.url).pathname;
function pages(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === 'pagefind' || f === '_astro' ? [] : pages(p);
    return f.endsWith('.html')
      ? [
          '/' +
            relative(dist, p)
              .replace(/index\.html$/, '')
              .replace(/\.html$/, ''),
        ]
      : [];
  });
}
const ALL = pages(dist).map((p) => (p === '/404' ? '/404.html' : p));
const WIDTHS = [320, 360, 390, 768, 1024, 1440];

for (const path of ALL) {
  for (const width of WIDTHS) {
    test(`${path} at ${width}px`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      // Let the 200 ms fade-in finish so contrast is measured at full opacity.
      await page.waitForTimeout(250);
      // Dismiss nothing: the notice is part of the page a first-time visitor sees.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, 'horizontal overflow').toBeLessThanOrEqual(0);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' ')}`)).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test('dark theme passes axe on key pages', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  for (const path of ['/', '/menu/', '/banquet/', '/contact/', '/privacy/']) {
    await page.goto(path);
    await page.waitForTimeout(250);
    const results = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    expect(results.violations.map((v) => `${path} ${v.id}`)).toEqual([]);
  }
});

test('titles and descriptions are unique and within limits', async ({ page }) => {
  const titles = new Map<string, string>();
  const descs = new Map<string, string>();
  for (const path of ALL) {
    await page.goto(path);
    const title = await page.title();
    const desc = (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
    expect(title.length, `${path} title length`).toBeLessThan(60);
    expect(desc.length, `${path} description length`).toBeGreaterThanOrEqual(120);
    expect(desc.length, `${path} description length`).toBeLessThanOrEqual(155);
    expect(titles.get(title), `${path} duplicate title`).toBeUndefined();
    expect(descs.get(desc), `${path} duplicate description`).toBeUndefined();
    titles.set(title, path);
    descs.set(desc, path);
  }
});
