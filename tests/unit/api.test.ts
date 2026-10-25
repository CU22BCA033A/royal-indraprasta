import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handle, preflight, type Env } from '../../src/lib/api.ts';
import { todayIST } from '../../src/lib/schemas.ts';

const ORIGIN = 'https://example.test';
const env: Env = { RESEND_API_KEY: 'k', OWNER_EMAIL: 'owner@example.test', FROM_EMAIL: 'site@example.test' };

function req(body: unknown, headers: Record<string, string> = {}): Request {
  const raw = typeof body === 'string' ? body : JSON.stringify(body);
  return new Request(`${ORIGIN}/api/enquiry`, {
    method: 'POST',
    headers: { Origin: ORIGIN, 'Content-Type': 'application/json', ...headers },
    body: raw,
  });
}
const good = {
  name: 'Asha',
  phone: '98450 12345',
  email: 'asha@example.test',
  eventType: 'birthday',
  guests: '60',
  date: todayIST(),
  message: '',
  consent: true,
  elapsed: 5000,
  lang: 'en',
  utm: { utm_source: 'flyer' },
};
function mockFetch(ok = true) {
  const calls: { url: string; body: Record<string, unknown> }[] = [];
  const f = (async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(String(init.body)) });
    return new Response('{}', { status: ok ? 200 : 500 });
  }) as unknown as typeof fetch;
  return { f, calls };
}

test('valid enquiry emails the owner and the sender', async () => {
  const { f, calls } = mockFetch();
  const res = await handle('enquiry', { request: req(good), env }, f);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(calls.length, 2);
  assert.deepEqual(calls[0]!.body.to, ['owner@example.test']);
  assert.equal(calls[0]!.body.reply_to, 'asha@example.test');
  assert.match(String(calls[0]!.body.text), /Mobile: \+919845012345/);
  assert.match(String(calls[0]!.body.text), /utm_source=flyer/);
  assert.deepEqual(calls[1]!.body.to, ['asha@example.test']);
});

test('rejects other origins', async () => {
  const res = await handle('enquiry', { request: req(good, { Origin: 'https://evil.test' }), env }, mockFetch().f);
  assert.equal(res.status, 403);
});

test('rejects non-JSON content type', async () => {
  const res = await handle('enquiry', { request: req(good, { 'Content-Type': 'text/plain' }), env }, mockFetch().f);
  assert.equal(res.status, 415);
});

test('rejects oversized bodies', async () => {
  const res = await handle('enquiry', { request: req({ ...good, message: 'x'.repeat(9000) }), env }, mockFetch().f);
  assert.equal(res.status, 413);
});

test('rejects malformed JSON', async () => {
  const res = await handle('enquiry', { request: req('{not json'), env }, mockFetch().f);
  assert.equal(res.status, 400);
});

test('honeypot and too-fast submissions are dropped silently', async () => {
  const m = mockFetch();
  const a = await handle('enquiry', { request: req({ ...good, company: 'Spam Ltd' }), env }, m.f);
  const b = await handle('enquiry', { request: req({ ...good, elapsed: 200 }), env }, m.f);
  assert.equal(a.status, 200);
  assert.equal(b.status, 200);
  assert.equal(m.calls.length, 0);
});

test('returns field error codes', async () => {
  const res = await handle('enquiry', { request: req({ ...good, phone: '123', consent: false }), env }, mockFetch().f);
  assert.equal(res.status, 422);
  const body = (await res.json()) as { errors: Record<string, string> };
  assert.equal(body.errors.phone, 'phone_invalid');
  assert.equal(body.errors.consent, 'consent_required');
});

test('reports missing email configuration', async () => {
  const res = await handle('enquiry', { request: req(good), env: {} }, mockFetch().f);
  assert.equal(res.status, 503);
  assert.equal(((await res.json()) as { code: string }).code, 'not_configured');
});

test('reports email provider failure', async () => {
  const res = await handle('enquiry', { request: req(good), env }, mockFetch(false).f);
  assert.equal(res.status, 502);
});

test('rate limits per IP with KV', async () => {
  const store = new Map<string, string>();
  const kv = {
    get: async (k: string) => store.get(k) ?? null,
    put: async (k: string, v: string) => void store.set(k, v),
  };
  const statuses: number[] = [];
  for (let i = 0; i < 6; i++) {
    const r = await handle(
      'contact',
      {
        request: req(
          { name: 'A', contact: 'a@example.test', message: 'hi', consent: true, elapsed: 4000 },
          { 'CF-Connecting-IP': '203.0.113.9' },
        ),
        env: { ...env, RATE_LIMIT: kv },
      },
      mockFetch().f,
    );
    statuses.push(r.status);
  }
  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429]);
  assert.ok(
    [...store.keys()].every((k) => !k.includes('203.0.113.9')),
    'IP is stored only as a hash',
  );
});

test('preflight allows only the site origin', () => {
  const ok = preflight({
    request: new Request(`${ORIGIN}/api/contact`, { method: 'OPTIONS', headers: { Origin: ORIGIN } }),
    env,
  });
  const bad = preflight({
    request: new Request(`${ORIGIN}/api/contact`, { method: 'OPTIONS', headers: { Origin: 'https://evil.test' } }),
    env,
  });
  assert.equal(ok.status, 204);
  assert.equal(bad.status, 403);
});
