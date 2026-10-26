// Vercel Edge Function for POST /api/enquiry. The logic is shared with the
// Cloudflare version in functions/api/ through src/lib/api.ts.
import { handle, preflight, type Env } from '../src/lib/api.ts';

export const config = { runtime: 'edge' };

function env(): Env {
  return {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    OWNER_EMAIL: process.env.OWNER_EMAIL,
    FROM_EMAIL: process.env.FROM_EMAIL,
    SITE_ORIGIN: process.env.SITE_ORIGIN,
  };
}

export default function handler(request: Request): Promise<Response> | Response {
  if (request.method === 'OPTIONS') return preflight({ request, env: env() });
  return handle('enquiry', { request, env: env() });
}
