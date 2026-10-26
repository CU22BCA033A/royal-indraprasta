# Deploy

The site is static HTML with three small serverless functions for the forms. It runs on Vercel (functions in `api/`) or Cloudflare Pages (functions in `functions/api/`); both share `src/lib/api.ts`. The free plan of either covers it.

## Vercel (chosen host)

The repository deploys to Vercel as is. `vercel.json` sets the build, the output folder, trailing slashes and all security headers; the three form endpoints in `api/` run as Vercel Edge Functions.

1. In Vercel: Add New > Project > Import the GitHub repository `royal-indraprasta`.
2. Leave the settings Vercel reads from `vercel.json` (Framework: Other, Build Command `npm run build`, Output Directory `dist`, Install Command `npm ci`). Node.js version: 22.x (Project Settings > General).
3. Environment Variables (Project Settings > Environment Variables, Production):
   - `RESEND_API_KEY`, `OWNER_EMAIL`, `FROM_EMAIL` (see "Email (Resend)" below)
   - `SITE_ORIGIN` = the live address, for example `https://royalindraprastha.in`
   - `SITE_URL` = the same address (used at build time for canonical links, sitemap and Open Graph tags). Until a custom domain is set, the Vercel production domain is used automatically.
4. Deploy. Every push to `main` redeploys; other branches get preview URLs.
5. Custom domain: Project Settings > Domains > Add, then create the DNS records Vercel shows at the domain registrar. Set `SITE_URL` and `SITE_ORIGIN` to the domain and redeploy.

Until the email variables are set, the forms show "Online messages are not switched on yet. Please call us" with the phone number. Rate limiting with KV is a Cloudflare-only option; on Vercel the honeypot, fill-time, origin, content-type and size checks still apply.

## Cloudflare Pages (alternative host)

### 1. One-time setup

1. Create a free Cloudflare account and a Resend account.
2. Push this repository to GitHub (private is fine).
3. In Cloudflare: Workers and Pages > Create > Pages > Connect to Git, choose the repository.
4. Build settings:
   - Framework preset: None
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable `NODE_VERSION` = `22`
   - Environment variable `SITE_URL` = `https://royalindraprastha.in` (or the `*.pages.dev` address for the demo)
5. Deploy. Cloudflare picks up `functions/` automatically and serves `dist/_headers` (security headers) and `dist/404.html`.

Alternative without Git: `npx wrangler login`, then `npm run build && npm run deploy`.

### 2. Custom domain

1. Register the domain (for example `royalindraprastha.in`) in the owner's name.
2. Pages project > Custom domains > Set up a domain. If the domain's DNS is on Cloudflare this is automatic; otherwise add the CNAME record Cloudflare shows.
3. HTTPS is issued automatically. Add `www` as a second custom domain and redirect it to the apex (Rules > Redirect Rules).
4. Set `SITE_URL` to the final `https://` address and redeploy so canonical links, sitemap and Open Graph tags use it. Set `site.domain` in `src/config/site.ts` to the same value.

## Email (Resend)

1. In Resend, add the domain and create the DNS records it lists:
   - SPF: a TXT record (usually on a `send` subdomain) including `amazonses.com`, as Resend shows.
   - DKIM: the `resend._domainkey` TXT record.
   - Optional but recommended: a DMARC TXT record at `_dmarc`, for example `v=DMARC1; p=none; rua=mailto:owner@...`.
2. Wait until Resend shows the domain as verified.
3. Create an API key with sending access only.
4. In the host's environment settings (Vercel: Project Settings > Environment Variables; Cloudflare: Settings > Variables and Secrets), add as encrypted values:
   - `RESEND_API_KEY`
   - `OWNER_EMAIL` (the inbox that receives enquiries)
   - `FROM_EMAIL` (for example `Royal Indraprastha <enquiries@royalindraprastha.in>`)
   - `SITE_ORIGIN` (`https://royalindraprastha.in`)
5. Redeploy, then send a real enquiry, a contact message and a data request from a phone. Check that the owner email arrives with a working reply-to, and that the sender receives the confirmation.

Until these are set, the forms show "Online messages are not switched on yet. Please call us" with the phone number. Nothing is lost silently.

### 4. Optional rate limiting

```
npx wrangler kv namespace create RATE_LIMIT
```

Paste the id into `wrangler.toml` (or bind `RATE_LIMIT` in the Pages dashboard under Settings > Bindings). The API then allows 5 submissions per form per IP per 10 minutes, storing only a hashed key for 10 minutes.

## 5. Local development

```
npm install
npm run dev              # site only, forms will fail to send
npm run build
cp .env.example .dev.vars   # fill in test values
npm run pages:dev        # site plus functions on http://localhost:8788
```

## 6. Content updates

Edit only `src/config/*.ts`, `src/content/copy.ts` and `src/content/legal.ts`, then commit. The host rebuilds on every push. See `docs/HANDOFF.md`.
