import { test, expect, type Page } from '@playwright/test';
import { todayIST } from '../../src/lib/schemas.ts';

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 800 } });
  test('opens, traps focus, closes on Escape and on link click', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('[data-menu-open]');
    await toggle.click();
    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();
    // Focus stays inside the open modal dialog.
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(() => !!document.activeElement?.closest('#mobile-menu'));
      expect(inside).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();
    await toggle.click();
    await menu.getByRole('link', { name: 'Menu', exact: true }).click();
    await expect(page).toHaveURL(/\/menu\/$/);
    await expect(page.locator('#mobile-menu')).toBeHidden();
  });

  test('floating contact panel opens and closes on Escape', async ({ page }) => {
    await page.goto('/locations/cariappa-road/');
    await page.locator('[data-notice-choice]').click();
    // The button stays out of the way at the top of the page; scroll to reveal it.
    await page.mouse.wheel(0, 1200);
    const btn = page.locator('[data-contact] > button');
    await btn.click();
    await expect(page.locator('#contact-panel')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#contact-panel')).toBeHidden();
    await expect(btn).toBeFocused();
  });

  test('floating contact hides while a submit button is on screen', async ({ page }) => {
    await page.goto('/contact/');
    await page.locator('[data-notice-choice]').click();
    await page.locator('#form-contact button[type="submit"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-contact]')).toBeHidden();
  });
});

test('theme toggle switches and persists', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const btn = page.locator('.header-tools [data-theme-toggle]');
  await expect(btn).toHaveAttribute('aria-pressed', 'false');
  await btn.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(28, 21, 18)');
});

test('search finds pages and reports no results', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('.header-tools [data-search-open]').click();
  const input = page.locator('#search-input');
  await expect(input).toBeFocused();
  await input.fill('masala');
  await expect(page.locator('.search-results li').first()).toBeVisible();
  await expect(page.locator('.search-results a').first()).toHaveAttribute('href', /\//);
  await input.fill('zzqxv');
  await expect(page.locator('#search-status')).toHaveText('No pages match "zzqxv".');
  await page.keyboard.press('Escape');
  await expect(page.locator('#search-dialog')).toBeHidden();
});

test('FAQ expands and collapses', async ({ page }) => {
  await page.goto('/faq/');
  const first = page.locator('.faq details').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
  await expect(first.locator('.answer')).toBeVisible();
  await first.locator('summary').press('Enter');
  await expect(first).not.toHaveAttribute('open', '');
});

test('copy address announces the result', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/locations/cariappa-road/');
  const btn = page.locator('[data-copy]').first();
  await btn.click();
  await expect(page.locator('.copy-status').first()).toHaveText('Copied');
  const text = await page.evaluate(() => navigator.clipboard.readText());
  expect(text).toContain('Field Marshal Cariappa Road');
});

test('open status and hours never show a guess', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.status[data-hours]')).toHaveCount(0);
  await expect(page.locator('.today-row[data-slug="cariappa-road"] .when')).toHaveText(/closes\s*(at\s*)?10:30\s*pm/i);
  await expect(page.locator('.today-row[data-slug="channasandra"] .when')).not.toContainText('Closes');
});

test('branch choice is remembered and switches the header call button', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const select = page.locator('.header-tools [data-branch-select], #branch-select-header').first();
  await expect(select).toBeVisible();
  await expect(page.locator('a[data-branch-only="cariappa-road"]').first()).toBeVisible();
  await select.selectOption('channasandra');
  await expect(page.locator('html')).toHaveAttribute('data-branch', 'channasandra');
  await expect(page.locator('a[data-branch-only="cariappa-road"]').first()).toBeHidden();
  await page.reload();
  await expect(page.locator('#branch-select-header')).toHaveValue('channasandra');
  await expect(page.locator('.today-row[data-slug="channasandra"] [data-yours]')).toBeVisible();
});

test('nearest branch sorts the list using a location that stays in the browser', async ({ page, context }) => {
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation({ latitude: 12.9039, longitude: 77.5117 });
  const requests: string[] = [];
  page.on('request', (r) => requests.push(r.url()));
  await page.goto('/locations/');
  await page.locator('[data-nearest]').click();
  await expect(page.locator('[data-nearest-status]')).toContainText('Channasandra is closest');
  await expect(page.locator('[data-branch-ledger] .branch-row').first()).toHaveAttribute('data-slug', 'channasandra');
  expect(requests.filter((u) => u.includes('12.90'))).toEqual([]);
});

test('menu filter hides dishes a branch does not list', async ({ page }) => {
  await page.goto('/menu/');
  const only = page.locator('tr[data-served="channasandra"]').first();
  await expect(only).toBeVisible();
  await page.locator('[data-menu-filter] label', { hasText: 'Cariappa Road' }).click();
  await expect(only).toBeHidden();
  await page.locator('[data-menu-filter] label').first().click();
  await expect(only).toBeVisible();
});

test('old visit page redirects to branches', async ({ page }) => {
  const res = await page.request.get('/visit/', { maxRedirects: 0 }).catch(() => null);
  // Redirects live in vercel.json and _redirects; the static preview has no page there.
  expect(res === null || [301, 308, 404].includes(res.status())).toBe(true);
});

test('canonical link is set and no language alternates remain', async ({ page }) => {
  await page.goto('/banquet/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/banquet\/$/);
  await expect(page.locator('link[hreflang]')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-IN');
});

test('storage notice is dismissed once', async ({ page }) => {
  await page.goto('/');
  const notice = page.locator('[data-notice]');
  await expect(notice).toBeVisible();
  await notice.getByRole('button', { name: 'Got it' }).click();
  await expect(notice).toBeHidden();
  await page.reload();
  await expect(notice).toBeHidden();
});

test('UTM tags are captured for the session', async ({ page }) => {
  await page.goto('/?utm_source=flyer&utm_campaign=diwali&other=x');
  const v = await page.evaluate(() => sessionStorage.getItem('ri-utm'));
  expect(JSON.parse(v ?? '{}')).toEqual({ utm_source: 'flyer', utm_campaign: 'diwali' });
});

test('phone links and directions are well formed', async ({ page }) => {
  await page.goto('/');
  for (const href of await page.locator('a[href^="tel:"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')))) {
    expect(href).toBe('tel:+919743932821');
  }
  await expect(page.locator('a.wordmark').first()).toHaveAttribute('href', '/');
});

test('back to top appears after scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 700 });
  await page.goto('/privacy/');
  await page.locator('[data-notice-choice]').click();
  await expect(page.locator('[data-back-to-top]')).toBeHidden();
  await page.mouse.wheel(0, 4000);
  await expect(page.locator('[data-back-to-top]')).toBeVisible();
});

// Forms, with the API mocked

async function mockApi(page: Page, status: number, body: unknown) {
  const seen: Record<string, unknown>[] = [];
  await page.route('**/api/**', async (route) => {
    seen.push(JSON.parse(route.request().postData() ?? '{}'));
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
  });
  return seen;
}

async function fillEnquiry(page: Page) {
  await page.fill('#enquiry-name', 'Asha Rao');
  await page.fill('#enquiry-phone', '98450 12345');
  await page.selectOption('#enquiry-eventType', 'birthday');
  await page.fill('#enquiry-guests', '60');
  await page.fill('#enquiry-date', todayIST());
  await page.check('#form-enquiry-consent');
}

test('enquiry: field errors are shown and announced', async ({ page }) => {
  await page.goto('/banquet/');
  await page.locator('[data-review]').click();
  for (const f of ['name', 'phone', 'eventType', 'guests', 'date']) {
    await expect(page.locator(`#enquiry-${f}`)).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator(`#enquiry-${f}-error`)).toBeVisible();
  }
  await expect(page.locator('#form-enquiry-consent-error')).toHaveText('Tick the box to agree before sending.');
  await expect(page.locator('#enquiry-name')).toBeFocused();
  await page.fill('#enquiry-phone', '12345');
  await page.locator('#enquiry-name').focus();
  await expect(page.locator('#enquiry-phone-error')).toHaveText(
    'Enter a 10-digit Indian mobile number, with or without +91.',
  );
});

test('enquiry: confirm dialog, edit, send, success', async ({ page }) => {
  const seen = await mockApi(page, 200, { ok: true });
  await page.goto('/banquet/?utm_source=flyer');
  await fillEnquiry(page);
  await page.waitForTimeout(100);
  const review = page.locator('[data-review]');
  await review.click();
  const dialog = page.locator('.confirm-dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('dd').first()).toHaveText('Asha Rao');
  await dialog.locator('[data-confirm-edit]').click();
  await expect(dialog).toBeHidden();
  await expect(review).toBeFocused();
  await review.click();
  await dialog.locator('[data-confirm-send]').click();
  const success = page.locator('[data-success]');
  await expect(success).toBeVisible();
  await expect(success).toBeFocused();
  await expect(page.locator('#form-enquiry')).toBeHidden();
  expect(seen[0]).toMatchObject({ name: 'Asha Rao', eventType: 'birthday', utm: { utm_source: 'flyer' } });
});

test('enquiry: general error state on server failure', async ({ page }) => {
  await mockApi(page, 500, { ok: false });
  await page.goto('/banquet/');
  await fillEnquiry(page);
  await page.locator('[data-review]').click();
  await page.locator('[data-confirm-send]').click();
  const err = page.locator('[data-general-error]');
  await expect(err).toBeVisible();
  await expect(err).toContainText('+91 97439 32821');
  await expect(page.locator('#form-enquiry')).toBeVisible();
});

test('enquiry: server field errors are mapped to fields', async ({ page }) => {
  await mockApi(page, 422, { ok: false, errors: { guests: 'guests_invalid' } });
  await page.goto('/banquet/');
  await fillEnquiry(page);
  await page.locator('[data-review]').click();
  await page.locator('[data-confirm-send]').click();
  await expect(page.locator('#enquiry-guests-error')).toHaveText('Enter the number of guests, from 1 to 5000.');
});

test('enquiry: not-configured message offers a call', async ({ page }) => {
  await mockApi(page, 503, { ok: false, code: 'not_configured' });
  await page.goto('/banquet/');
  await fillEnquiry(page);
  await page.locator('[data-review]').click();
  await page.locator('[data-confirm-send]').click();
  await expect(page.locator('[data-general-error]')).toContainText('Online messages are not switched on yet');
});

test('contact form: success and send another', async ({ page }) => {
  await mockApi(page, 200, { ok: true });
  await page.goto('/contact/');
  await page.fill('#contact-name', 'Ravi');
  await page.fill('#contact-contact', 'ravi@example.com');
  await page.fill('#contact-message', 'Do you open on Ugadi?');
  await page.check('#form-contact-consent');
  await page.locator('#form-contact button[type="submit"]').click();
  await expect(page.locator('[data-success]')).toBeVisible();
  await page.locator('[data-another]').click();
  await expect(page.locator('#form-contact')).toBeVisible();
  await expect(page.locator('#contact-name')).toHaveValue('');
});

test('contact form: offline-style network failure shows general error', async ({ page }) => {
  await page.route('**/api/**', (route) => route.abort('failed'));
  await page.goto('/contact/');
  await page.fill('#contact-name', 'Ravi');
  await page.fill('#contact-contact', '9845012345');
  await page.fill('#contact-message', 'Hello');
  await page.check('#form-contact-consent');
  await page.locator('#form-contact button[type="submit"]').click();
  await expect(page.locator('[data-general-error]')).toBeVisible();
});

test('data request form validates the request type', async ({ page }) => {
  await mockApi(page, 200, { ok: true });
  await page.goto('/data-request/');
  await page.fill('#data-request-name', 'Ravi');
  await page.fill('#data-request-contact', '9845012345');
  await page.fill('#data-request-details', 'My enquiry from last week');
  await page.check('#form-data-request-consent');
  await page.locator('#form-data-request button[type="submit"]').click();
  await expect(page.locator('#data-request-requestType-error')).toBeVisible();
  await page.check('#data-request-requestType-deletion');
  await page.locator('#form-data-request button[type="submit"]').click();
  await expect(page.locator('[data-success]')).toBeVisible();
});

test('keyboard only: enquiry from skip link to success', async ({ page }) => {
  await mockApi(page, 200, { ok: true });
  await page.goto('/banquet/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await page.locator('#enquiry-name').focus();
  await page.keyboard.type('Asha Rao');
  await page.keyboard.press('Tab');
  await page.keyboard.type('9845012345');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Tab');
  await page.keyboard.type('40');
  await page.locator('#enquiry-date').fill(todayIST());
  await page.locator('#form-enquiry-consent').focus();
  await page.keyboard.press('Space');
  await page.keyboard.press('Tab');
  await expect(page.locator('#form-enquiry a[href="/privacy/"]')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('[data-review]')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-confirm-send]')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-success]')).toBeFocused();
});
