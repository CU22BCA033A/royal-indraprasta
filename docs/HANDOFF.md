# Hand-off

## What was built

- An English static website with 13 pages plus a 404: Home, Menu, Branches (`/locations/`), one page per branch (`/locations/cariappa-road/`, `/locations/channasandra/`), Banquet hall, Contact, Questions, Privacy Policy, Terms and Conditions, Cookie Policy, Cancellation and Refund Policy, Data Request. `/visit/` redirects to `/locations/`.
- About (`/about/`) exists in code and is built only when `site.story` is supplied. Rooms are shown on the Channasandra branch only.
- A branch system: every address, phone, hours, service and hall fact lives on a branch in `src/data/branches.ts`. The header has a branch selector remembered in this browser (`ri-branch` in `localStorage`); it switches the header Call button and marks "Your branch". `/locations/` has a "Find the nearest branch" button that reads the location once, in the browser only, and sorts the list by distance. Nothing is sent anywhere.
- One shared menu with per-branch overrides (an item with `branches: ['channasandra']` shows only there) and a branch filter on the menu page.
- Three form endpoints (`/api/enquiry`, `/api/contact`, `/api/data-request`) as Vercel Edge Functions (Cloudflare Pages Functions kept as an alternative). They validate with the same zod schemas the browser uses, check origin, content type, size, honeypot and fill time, email the owner through Resend and keep nothing.
- Design: the restaurant's own facade, from the owner's building rendering. Dark wood header with the white filigree eave trim, a wood panel holding the cream sign plate (gold script "Royal" in Yellowtail over "Indraprastha" in Zilla Slab), cream wall-coloured pages, magenta from the logo for links and actions, and a brick-red footer. Dark mode is the building at night: dark wood with glowing lettering. Rounds and scores in `DESIGN-LOG.md`; product truth in `PRODUCT.md`; the home page direction in `.impeccable/surfaces/`.
- Proposed wordmark, favicon set and Open Graph image, generated with `npm run brand`. Replace if the owner has a logo.
- Site search (Pagefind, no third party), theme toggle, mobile menu, mobile contact button, copy buttons, back to top, progress bar, storage notice, UTM capture, print stylesheet for the menu, JSON-LD for the organisation, each branch, the hall and the FAQ.
- No bar or alcohol information anywhere, by instruction.

## How to edit content

Everything a non-developer should change lives in these files. After editing, commit and push to `main`; Vercel rebuilds.

| What                                                                                           | File                                                                                  |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Branch address, phone, WhatsApp, hours, map link, services, hall facts, FSSAI, access, parking | `src/data/branches.ts`                                                                |
| Brand-wide facts: legal name, domain, email, grievance officer, GSTIN, social links, story     | `src/config/site.ts`                                                                  |
| Menu items, prices, which branch serves what                                                   | `src/config/menu.ts` (a price shows only where it is set)                             |
| Questions and answers                                                                          | `src/config/faq.ts`                                                                   |
| "Last updated" dates                                                                           | `src/config/content-dates.ts`                                                         |
| Interface text                                                                                 | `src/content/copy.ts`                                                                 |
| Legal text                                                                                     | `src/content/legal.ts`                                                                |
| Photo alt text                                                                                 | `src/config/photos.ts`, photos go in `public/photos-incoming/`, then `npm run photos` |

Rule of the codebase: an unconfirmed fact is `null`, and anything that depends on it is hidden. Nothing on the site is invented.

## How to add a branch in five minutes

1. Open `src/data/branches.ts` and copy one branch object in the `branches` list.
2. Give it a new `slug` (lowercase, hyphens: `kengeri`), a `name` ("Kengeri") and an `area`.
3. Fill in what you know; set everything else to `null`. Set `approxGeo` to the rough map position (right-click the place in Google Maps to copy it) so "Find the nearest branch" can sort it.
4. Set `hours` with `everyDay('07:00', '22:30')`, or `everyDay(null, null)` if not known.
5. Set `services` (`banquet`, `rooms`, `takeaway`) and `hall` (or `null`).
6. Keep `confirmed: true` only once the owner has confirmed the branch.
7. If some dishes are served only there, add the slug to that item's `branches` in `src/config/menu.ts`.
8. Commit and push. The new branch appears in the header selector, the Today list, the branch ledger, the footer, the menu filter, the sitemap, search and JSON-LD, with its own page at `/locations/<slug>/`. Copy that counts branches updates itself.

## How to deploy

Vercel: import the GitHub repository, add the email environment variables, deploy. `vercel.json` already holds the build settings and security headers, and the forms run from `api/` as Edge Functions. Full steps, including the Cloudflare alternative, are in `DEPLOY.md`.

## Blocked on the owner

Run `DEMO=1 npm run audit:placeholders` for the live list. At hand-off:

- Launch-blocking: legal entity name, domain, business email, grievance officer.
- Per branch, not shown until confirmed: door number (Cariappa Road), phone (Channasandra), opening times (both), closing time (Channasandra), Google Maps links, FSSAI licence numbers, access, parking, WhatsApp, takeaway.
- Banquet: hall name, capacity, inclusions, slots and terms.
- Whether the rooms at SN Plaza are run by the same business, and the third outlet Zomato lists.
- Content work: the photos in `SHOT-LIST.md`, the menu with prices, the About story, lawyer review of the legal pages.

The single list to send the owner is `ASSET-REQUEST.md`.

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

- **English only.** The Kannada version was removed at the client's request on 25 October 2026: no `/kn/` pages, no language switch, no Kannada fonts. The brief's Kannada requirements (section 3.3, 3.5, 4.1) no longer apply.

- **Hero image:** the architect's rendering of the Cariappa Road building, as the owner asked, captioned as a rendering. Each branch page and the branch list use the owner's photo of that branch. The Channasandra photo is cropped so the neighbouring bar's sign is not shown. The night photo of the lit sign is processed but not used, because its frame cuts the last letter of the name.
- **Menu:** items come from public listings and the research brief, presented as a partial list with no prices. Seven items seen on only one listing are flagged for confirmation.
- **Hours:** only Cariappa Road's closing time (10:30 PM, consistent across three listings) is shown, with a prompt to call for the opening time. Channasandra shows "Hours to be confirmed". No open or closed badge until every day has both times.
- **Ratings and reviews:** none shown. The reviews link opens a Google Maps search until the exact listing link is supplied.
- **Lint scope:** ESLint covers the JavaScript scripts; TypeScript and Astro files are checked by `astro check`. Prettier formats everything except `.astro` files. This avoids adding packages outside the approved list.
- **Commit messages** carry no tool or AI attribution, following the brief's rule against such credits anywhere.

## Build environment notes

- The Playwright browser download host was blocked in the build environment, so the Playwright and Lighthouse runs used a headless Chromium 153 binary from the npm registry, passed in with `CHROME_PATH`. On a normal machine run `npx playwright install chromium` and leave `CHROME_PATH` unset.
- Outbound requests were blocked, so external links (Google Maps) were listed in `EXTERNAL-LINKS.md` but not fetched (`LINKS_OFFLINE=1`). Run `npm run links` on a connected machine to check them.
- `npm audit` reports advisories only in development tools (Lighthouse CI's dependency tree). Production dependencies: 0 vulnerabilities.
