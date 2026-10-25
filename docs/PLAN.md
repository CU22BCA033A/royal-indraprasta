# Plan

## Sitemap

English only (changed from the original bilingual plan at the client's request on 25 October 2026).

| Path                                                                           | Notes                                                                  |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `/`                                                                            | Home                                                                   |
| `/menu/`                                                                       | Partial list, no prices until supplied, print stylesheet               |
| `/banquet/`                                                                    | Enquiry form with confirmation dialog, FAQ subset                      |
| `/visit/`                                                                      | Address, closing time, phone, directions                               |
| `/contact/`                                                                    | Contact form                                                           |
| `/faq/`                                                                        | `details` and `summary`                                                |
| `/privacy/`, `/terms/`, `/cookies/`, `/cancellation-refund/`, `/data-request/` | Legal                                                                  |
| `/stay/`                                                                       | Built only when `site.modules.stay` is true (`src/pages/[page].astro`) |
| `/about/`                                                                      | Built only when `site.story` is supplied (`src/pages/[page].astro`)    |
| `/404`                                                                         | Not found                                                              |

## Components

`BaseLayout` (head, meta, JSON-LD, header, footer, notice, progress bar, back-to-top, mobile contact), `Header`, `MobileMenu`, `Wordmark`, `LatticeRule`, `Search` (Pagefind dialog), `ThemeToggle`, `HoursTable`, `AddressBlock` (copy button), `CopyButton`, `FaqList`, `MenuList`, `Field` helpers, `EnquiryForm`, `ContactForm`, `DataRequestForm`, `Photo` (renders nothing without a photo), `LegalPage`.

## Data model (`src/config/`)

- `site.ts`: business facts, each confirmed value or `null`, plus `modules` flags and a `LAUNCH_REQUIRED` list read by `audit:placeholders`.
- `hours.ts`: per-day `{ open: string | null, close: string | null }`.
- `menu.ts`: categories with items `{ id, name, sources, price: number | null }`.
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
- Lighthouse CI on Home, Menu, Banquet, Visit, Contact.
