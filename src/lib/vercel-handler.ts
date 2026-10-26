/**
 * Entry for the Vercel Edge Functions in api/. Bundled to plain JavaScript in
 * api/_lib/handler.js by `npm run api`, because Vercel's function builder
 * cannot follow imports of TypeScript files outside api/.
 */
import { handle, preflight, type Env } from './api.ts';
import type { FormKind } from './schemas.ts';

function env(): Env {
  return {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    OWNER_EMAIL: process.env.OWNER_EMAIL,
    FROM_EMAIL: process.env.FROM_EMAIL,
    SITE_ORIGIN: process.env.SITE_ORIGIN,
  };
}

export function route(kind: FormKind): (request: Request) => Promise<Response> | Response {
  return (request) => {
    if (request.method === 'OPTIONS') return preflight({ request, env: env() });
    return handle(kind, { request, env: env() });
  };
}
