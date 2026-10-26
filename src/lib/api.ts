/**
 * Shared request handling for the Pages Functions in functions/api/.
 * Kept outside functions/ so Cloudflare does not expose it as a route.
 *
 * Rules: no personal data is logged or stored. The submission is validated,
 * emailed to the owner, and forgotten.
 */
import { schemas, fieldErrors, LIMITS, type FormKind } from './schemas.ts';

export interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
}

export interface Env {
  RESEND_API_KEY?: string | undefined;
  OWNER_EMAIL?: string | undefined;
  FROM_EMAIL?: string | undefined;
  /** Allowed origin, for example https://royalindraprastha.in. Defaults to the request's own origin. */
  SITE_ORIGIN?: string | undefined;
  /** Optional Workers KV namespace for per-IP rate limiting (Cloudflare only). */
  RATE_LIMIT?: KV;
}

export interface Ctx {
  request: Request;
  env: Env;
}

const RATE_WINDOW_S = 600;
const RATE_MAX = 5;

function json(status: number, body: unknown, origin?: string): Response {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  };
  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  }
  return new Response(JSON.stringify(body), { status, headers });
}

function allowedOrigin(req: Request, env: Env): string {
  return (env.SITE_ORIGIN ?? new URL(req.url).origin).replace(/\/$/, '');
}

async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function preflight({ request, env }: Ctx): Response {
  const origin = allowedOrigin(request, env);
  if (request.headers.get('Origin') !== origin) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '600',
      Vary: 'Origin',
    },
  });
}

type Data = Record<string, unknown>;

const EVENT_LABEL: Record<string, string> = {
  wedding: 'Wedding or reception',
  engagement: 'Engagement',
  birthday: 'Birthday',
  naming: 'Naming ceremony',
  corporate: 'Office or corporate event',
  other: 'Other',
};
const REQUEST_LABEL: Record<string, string> = {
  access: 'Access: show the information held',
  correction: 'Correction',
  deletion: 'Deletion',
};

function ownerEmail(kind: FormKind, d: Data): { subject: string; text: string } {
  const lines: string[] = [];
  let subject = '';
  if (kind === 'enquiry') {
    subject = `Event enquiry: ${EVENT_LABEL[String(d.eventType)] ?? d.eventType}, ${d.date}, ${d.guests} guests`;
    lines.push(
      `Name: ${d.name}`,
      `Mobile: ${d.phone}`,
      `Email: ${d.email || 'not given'}`,
      `Event: ${EVENT_LABEL[String(d.eventType)] ?? d.eventType}`,
      `Guests: ${d.guests}`,
      `Preferred date: ${d.date}`,
      '',
      `Message: ${d.message || 'none'}`,
    );
  } else if (kind === 'contact') {
    subject = `Website message from ${d.name}`;
    lines.push(`Name: ${d.name}`, `Reply to: ${d.contact}`, '', String(d.message));
  } else {
    subject = `Data request (${REQUEST_LABEL[String(d.requestType)] ?? d.requestType}) from ${d.name}`;
    lines.push(
      `Name: ${d.name}`,
      `Reply to: ${d.contact}`,
      `Request: ${REQUEST_LABEL[String(d.requestType)] ?? d.requestType}`,
      '',
      String(d.details),
      '',
      'Reply within the time stated in the privacy policy (the law allows at most 90 days).',
    );
  }
  lines.push('', '---');
  const utm = d.utm as Record<string, string> | undefined;
  if (utm && Object.keys(utm).length) {
    lines.push(
      `Came from: ${Object.entries(utm)
        .map(([k, v]) => `${k}=${v}`)
        .join(', ')}`,
    );
  }
  lines.push('Sent through the website form. The website keeps no copy.');
  return { subject, text: lines.join('\n') };
}

function confirmEmail(kind: FormKind): { subject: string; text: string } {
  return {
    subject: 'Royal Indraprastha: we have your message',
    text: [
      'Hello,',
      '',
      kind === 'enquiry'
        ? 'We have received your event enquiry and will call you to talk about dates and details. It is not a booking until we confirm it with you.'
        : 'We have received your message and will reply soon.',
      '',
      'Royal Indraprastha',
      '',
      'This email only confirms your message. We do not send marketing emails.',
    ].join('\n'),
  };
}

function replyAddress(kind: FormKind, d: Data): string | null {
  const v = kind === 'enquiry' ? d.email : d.contact;
  return typeof v === 'string' && v.includes('@') ? v : null;
}

async function sendEmail(
  env: Env,
  msg: { to: string; subject: string; text: string; replyTo?: string | null },
  fetchImpl: typeof fetch,
): Promise<boolean> {
  const res = await fetchImpl('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: [msg.to],
      subject: msg.subject,
      text: msg.text,
      ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
    }),
  });
  return res.ok;
}

export async function handle(
  kind: FormKind,
  { request, env }: Ctx,
  fetchImpl: typeof fetch = fetch,
): Promise<Response> {
  const origin = allowedOrigin(request, env);
  if (request.method !== 'POST') return json(405, { ok: false, code: 'method' });
  if (request.headers.get('Origin') !== origin) return json(403, { ok: false, code: 'origin' });
  if (!(request.headers.get('Content-Type') ?? '').toLowerCase().startsWith('application/json')) {
    return json(415, { ok: false, code: 'content_type' }, origin);
  }
  const declared = Number(request.headers.get('Content-Length') ?? '0');
  if (declared > LIMITS.bodyBytes) return json(413, { ok: false, code: 'too_large' }, origin);
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > LIMITS.bodyBytes) {
    return json(413, { ok: false, code: 'too_large' }, origin);
  }
  let body: Data;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('shape');
    body = parsed as Data;
  } catch {
    return json(400, { ok: false, code: 'bad_json' }, origin);
  }

  // Spam traps: answer as if it worked, so bots learn nothing.
  if (typeof body.company === 'string' && body.company.trim() !== '') return json(200, { ok: true }, origin);
  if (typeof body.elapsed !== 'number' || body.elapsed < LIMITS.minFillMs) return json(200, { ok: true }, origin);

  if (env.RATE_LIMIT) {
    const ip =
      request.headers.get('CF-Connecting-IP') ??
      request.headers.get('X-Real-IP') ??
      request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ??
      'unknown';
    const key = `rl:${kind}:${await sha256(`${ip}:${Math.floor(Date.now() / (RATE_WINDOW_S * 1000))}`)}`;
    const count = Number((await env.RATE_LIMIT.get(key)) ?? '0');
    if (count >= RATE_MAX) return json(429, { ok: false, code: 'rate' }, origin);
    await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: RATE_WINDOW_S });
  }

  const result = schemas[kind].safeParse(body);
  if (!result.success) return json(422, { ok: false, errors: fieldErrors(result.error.issues) }, origin);
  const data = result.data as Data;

  if (!env.RESEND_API_KEY || !env.OWNER_EMAIL || !env.FROM_EMAIL) {
    return json(503, { ok: false, code: 'not_configured' }, origin);
  }

  const reply = replyAddress(kind, data);
  let sent = false;
  try {
    sent = await sendEmail(env, { to: env.OWNER_EMAIL, ...ownerEmail(kind, data), replyTo: reply }, fetchImpl);
  } catch {
    sent = false;
  }
  if (!sent) return json(502, { ok: false, code: 'send_failed' }, origin);

  if (reply) {
    try {
      await sendEmail(env, { to: reply, ...confirmEmail(kind) }, fetchImpl);
    } catch {
      /* The owner has the message; a failed confirmation is not an error for the visitor. */
    }
  }
  return json(200, { ok: true }, origin);
}
