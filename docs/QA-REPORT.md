# QA report

Run on 2026-10-26 06:34 UTC, mode: pitch demo (DEMO=1).

| Gate | Result | Time |
|---|---|---|
| build | Pass | 2 s |
| check | Pass | 10 s |
| test (unit and Playwright) | Pass | 54 s |
| links | Pass | 1 s |
| lighthouse | Pass | 71 s |
| audit:content | Pass | 0 s |
| audit:contrast | Pass | 0 s |
| audit:placeholders | Pass | 0 s |

## Output (last lines of each gate)

### build

`npm run build`

```
12:02:09 ✓ Completed in 141ms.
12:02:09 [build] ✓ Completed in 634ms.
12:02:09 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
12:02:09 [build] 12 page(s) built in 825ms
12:02:09 [build] Complete!
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
Finished in 0.037 seconds
postbuild: no inline scripts, robots.txt and _headers written
```

### check

`npm run check`

```
> royal-indraprastha-site@1.0.0 check
> astro check && eslint . && prettier --check . && html-validate "dist/**/*.html" && node scripts/bundle-api.mjs --check
12:02:11 [types] Generated 62ms
12:02:11 [check] Getting diagnostics for Astro files in /home/claude/royal-indraprastha...
api/_lib/handler.js:309:12 - warning ts(80002): This constructor function may be converted to a class declaration.
309   function Internals(def) {
               ~~~~~~~~~
Result (76 files): 
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
  ✓  73 tests/e2e/pages.spec.ts:30:5 › /menu/ at 390px (2.1s)
  ✓  75 tests/e2e/pages.spec.ts:30:5 › /menu/ at 1024px (2.0s)
  ✓  74 tests/e2e/pages.spec.ts:30:5 › /menu/ at 768px (2.4s)
  ✓  76 tests/e2e/pages.spec.ts:30:5 › /menu/ at 1440px (2.2s)
  ✓  77 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 320px (1.7s)
  ✓  78 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 360px (2.6s)
  ✓  79 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 390px (2.4s)
  ✓  80 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 768px (2.3s)
  ✓  81 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 1024px (2.0s)
  ✓  84 tests/e2e/pages.spec.ts:30:5 › /terms/ at 360px (1.9s)
  ✓  83 tests/e2e/pages.spec.ts:30:5 › /terms/ at 320px (2.2s)
  ✓  82 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 1440px (2.6s)
  ✓  85 tests/e2e/pages.spec.ts:30:5 › /terms/ at 390px (1.9s)
  ✓  87 tests/e2e/pages.spec.ts:30:5 › /terms/ at 1024px (1.6s)
  ✓  86 tests/e2e/pages.spec.ts:30:5 › /terms/ at 768px (2.1s)
  ✓  89 tests/e2e/pages.spec.ts:30:5 › /visit/ at 320px (1.9s)
  ✓  88 tests/e2e/pages.spec.ts:30:5 › /terms/ at 1440px (2.2s)
  ✓  90 tests/e2e/pages.spec.ts:30:5 › /visit/ at 360px (1.9s)
  ✓  92 tests/e2e/pages.spec.ts:30:5 › /visit/ at 768px (1.8s)
  ✓  91 tests/e2e/pages.spec.ts:30:5 › /visit/ at 390px (2.2s)
  ✓  93 tests/e2e/pages.spec.ts:30:5 › /visit/ at 1024px (2.2s)
  ✓  94 tests/e2e/pages.spec.ts:30:5 › /visit/ at 1440px (2.1s)
  ✓  96 tests/e2e/pages.spec.ts:64:1 › titles and descriptions are unique and within limits (1.6s)
  ✓  95 tests/e2e/pages.spec.ts:54:1 › dark theme passes axe on key pages (4.3s)
  96 passed (52.9s)
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
Started a web server on port 45253...
Running Lighthouse 1 time(s) on http://localhost:45253/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:45253/menu/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:45253/banquet/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:45253/visit/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:45253/contact/
Run #1...done.
Running Lighthouse 1 time(s) on http://localhost:45253/faq/
Run #1...done.
Done running Lighthouse!
Dumping 6 reports to disk at /home/claude/royal-indraprastha/.lighthouseci/reports...
Done writing reports to disk.
Done running autorun.
/            perf 100, a11y 100, best practices 100, SEO 100, LCP 1357 ms, CLS 0.000, TBT 0 ms, JS 3.8 KB
/banquet/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1512 ms, CLS 0.000, TBT 0 ms, JS 13.5 KB
/contact/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1513 ms, CLS 0.000, TBT 0 ms, JS 13.5 KB
/faq/        perf 100, a11y 100, best practices 100, SEO 100, LCP 1366 ms, CLS 0.000, TBT 0 ms, JS 3.8 KB
/menu/       perf 100, a11y 100, best practices 100, SEO 100, LCP 1366 ms, CLS 0.000, TBT 0 ms, JS 4.2 KB
/visit/      perf 100, a11y 100, best practices 100, SEO 100, LCP 1358 ms, CLS 0.000, TBT 0 ms, JS 3.8 KB
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
