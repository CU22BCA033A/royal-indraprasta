# Launch checklist

Items 1 to 3 need the owner's accounts and cannot be done from the code.

1. **Domain.** Register the domain in the owner's name, connect it in Cloudflare Pages, confirm HTTPS, set `SITE_URL` and `site.domain`. See `DEPLOY.md` section 2.
2. **Logo.** If the owner has a logo or brand kit, replace the proposed wordmark (`src/components/Wordmark.astro`, `public/favicon.svg`) and run `npm run brand`.
3. **Email.** Verify the sender domain in Resend (SPF, DKIM), set the four secrets in Cloudflare, and send a real enquiry end to end. See `DEPLOY.md` section 3.
4. **Owner facts.** Answer every question in `VERIFY-WITH-OWNER.md`, fill the values in `src/config/`, and run `npm run audit:placeholders` until it passes.
5. **Kannada.** A native speaker proofreads every string marked `NEEDS-NATIVE-REVIEW` (`src/i18n/kn.ts`, `src/config/menu.ts`, `src/config/faq.ts`, the Kannada summaries in `src/content/legal.ts`, page headings in the legal routes), then `npm run fonts`.
6. **Photos.** Take the 12 shots in `SHOT-LIST.md`, drop them in `public/photos-incoming/`, write alt text in `src/config/photos.ts`, run `npm run photos`.
7. **Legal.** A lawyer reviews the Privacy Policy, Terms, Cookie Policy, Cancellation and Refund Policy, and the data request process. Update `src/config/content-dates.ts` when text changes.
8. **No credits.** Confirm there is no "made with AI" tag, no generator tag and no template credit (`npm run audit:content` checks this).
9. **QA.** Run `npm run qa` (production mode) and keep `docs/QA-REPORT.md` with the launch record.
