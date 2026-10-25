# Hand-off

## What was built

- A bilingual static website (English at `/`, Kannada at `/kn/`) with 11 pages per language plus a bilingual 404: Home, Menu, Banquet and Events, Visit, Contact, Questions, Privacy Policy, Terms and Conditions, Cookie Policy, Cancellation and Refund Policy, Data Request.
- Stay (`/stay/`) and About (`/about/`) pages exist in code and are built only when their content is confirmed (`site.modules.stay` with `site.stayDetails`, and `site.story`). While off they are absent from navigation, sitemap and search.
- Three form endpoints (`/api/enquiry`, `/api/contact`, `/api/data-request`) as Cloudflare Pages Functions. They validate with the same zod schemas the browser uses, check origin, content type, size, honeypot and fill time, optionally rate limit with Workers KV, email the owner through Resend and keep nothing.
- Design system: ivory, maroon and brass tokens with a warm brown dark theme, Young Serif and Figtree with subset Noto Kannada fonts, all self-hosted. Ruled "printed menu" layouts, one stroke-only lattice ornament, square corners, no cards or gradients.
- Proposed wordmark, favicon set and Open Graph image, generated with `npm run brand`. Replace if the owner has a logo.
- Site search (Pagefind, built at deploy, no third party), theme toggle, language switch with remembered preference, mobile menu, mobile contact button, copy buttons, back to top, 2 px progress bar, storage notice, UTM capture, print stylesheet for the menu, JSON-LD for the restaurant and FAQ.

## How to edit content

Everything a non-developer should change lives in these files. After editing, commit and push; Cloudflare rebuilds.

| What                                                                                                               | File                                                                                   |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Name, address, phone, email, FSSAI, GSTIN, social links, banquet facts, access, parking, policies, module switches | `src/config/site.ts`                                                                   |
| Opening hours                                                                                                      | `src/config/hours.ts` (the open or closed badge appears once every day has both times) |
| Menu items and prices                                                                                              | `src/config/menu.ts` (a price shows only where it is set)                              |
| Questions and answers                                                                                              | `src/config/faq.ts`                                                                    |
| "Last updated" dates                                                                                               | `src/config/content-dates.ts`                                                          |
| Interface text                                                                                                     | `src/i18n/en.ts`, `src/i18n/kn.ts` (run `npm run fonts` after changing Kannada)        |
| Legal text                                                                                                         | `src/content/legal.ts`                                                                 |
| Photo alt text                                                                                                     | `src/config/photos.ts`, photos go in `public/photos-incoming/`, then `npm run photos`  |

Rule of the codebase: an unconfirmed fact is `null`, and anything that depends on it is hidden. Nothing on the site is invented.

## How to deploy

See `DEPLOY.md`. In short: connect the repository to Cloudflare Pages with build command `npm run build` and output `dist`, add the four email secrets, connect the domain.

## Blocked on the owner

Run `DEMO=1 npm run audit:placeholders` for the live list. At hand-off:

- Launch-blocking: legal entity name, domain, door number, business email, Google Maps listing link, FSSAI licence number, grievance officer.
- Not shown until confirmed: opening time (listings conflict: 6:00, 6:30 or 8:00 AM), banquet hall name, capacity and inclusions, access and parking details, WhatsApp, social accounts, menu prices, cancellation terms, the About story, and whether the hotel at SN Plaza is the same business.
- Content work: native Kannada review, the 12 photos in `SHOT-LIST.md`, lawyer review of the legal pages.

Full question list: `VERIFY-WITH-OWNER.md`. Research and sources: `RESEARCH.md`.

## Conflicts in the brief, resolved as instructed (section 1.3)

1. Loading animation versus no skeletons: one 200 ms fade-in of the main content (off under reduced motion) and a text "Sending..." on form buttons. No spinners or skeletons.
2. Scroll progress bar versus no scroll effects: a 2 px decorative bar at the top, nothing else scroll-driven.
3. Password visibility toggle: the site has no login or password fields, so no toggle was added.
4. Refund policy: the site takes no payments. The Cancellation and Refund Policy covers banquet bookings and says terms are agreed with the venue at booking until the owner supplies their own.
5. Unsubscribe link: no marketing email is sent; the privacy policy says so and commits to one-click unsubscribe if a newsletter is ever added.
6. Age consent: no age is collected; each form states it is for people 18 and over.
7. UTM tracking: first party only, kept in `sessionStorage` for the tab, sent as plain fields with a submission, disclosed in the privacy and cookie policies. No analytics.
8. Dark mode: warm brown (`#1C1512`), not black or purple.

## Other decisions worth knowing

- **Kannada legal pages** show a Kannada summary followed by the English text, marked as the operative version, until a lawyer approves a full Kannada translation. Two unreviewed legal texts in different languages could contradict each other.
- **Hero without photos:** with no exterior photo, the hours and address board fills the hero's second column; once a photo is added it takes that place and the board moves to the Visit section.
- **Menu:** items come from public listings and the research brief, presented as a partial list with no prices. Seven items seen on only one listing are flagged for confirmation.
- **Hours:** only the closing time (10:30 PM, consistent across three listings) is shown, with a prompt to call for the opening time.
- **Ratings and reviews:** none shown. The reviews link opens a Google Maps search until the exact listing link is supplied.
- **Lint scope:** ESLint covers the JavaScript scripts; TypeScript and Astro files are checked by `astro check`. Prettier formats everything except `.astro` files. This avoids adding packages outside the approved list.
- **Commit messages** carry no tool or AI attribution, following the brief's rule against such credits anywhere.

## Build environment notes

- The Playwright browser download host was blocked in the build environment, so the Playwright and Lighthouse runs used a headless Chromium 153 binary from the npm registry, passed in with `CHROME_PATH`. On a normal machine run `npx playwright install chromium` and leave `CHROME_PATH` unset.
- Outbound requests were blocked, so external links (Google Maps) were listed in `EXTERNAL-LINKS.md` but not fetched (`LINKS_OFFLINE=1`). Run `npm run links` on a connected machine to check them.
- `npm audit` reports advisories only in development tools (Lighthouse CI's dependency tree). Production dependencies: 0 vulnerabilities.
