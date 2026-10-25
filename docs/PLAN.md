# Plan

## Sitemap
| Path (EN) | Path (KN) | Notes |
|---|---|---|
| `/` | `/kn/` | Home |
| `/menu/` | `/kn/menu/` | Partial list, no prices until supplied, print stylesheet |
| `/banquet/` | `/kn/banquet/` | Enquiry form with confirmation dialog, FAQ subset |
| `/visit/` | `/kn/visit/` | Address, closing time, phone, directions |
| `/contact/` | `/kn/contact/` | Contact form |
| `/faq/` | `/kn/faq/` | `details` and `summary` |
| `/privacy/`, `/terms/`, `/cookies/`, `/cancellation-refund/`, `/data-request/` | same under `/kn/` | Legal |
| `/stay/` | `/kn/stay/` | Built only when `site.modules.stay` is true |
| `/about/` | `/kn/about/` | Built only when `site.story` is supplied |
| `/404` | | Bilingual |

## Components
`BaseLayout` (head, meta, JSON-LD, header, footer, notice, progress bar, back-to-top, mobile contact), `Header`, `MobileMenu`, `Wordmark`, `LatticeRule`, `Search` (Pagefind dialog), `ThemeToggle`, `LangSwitch`, `HoursTable`, `AddressBlock` (copy button), `CopyButton`, `FaqList`, `MenuList`, `Field` helpers, `EnquiryForm`, `ContactForm`, `DataRequestForm`, `Photo` (renders nothing without a photo), `LegalPage`.

## Data model (`src/config/`)
- `site.ts`: business facts, each confirmed value or `null`, plus `modules` flags and a `blockingForLaunch` list derived automatically.
- `hours.ts`: per-day `{ open: string | null, close: string | null }`.
- `menu.ts`: categories with items `{ en, kn, source, price: number | null }`.
- `faq.ts`: questions with `requires` (keys in `site`) so an answer is dropped if its fact is `null`.
- `content-dates.ts`: last-updated dates per page.
- `src/i18n/en.ts`, `kn.ts`: every UI string. `kn.ts` carries a `NEEDS-NATIVE-REVIEW` marker per string.

## Client JavaScript (one bundled module, target under 15 KB gzip)
Theme, language preference, mobile menu with focus trap, progress bar, back-to-top, copy buttons, UTM capture, notice, mobile contact panel, forms (validation, dialog, fetch, states). Pagefind UI script loads only when the search dialog opens.

## API (`functions/api/`)
`enquiry.ts`, `contact.ts`, `data-request.ts`, sharing `_lib.ts` (origin and content-type checks, size limit, honeypot, timing, optional KV rate limit, zod schemas, Resend call, no logging of personal data). Schemas live in `src/lib/schemas.ts` and are imported by both client and server.

## Tests
- Playwright: every page at 6 widths (overflow, console errors, axe), plus flows: mobile menu, theme, language, search, FAQ, copy, forms (mocked API: success, field errors, general error), keyboard-only enquiry flow.
- API unit tests with Node's test runner against the function handlers.
- Content, contrast and placeholder audits as Node scripts over `dist/` and `src/config`.
- Lighthouse CI on Home, Menu, Banquet, Visit, Contact.
