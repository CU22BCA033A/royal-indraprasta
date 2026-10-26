# QA report

Run on 2026-10-26 07:54 UTC, mode: pitch demo (DEMO=1).

| Gate | Result | Time |
|---|---|---|
| build | Pass | 2 s |
| check | Pass | 12 s |
| test (unit and Playwright) | Pass | 67 s |
| links | Pass | 0 s |
| lighthouse | Pass | 82 s |
| audit:content | Pass | 0 s |
| audit:contrast | Pass | 0 s |
| audit:placeholders | Pass | 0 s |

## Output (last lines of each gate)

### build

`npm run build`

```
13:21:39 ✓ Completed in 174ms.
13:21:39 [build] ✓ Completed in 637ms.
13:21:39 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
13:21:39 [build] 14 page(s) built in 801ms
13:21:39 [build] Complete!
Running Pagefind v1.5.2 (Extended)
Running from: "/home/claude/royal-indraprastha"
Source:       "dist"
Output:       "dist/pagefind"
[Walking source directory]
Found 14 files matching **/*.{html}
[Parsing files]
Found a data-pagefind-body element on the site.
↳ Ignoring pages without this tag.
[Reading languages]
Discovered 1 language: en-in
[Building search indexes]
Total: 
  Indexed 1 language
  Indexed 13 pages
  Indexed 540 words
  Indexed 0 filters
  Indexed 0 sorts
Finished in 0.043 seconds
postbuild: no inline scripts, robots.txt and _headers written
```

### check

`npm run check`

```
> royal-indraprastha-site@1.0.0 check
> astro check && eslint . && prettier --check . && html-validate "dist/**/*.html" && node scripts/bundle-api.mjs --check
13:21:41 [types] Generated 64ms
13:21:41 [check] Getting diagnostics for Astro files in /home/claude/royal-indraprastha...
api/_lib/handler.js:309:12 - warning ts(80002): This constructor function may be converted to a class declaration.
309   function Internals(def) {
               ~~~~~~~~~
Result (81 files): 
- 0 errors
- 0 warnings
- 1 hint
Checking formatting...
All matched files use Prettier code style!
api bundle up to date
```

### test (unit and Playwright)

`npm run test`

```
  ✓   89 tests/e2e/pages.spec.ts:30:5 › /locations/ at 390px (2.1s)
  ✓   90 tests/e2e/pages.spec.ts:30:5 › /locations/ at 768px (2.2s)
  ✓   91 tests/e2e/pages.spec.ts:30:5 › /locations/ at 1024px (2.1s)
  ✓   92 tests/e2e/pages.spec.ts:30:5 › /locations/ at 1440px (2.1s)
  ✓   93 tests/e2e/pages.spec.ts:30:5 › /menu/ at 320px (2.7s)
  ✓   94 tests/e2e/pages.spec.ts:30:5 › /menu/ at 360px (2.1s)
  ✓   95 tests/e2e/pages.spec.ts:30:5 › /menu/ at 390px (3.1s)
  ✓   96 tests/e2e/pages.spec.ts:30:5 › /menu/ at 768px (2.9s)
  ✓   97 tests/e2e/pages.spec.ts:30:5 › /menu/ at 1024px (2.4s)
  ✓   98 tests/e2e/pages.spec.ts:30:5 › /menu/ at 1440px (3.1s)
  ✓   99 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 320px (2.6s)
  ✓  100 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 360px (2.4s)
  ✓  101 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 390px (2.4s)
  ✓  102 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 768px (1.9s)
  ✓  105 tests/e2e/pages.spec.ts:30:5 › /terms/ at 320px (1.8s)
  ✓  103 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 1024px (2.3s)
  ✓  104 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 1440px (2.2s)
  ✓  106 tests/e2e/pages.spec.ts:30:5 › /terms/ at 360px (2.0s)
  ✓  107 tests/e2e/pages.spec.ts:30:5 › /terms/ at 390px (1.9s)
  ✓  109 tests/e2e/pages.spec.ts:30:5 › /terms/ at 1024px (2.2s)
  ✓  108 tests/e2e/pages.spec.ts:30:5 › /terms/ at 768px (2.6s)
  ✓  110 tests/e2e/pages.spec.ts:30:5 › /terms/ at 1440px (2.0s)
  ✓  112 tests/e2e/pages.spec.ts:72:1 › titles and descriptions are unique and within limits (1.6s)
  ✓  111 tests/e2e/pages.spec.ts:54:1 › dark theme passes axe on key pages (6.1s)
  112 passed (1.1m)
```

### links

`npm run links`

```
> royal-indraprastha-site@1.0.0 links
> node scripts/links.mjs
links: 40 internal URLs checked, 20 external listed
links: no broken links
```

### lighthouse

`npm run lighthouse`

```
Running Lighthouse 1 time(s) on http://localhost:33473/menu/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:33473/banquet/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:33473/locations/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:33473/locations/channasandra/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:33473/contact/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:33473/faq/
Run #1...done.
Done running Lighthouse!
Dumping 7 reports to disk at /home/claude/royal-indraprastha/.lighthouseci/reports...
Done writing reports to disk.
Done running autorun.
/            perf 100, a11y 100, best practices 100, SEO 100, LCP 1217 ms, CLS 0.000, TBT 0 ms, JS 4.6 KB
/banquet/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1372 ms, CLS 0.000, TBT 0 ms, JS 14.3 KB
/contact/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1375 ms, CLS 0.000, TBT 0 ms, JS 14.3 KB
/faq/        perf 100, a11y 100, best practices 100, SEO 100, LCP 1222 ms, CLS 0.000, TBT 0 ms, JS 4.6 KB
/locations/  perf 100, a11y 100, best practices 100, SEO 100, LCP 1203 ms, CLS 0.000, TBT 0 ms, JS 4.6 KB
/locations/channasandra/ perf 100, a11y 100, best practices 100, SEO 100, LCP 1210 ms, CLS 0.000, TBT 0 ms, JS 4.6 KB
/menu/       perf 100, a11y 100, best practices 100, SEO 100, LCP 1241 ms, CLS 0.000, TBT 0 ms, JS 5.0 KB
Checking assertions against 7 URL(s), 7 total run(s)
All results processed!
```

### audit:content

`npm run audit:content`

```
> royal-indraprastha-site@1.0.0 audit:content
> node scripts/audit-content.mjs
audit:content passed (14 pages, demo mode)
```

### audit:contrast

`npm run audit:contrast`

```
> royal-indraprastha-site@1.0.0 audit:contrast
> node scripts/audit-contrast.mjs
audit:contrast passed (40 pairs), docs/CONTRAST.md written
```

### audit:placeholders

`npm run audit:placeholders`

```
  optional       hall.standing
  optional       hall.inclusions
  optional       fssaiLicence
  optional       access
  optional       parking
  optional       hours: opening and/or closing time not confirmed
Branch "Channasandra" (src/data/branches.ts):
  optional       landmark
  optional       geo
  optional       phone
  optional       whatsapp
  optional       googleMapsUrl
  optional       services.takeaway
  optional       hall
  optional       fssaiLicence
  optional       access
  optional       parking
  optional       hours: opening and/or closing time not confirmed
  NOTE           no phone: Call buttons for this branch are hidden
Other open items:
  menu: 19 item(s) without a price (only priced items show a price)
  menu: confirm with owner (one listing only): rava-idli, rice-bath, butter-masala-dosa, onion-dosa, paneer-butter-masala, butter-kulcha, soup, mushroom-grill-sandwich, lime-juice, ice-cream
  photos: none supplied yet for 12 of 12 shots
4 launch-blocking value(s) missing: legalName, domain, email, grievanceOfficer
DEMO mode: not failing.
```
