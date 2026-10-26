# QA report

Run on 2026-10-26 06:19 UTC, mode: pitch demo (DEMO=1).

| Gate | Result | Time |
|---|---|---|
| build | Pass | 2 s |
| check | Pass | 10 s |
| test (unit and Playwright) | Pass | 62 s |
| links | Pass | 1 s |
| lighthouse | Pass | 73 s |
| audit:content | Pass | 0 s |
| audit:contrast | Pass | 0 s |
| audit:placeholders | Pass | 0 s |

## Output (last lines of each gate)

### build

`npm run build`

```
11:47:00 ✓ Completed in 102ms.
11:47:00 [build] ✓ Completed in 589ms.
11:47:00 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
11:47:00 [build] 12 page(s) built in 755ms
11:47:00 [build] Complete!
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
Finished in 0.024 seconds
postbuild: no inline scripts, robots.txt and _headers written
```

### check

`npm run check`

```
> royal-indraprastha-site@1.0.0 check
> astro check && eslint . && prettier --check . && html-validate "dist/**/*.html"
11:47:01 [types] Generated 60ms
11:47:01 [check] Getting diagnostics for Astro files in /home/claude/royal-indraprastha...
Result (73 files): 
- 0 errors
- 0 warnings
- 0 hints
Checking formatting...
All matched files use Prettier code style!
```

### test (unit and Playwright)

`npm run test`

```
  ✓  74 tests/e2e/pages.spec.ts:30:5 › /menu/ at 768px (2.0s)
  ✓  75 tests/e2e/pages.spec.ts:30:5 › /menu/ at 1024px (2.2s)
  ✓  73 tests/e2e/pages.spec.ts:30:5 › /menu/ at 390px (2.7s)
  ✓  76 tests/e2e/pages.spec.ts:30:5 › /menu/ at 1440px (2.2s)
  ✓  78 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 360px (2.3s)
  ✓  77 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 320px (3.0s)
  ✓  79 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 390px (2.9s)
  ✓  80 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 768px (2.8s)
  ✓  81 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 1024px (2.9s)
  ✓  83 tests/e2e/pages.spec.ts:30:5 › /terms/ at 320px (2.2s)
  ✓  82 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 1440px (2.9s)
  ✓  84 tests/e2e/pages.spec.ts:30:5 › /terms/ at 360px (1.9s)
  ✓  86 tests/e2e/pages.spec.ts:30:5 › /terms/ at 768px (1.9s)
  ✓  85 tests/e2e/pages.spec.ts:30:5 › /terms/ at 390px (2.4s)
  ✓  87 tests/e2e/pages.spec.ts:30:5 › /terms/ at 1024px (2.1s)
  ✓  88 tests/e2e/pages.spec.ts:30:5 › /terms/ at 1440px (2.1s)
  ✓  89 tests/e2e/pages.spec.ts:30:5 › /visit/ at 320px (1.9s)
  ✓  90 tests/e2e/pages.spec.ts:30:5 › /visit/ at 360px (2.1s)
  ✓  91 tests/e2e/pages.spec.ts:30:5 › /visit/ at 390px (2.2s)
  ✓  92 tests/e2e/pages.spec.ts:30:5 › /visit/ at 768px (2.1s)
  ✓  93 tests/e2e/pages.spec.ts:30:5 › /visit/ at 1024px (2.3s)
  ✓  96 tests/e2e/pages.spec.ts:64:1 › titles and descriptions are unique and within limits (2.0s)
  ✓  94 tests/e2e/pages.spec.ts:30:5 › /visit/ at 1440px (2.6s)
  ✓  95 tests/e2e/pages.spec.ts:54:1 › dark theme passes axe on key pages (4.8s)
  96 passed (1.0m)
```

### links

`npm run links`

```
> royal-indraprastha-site@1.0.0 links
> node scripts/links.mjs
links: 36 internal URLs checked, 15 external listed
links: no broken links
```

### lighthouse

`npm run lighthouse`

```
Started a web server on port 42653...
Running Lighthouse 1 time(s) on http://localhost:42653/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:42653/menu/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:42653/banquet/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:42653/visit/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:42653/contact/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:42653/faq/
Run #1...done.
Done running Lighthouse!
Dumping 6 reports to disk at /home/claude/royal-indraprastha/.lighthouseci/reports...
Done writing reports to disk.
Done running autorun.
/            perf 100, a11y 100, best practices 100, SEO 100, LCP 1369 ms, CLS 0.000, TBT 0 ms, JS 3.8 KB
/banquet/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1516 ms, CLS 0.000, TBT 0 ms, JS 13.5 KB
/contact/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1521 ms, CLS 0.000, TBT 0 ms, JS 13.5 KB
/faq/        perf 100, a11y 100, best practices 100, SEO 100, LCP 1366 ms, CLS 0.000, TBT 0 ms, JS 3.8 KB
/menu/       perf 100, a11y 100, best practices 100, SEO 100, LCP 1381 ms, CLS 0.000, TBT 0 ms, JS 4.2 KB
/visit/      perf 100, a11y 100, best practices 100, SEO 100, LCP 1360 ms, CLS 0.000, TBT 0 ms, JS 3.8 KB
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
