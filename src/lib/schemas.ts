/**
 * Form schemas shared by the browser (for instant feedback) and the Pages
 * Functions (the source of truth). Error messages are codes; the UI turns
 * them into text in the visitor's language (see i18n `form.errors`).
 */
import * as z from 'zod/mini';

export const LIMITS = {
  name: 100,
  message: 2000,
  guestsMax: 5000,
  /** Bytes accepted by the API for one submission. */
  bodyBytes: 8 * 1024,
  /** Minimum milliseconds between the form rendering and submitting. */
  minFillMs: 3000,
} as const;

export const EVENT_TYPES = ['wedding', 'engagement', 'birthday', 'naming', 'corporate', 'other'] as const;
export const REQUEST_TYPES = ['access', 'correction', 'deletion'] as const;

/** Returns +91XXXXXXXXXX for a valid Indian mobile number, else null. */
export function normalizeIndianMobile(input: string): string | null {
  const digits = input.replace(/[\s\-().]/g, '');
  const m = /^(?:\+?91|0)?([6-9]\d{9})$/.exec(digits);
  return m ? `+91${m[1]}` : null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export function isEmail(s: string): boolean {
  return s.length <= 254 && EMAIL.test(s);
}

/** Today's date in Asia/Kolkata as YYYY-MM-DD. */
export function todayIST(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
}

const trimmed = (code: string, max: number, maxCode: string) =>
  z.pipe(
    z.string(code),
    z.pipe(
      z.transform((s: string) => s.trim()),
      z.string().check(z.minLength(1, code), z.maxLength(max, maxCode)),
    ),
  );

const optionalTrimmed = (max: number, maxCode: string) =>
  z.pipe(
    z.optional(z.string()),
    z.pipe(
      z.transform((s: string | undefined) => (s ?? '').trim()),
      z.string().check(z.maxLength(max, maxCode)),
    ),
  );

const phone = z.pipe(
  z.string('phone_invalid'),
  z.transform((s: string, ctx) => {
    const n = normalizeIndianMobile(s);
    if (!n) {
      ctx.issues.push({ code: 'custom', message: 'phone_invalid', input: s });
      return z.NEVER;
    }
    return n;
  }),
);

const optionalEmail = z.pipe(
  z.optional(z.string()),
  z.transform((s: string | undefined, ctx) => {
    const v = (s ?? '').trim();
    if (v && !isEmail(v)) {
      ctx.issues.push({ code: 'custom', message: 'email_invalid', input: v });
      return z.NEVER;
    }
    return v;
  }),
);

const consent = z.literal(true, 'consent_required');

/** Fields every submission carries for abuse checks and attribution. */
const meta = {
  /** Honeypot. Must be empty. */
  company: z.optional(z.string()),
  /** Milliseconds the form was open before sending. */
  elapsed: z.optional(z.number()),
  lang: z.optional(z.enum(['en', 'kn'])),
  utm: z.optional(z.record(z.string(), z.string().check(z.maxLength(200)))),
};

export const enquirySchema = z.object({
  name: trimmed('name_required', LIMITS.name, 'name_long'),
  phone,
  email: optionalEmail,
  eventType: z.enum(EVENT_TYPES, 'event_required'),
  guests: z.pipe(
    z.union([z.string(), z.number()], 'guests_invalid'),
    z.pipe(
      z.transform((v: string | number) => Number(v)),
      z
        .number('guests_invalid')
        .check(z.int('guests_invalid'), z.gte(1, 'guests_invalid'), z.lte(LIMITS.guestsMax, 'guests_invalid')),
    ),
  ),
  date: z.pipe(
    z.string('date_invalid'),
    z.transform((s: string, ctx) => {
      const ok = /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && s >= todayIST();
      if (!ok) {
        ctx.issues.push({ code: 'custom', message: 'date_invalid', input: s });
        return z.NEVER;
      }
      return s;
    }),
  ),
  message: optionalTrimmed(LIMITS.message, 'message_long'),
  consent,
  ...meta,
});

export const contactSchema = z.object({
  name: trimmed('name_required', LIMITS.name, 'name_long'),
  contact: z.pipe(
    z.string('contact_required'),
    z.transform((s: string, ctx) => {
      const v = s.trim();
      if (!v) {
        ctx.issues.push({ code: 'custom', message: 'contact_required', input: s });
        return z.NEVER;
      }
      const p = normalizeIndianMobile(v);
      if (p) return p;
      if (isEmail(v)) return v;
      ctx.issues.push({ code: 'custom', message: 'contact_invalid', input: s });
      return z.NEVER;
    }),
  ),
  message: trimmed('message_required', LIMITS.message, 'message_long'),
  consent,
  ...meta,
});

export const dataRequestSchema = z.object({
  name: trimmed('name_required', LIMITS.name, 'name_long'),
  contact: contactSchema.shape.contact,
  requestType: z.enum(REQUEST_TYPES, 'request_required'),
  details: trimmed('details_required', LIMITS.message, 'message_long'),
  consent,
  ...meta,
});

export type FormKind = 'enquiry' | 'contact' | 'data-request';

export const schemas = {
  enquiry: enquirySchema,
  contact: contactSchema,
  'data-request': dataRequestSchema,
} as const;

/** Maps a failed parse to `{ field: code }`, first error per field. */
export function fieldErrors(
  issues: readonly { path: readonly PropertyKey[]; message: string }[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of issues) {
    const key = String(i.path[0] ?? '_');
    if (!(key in out)) out[key] = i.message;
  }
  return out;
}
