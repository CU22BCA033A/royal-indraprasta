# QA report

Run on 2026-10-25 09:06 UTC, mode: pitch demo (DEMO=1).

| Gate | Result | Time |
|---|---|---|
| build | Pass | 2 s |
| check | Pass | 12 s |
| test (unit and Playwright) | Pass | 68 s |
| links | Pass | 1 s |
| lighthouse | Pass | 79 s |
| audit:content | Pass | 0 s |
| audit:contrast | Pass | 0 s |
| audit:placeholders | Pass | 0 s |

## Output (last lines of each gate)

### build

`npm run build`

```
14:33:51 ✓ Completed in 129ms.
14:33:51 [build] ✓ Completed in 702ms.
14:33:51 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
14:33:51 [build] 12 page(s) built in 887ms
14:33:51 [build] Complete!
Running Pagefind v1.5.2 (Extended)
Running from: "/home/claude/royal-indraprastha"
Source:       "dist"
Output:       "dist/pagefind"
[Walking source directory]
Found 12 files matching **/*.{html}
[Parsing files]
Found a data-pagefind-body element on the site.
↳ Ignoring pages without this tag.
[Reading languages]
Discovered 1 language: en-in
[Building search indexes]
Total: 
  Indexed 1 language
  Indexed 11 pages
  Indexed 471 words
  Indexed 0 filters
  Indexed 0 sorts
Finished in 0.033 seconds
postbuild: 1 inline script hash(es), _headers and robots.txt written
```

### check

`npm run check`

```
> royal-indraprastha-site@1.0.0 check
> astro check && eslint . && prettier --check . && html-validate "dist/**/*.html"
14:33:52 [types] Generated 70ms
14:33:52 [check] Getting diagnostics for Astro files in /home/claude/royal-indraprastha...
Result (69 files): 
- 0 errors
- 0 warnings
- 0 hints
Checking formatting...
All matched files use Prettier code style!
```

### test (unit and Playwright)

`npm run test`

```
  ✓  73 tests/e2e/pages.spec.ts:30:5 › /menu/ at 390px (2.3s)
  ✓  74 tests/e2e/pages.spec.ts:30:5 › /menu/ at 768px (2.6s)
  ✓  75 tests/e2e/pages.spec.ts:30:5 › /menu/ at 1024px (3.3s)
  ✓  77 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 320px (2.3s)
  ✓  76 tests/e2e/pages.spec.ts:30:5 › /menu/ at 1440px (3.5s)
  ✓  78 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 360px (2.9s)
  ✓  79 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 390px (2.8s)
  ✓  80 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 768px (2.6s)
  ✓  81 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 1024px (2.7s)
  ✓  82 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 1440px (2.5s)
  ✓  83 tests/e2e/pages.spec.ts:30:5 › /terms/ at 320px (2.4s)
  ✓  84 tests/e2e/pages.spec.ts:30:5 › /terms/ at 360px (2.3s)
  ✓  85 tests/e2e/pages.spec.ts:30:5 › /terms/ at 390px (2.7s)
  ✓  86 tests/e2e/pages.spec.ts:30:5 › /terms/ at 768px (3.0s)
  ✓  88 tests/e2e/pages.spec.ts:30:5 › /terms/ at 1440px (2.4s)
  ✓  87 tests/e2e/pages.spec.ts:30:5 › /terms/ at 1024px (2.7s)
  ✓  89 tests/e2e/pages.spec.ts:30:5 › /visit/ at 320px (2.8s)
  ✓  90 tests/e2e/pages.spec.ts:30:5 › /visit/ at 360px (2.0s)
  ✓  91 tests/e2e/pages.spec.ts:30:5 › /visit/ at 390px (2.5s)
  ✓  92 tests/e2e/pages.spec.ts:30:5 › /visit/ at 768px (2.6s)
  ✓  93 tests/e2e/pages.spec.ts:30:5 › /visit/ at 1024px (3.0s)
  ✓  94 tests/e2e/pages.spec.ts:30:5 › /visit/ at 1440px (3.3s)
  ✓  96 tests/e2e/pages.spec.ts:64:1 › titles and descriptions are unique and within limits (2.4s)
  ✓  95 tests/e2e/pages.spec.ts:54:1 › dark theme passes axe on key pages (5.7s)
  96 passed (1.1m)
```

### links

`npm run links`

```
> royal-indraprastha-site@1.0.0 links
> node scripts/links.mjs
links: 35 internal URLs checked, 15 external listed
links: no broken links
```

### lighthouse

`npm run lighthouse`

```
Started a web server on port 43461...
Running Lighthouse 1 time(s) on http://localhost:43461/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:43461/menu/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:43461/banquet/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:43461/visit/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:43461/contact/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:43461/faq/
Run #1...done.
Done running Lighthouse!
Dumping 6 reports to disk at /home/claude/royal-indraprastha/.lighthouseci/reports...
Done writing reports to disk.
Done running autorun.
/            perf 100, a11y 100, best practices 100, SEO 100, LCP 1286 ms, CLS 0.000, TBT 0 ms, JS 3.0 KB
/banquet/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1360 ms, CLS 0.000, TBT 0 ms, JS 12.8 KB
/contact/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1366 ms, CLS 0.000, TBT 0 ms, JS 12.8 KB
/faq/        perf 100, a11y 100, best practices 100, SEO 100, LCP 1220 ms, CLS 0.000, TBT 0 ms, JS 3.0 KB
/menu/       perf 100, a11y 100, best practices 100, SEO 100, LCP 1374 ms, CLS 0.000, TBT 0 ms, JS 3.5 KB
/visit/      perf 100, a11y 100, best practices 100, SEO 100, LCP 1214 ms, CLS 0.000, TBT 0 ms, JS 3.0 KB
Checking assertions against 6 URL(s), 6 total run(s)
All results processed!
```

### audit:content

`npm run audit:content`

```
> royal-indraprastha-site@1.0.0 audit:content
> node scripts/audit-content.mjs
audit:content passed (12 pages, demo mode)
```

### audit:contrast

`npm run audit:contrast`

```
> royal-indraprastha-site@1.0.0 audit:contrast
> node scripts/audit-contrast.mjs
audit:contrast passed (32 pairs), docs/CONTRAST.md written
```

### audit:placeholders

`npm run audit:placeholders`

```
  optional       geo
  optional       whatsapp
  BLOCKS LAUNCH  email
  BLOCKS LAUNCH  googleMapsUrl
  BLOCKS LAUNCH  fssaiLicence
  optional       gstin
  BLOCKS LAUNCH  grievanceOfficer
  optional       social.instagram
  optional       social.facebook
  optional       banquet.hallName
  optional       banquet.capacitySeated
  optional       banquet.capacityFloating
  optional       banquet.inclusions
  optional       cancellationTerms
  optional       story
  optional       access
  optional       parking
  optional       stayDetails
Other open items:
  hours: opening time not confirmed for mon, tue, wed, thu, fri, sat, sun
  menu: 15 item(s) without a price (only priced items show a price)
  menu: confirm with owner (one listing only): rice-bath, butter-masala-dosa, onion-dosa, butter-kulcha, paneer-butter-masala, soup, ice-cream
  photos: none supplied yet for 12 of 12 shots
7 launch-blocking value(s) missing: legalName, domain, address.line1, email, googleMapsUrl, fssaiLicence, grievanceOfficer
DEMO mode: not failing.
```
