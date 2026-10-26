// Vercel Edge Function for /api/enquiry. Logic lives in src/lib/api.ts.
import { route } from './_lib/handler.js';

export const config = { runtime: 'edge' };

export default route('enquiry');
