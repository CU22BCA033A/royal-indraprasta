import { handle, preflight, type Ctx } from '../../src/lib/api.ts';

export const onRequestPost = (ctx: Ctx) => handle('data-request', ctx);
export const onRequestOptions = (ctx: Ctx) => preflight(ctx);
