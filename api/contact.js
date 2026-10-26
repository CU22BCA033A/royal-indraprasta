// Vercel Edge Function for /api/contact. Logic lives in src/lib/api.ts.
import { route } from './_lib/handler.js';

export const config = { runtime: 'edge' };

export default route('contact');
