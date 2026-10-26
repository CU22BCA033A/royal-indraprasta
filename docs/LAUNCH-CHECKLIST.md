# Launch checklist

Items 1 to 3 need the owner's accounts and cannot be done from the code.

1. **Domain.** Register the domain in the owner's name, connect it in Vercel (Project Settings > Domains), confirm HTTPS, set `SITE_URL`, `SITE_ORIGIN` and `site.domain`. See `DEPLOY.md`.
2. **Logo.** If the owner has a logo or brand kit, replace the proposed wordmark (`src/components/Wordmark.astro`, `public/favicon.svg`) and run `npm run brand`.
3. **Email.** Verify the sender domain in Resend (SPF, DKIM), set the four environment variables in Vercel, and send a real enquiry end to end. See `DEPLOY.md`.
4. **Owner facts.** Answer every question in `VERIFY-WITH-OWNER.md`, fill the values in `src/config/`, and run `npm run audit:placeholders` until it passes.
5. **Photos.** Take the 12 shots in `SHOT-LIST.md`, drop them in `public/photos-incoming/`, write alt text in `src/config/photos.ts`, run `npm run photos`.
6. **Legal.** A lawyer reviews the Privacy Policy, Terms, Cookie Policy, Cancellation and Refund Policy, and the data request process. Update `src/config/content-dates.ts` when text changes.
7. **No credits.** Confirm there is no "made with AI" tag, no generator tag and no template credit (`npm run audit:content` checks this).
8. **QA.** Run `npm run qa` (production mode) and keep `docs/QA-REPORT.md` with the launch record.
