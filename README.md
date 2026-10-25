# Royal Indraprastha website

English website for Royal Indraprastha, a pure vegetarian restaurant with a banquet hall on Field Marshal Cariappa Road, Rajarajeshwari Nagar, Bengaluru.

- Static site built with Astro, hosted on Cloudflare Pages.
- Three small serverless functions send enquiry, contact and data request forms by email.
- No cookies, no third-party scripts, no tracking.

Start with `docs/HANDOFF.md`. Deployment steps are in `docs/DEPLOY.md`; open questions for the owner are in `docs/VERIFY-WITH-OWNER.md`.

```
npm install
npm run dev        # local preview
npm run build      # production build into dist/
npm run qa         # every quality gate, writes docs/QA-REPORT.md
```

Requires Node 22.12 or later.
