# Plan

## Sitemap

English only (changed from the original bilingual plan at the client's request on 25 October 2026).

| Path                                                                           | Notes                                                               |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `/`                                                                            | Home                                                                |
| `/menu/`                                                                       | Partial list, no prices until supplied, print stylesheet            |
| `/banquet/`                                                                    | Enquiry form with confirmation dialog, FAQ subset                   |
| `/locations/`                                                                  | Branch ledger, nearest-branch finder (browser only)                 |
| `/locations/[slug]/`                                                           | One page per branch: address, hours, phone, services, map links     |
| `/visit/`                                                                      | Redirects to `/locations/` (`vercel.json`, `public/_redirects`)     |
| `/contact/`                                                                    | Contact form                                                        |
| `/faq/`                                                                        | `details` and `summary`                                             |
| `/privacy/`, `/terms/`, `/cookies/`, `/cancellation-refund/`, `/data-request/` | Legal                                                               |
| `/about/`                                                                      | Built only when `site.story` is supplied (`src/pages/[page].astro`) |
| `/404`                                                                         | Not found                                                           |

## Components

`BaseLayout` (head, meta, JSON-LD, sign or plain header, footer, notice, progress bar, back-to-top), `Header` (with branch selector and mobile menu), `Footer` (sign-off band), `Floating` (mobile contact panel per branch), `Wordmark`, `TodayLedger`, `BranchLedger`, `HoursBoard`, `AddressBlock`, `CopyButton`, `FaqList`, `VegMark`, `Tumbler` (original line drawing), `Icon`, form components, `Photo` (renders nothing without a photo), `LegalPage`.

## Data model (`src/config/`)

- `src/data/branches.ts`: one object per branch (address, geo, phone, hours, services, hall, sources). Every location fact lives here.
- `site.ts`: brand-wide facts, each confirmed value or `null`, plus a `LAUNCH_REQUIRED` list read by `audit:placeholders`.
- `hours.ts`: helpers over a branch's per-day `{ open, close }`.
- `menu.ts`: categories with items `{ id, name, sources, price: number | null, branches? }`.
- `faq.ts`: questions with an `available` flag computed from config, so an answer is dropped if its fact is `null`.
- `content-dates.ts`: last-updated dates per page.
- `src/content/copy.ts`: every interface string.

## Client JavaScript (one bundled module, target under 15 KB gzip)

Theme, mobile menu with focus trap, progress bar, back-to-top, copy buttons, UTM capture, notice, mobile contact panel, forms (validation, dialog, fetch, states). Pagefind UI script loads only when the search dialog opens.

## API (`functions/api/`)

`enquiry.ts`, `contact.ts`, `data-request.ts`, sharing `src/lib/api.ts` (kept outside `functions/` so it is not a route; origin and content-type checks, size limit, honeypot, timing, optional KV rate limit, zod schemas, Resend call, no logging of personal data). Schemas live in `src/lib/schemas.ts` and are imported by both client and server.

## Tests

- Playwright: every page at 6 widths (overflow, console errors, axe), plus flows: mobile menu, theme, search, FAQ, copy, forms (mocked API: success, field errors, general error), keyboard-only enquiry flow.
- API unit tests with Node's test runner against the function handlers.
- Content, contrast and placeholder audits as Node scripts over `dist/` and `src/config`.
- Branch flows: selector remembered across reloads, nearest-branch sorting with a mocked location (and no request carrying it), menu filter.
- Lighthouse CI on Home, Menu, Banquet, Branches, a branch page, Contact, Questions.
