# QA report

Run on 2026-10-25 07:36 UTC, mode: pitch demo (DEMO=1).

| Gate | Result | Time |
|---|---|---|
| build | Pass | 2 s |
| check | Pass | 12 s |
| test (unit and Playwright) | Pass | 118 s |
| links | Pass | 1 s |
| lighthouse | Pass | 88 s |
| audit:content | Pass | 0 s |
| audit:contrast | Pass | 0 s |
| audit:placeholders | Pass | 0 s |

## Output (last lines of each gate)

### build

`npm run build`

```
13:02:48 [build] Complete!
Running Pagefind v1.5.2 (Extended)
Running from: "/home/claude/royal-indraprastha"
Source:       "dist"
Output:       "dist/pagefind"
[Walking source directory]
Found 23 files matching **/*.{html}
[Parsing files]
Found a data-pagefind-body element on the site.
↳ Ignoring pages without this tag.
[Reading languages]
Discovered 2 languages: kn, en
[Building search indexes]
Total: 
  Indexed 2 languages
  Indexed 22 pages
  Indexed 1249 words
  Indexed 0 filters
  Indexed 0 sorts
Finished in 0.047 seconds
postbuild: 2 inline script hash(es), _headers and robots.txt written
Note: Pagefind doesn't support stemming for the language kn. 
Search will still work, but will not match across root words.
Note: Pagefind doesn't support stemming for the language kn. 
Search will still work, but will not match across root words.
```

### check

`npm run check`

```
> royal-indraprastha-site@1.0.0 check
> astro check && eslint . && prettier --check . && html-validate "dist/**/*.html"
13:02:50 [types] Generated 76ms
13:02:50 [check] Getting diagnostics for Astro files in /home/claude/royal-indraprastha...
Result (72 files): 
- 0 errors
- 0 warnings
- 0 hints
Checking formatting...
All matched files use Prettier code style!
```

### test (unit and Playwright)

`npm run test`

```
  ✓  143 tests/e2e/pages.spec.ts:30:5 › /menu/ at 1440px (2.4s)
  ✓  140 tests/e2e/pages.spec.ts:30:5 › /menu/ at 390px (3.2s)
  ✓  141 tests/e2e/pages.spec.ts:30:5 › /menu/ at 768px (2.9s)
  ✓  142 tests/e2e/pages.spec.ts:30:5 › /menu/ at 1024px (3.0s)
  ✓  145 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 360px (2.5s)
  ✓  144 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 320px (3.0s)
  ✓  146 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 390px (3.0s)
  ✓  147 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 768px (3.2s)
  ✓  150 tests/e2e/pages.spec.ts:30:5 › /terms/ at 320px (2.0s)
  ✓  148 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 1024px (2.9s)
  ✓  149 tests/e2e/pages.spec.ts:30:5 › /privacy/ at 1440px (2.9s)
  ✓  151 tests/e2e/pages.spec.ts:30:5 › /terms/ at 360px (2.7s)
  ✓  152 tests/e2e/pages.spec.ts:30:5 › /terms/ at 390px (2.6s)
  ✓  153 tests/e2e/pages.spec.ts:30:5 › /terms/ at 768px (2.9s)
  ✓  154 tests/e2e/pages.spec.ts:30:5 › /terms/ at 1024px (2.6s)
  ✓  155 tests/e2e/pages.spec.ts:30:5 › /terms/ at 1440px (2.6s)
  ✓  156 tests/e2e/pages.spec.ts:30:5 › /visit/ at 320px (2.5s)
  ✓  157 tests/e2e/pages.spec.ts:30:5 › /visit/ at 360px (2.5s)
  ✓  158 tests/e2e/pages.spec.ts:30:5 › /visit/ at 390px (2.5s)
  ✓  159 tests/e2e/pages.spec.ts:30:5 › /visit/ at 768px (2.6s)
  ✓  160 tests/e2e/pages.spec.ts:30:5 › /visit/ at 1024px (3.3s)
  ✓  161 tests/e2e/pages.spec.ts:30:5 › /visit/ at 1440px (3.4s)
  ✓  163 tests/e2e/pages.spec.ts:64:1 › titles and descriptions are unique and within limits (4.2s)
  ✓  162 tests/e2e/pages.spec.ts:54:1 › dark theme passes axe on key pages (6.3s)
  163 passed (1.9m)
```

### links

`npm run links`

```
> royal-indraprastha-site@1.0.0 links
> node scripts/links.mjs
links: 59 internal URLs checked, 26 external listed
links: no broken links
```

### lighthouse

`npm run lighthouse`

```
Done writing reports to disk.
Done running autorun.
/            perf 100, a11y 100, best practices 100, SEO 100, LCP 1356 ms, CLS 0.000, TBT 0 ms, JS 3.1 KB
/            perf 100, a11y 100, best practices 100, SEO 100, LCP 1376 ms, CLS 0.000, TBT 0 ms, JS 3.1 KB
/            perf 100, a11y 100, best practices 100, SEO 100, LCP 1375 ms, CLS 0.000, TBT 0 ms, JS 3.1 KB
/banquet/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1514 ms, CLS 0.000, TBT 0 ms, JS 12.8 KB
/banquet/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1527 ms, CLS 0.000, TBT 0 ms, JS 12.8 KB
/banquet/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1533 ms, CLS 0.000, TBT 0 ms, JS 12.8 KB
/contact/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1560 ms, CLS 0.000, TBT 0 ms, JS 12.8 KB
/contact/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1507 ms, CLS 0.000, TBT 0 ms, JS 12.8 KB
/contact/    perf 100, a11y 100, best practices 100, SEO 100, LCP 1524 ms, CLS 0.000, TBT 0 ms, JS 12.8 KB
/faq/        perf 100, a11y 100, best practices 100, SEO 100, LCP 1373 ms, CLS 0.000, TBT 0 ms, JS 3.1 KB
/faq/        perf 100, a11y 100, best practices 100, SEO 100, LCP 1368 ms, CLS 0.000, TBT 0 ms, JS 3.1 KB
/faq/        perf 100, a11y 100, best practices 100, SEO 100, LCP 1366 ms, CLS 0.000, TBT 0 ms, JS 3.1 KB
/kn/         perf 99, a11y 100, best practices 100, SEO 100, LCP 1665 ms, CLS 0.020, TBT 0 ms, JS 3.1 KB
/kn/         perf 99, a11y 100, best practices 100, SEO 100, LCP 1603 ms, CLS 0.019, TBT 0 ms, JS 3.1 KB
/kn/         perf 99, a11y 100, best practices 100, SEO 100, LCP 1665 ms, CLS 0.020, TBT 0 ms, JS 3.1 KB
/menu/       perf 100, a11y 100, best practices 100, SEO 100, LCP 1362 ms, CLS 0.000, TBT 0 ms, JS 3.5 KB
/menu/       perf 100, a11y 100, best practices 100, SEO 100, LCP 1357 ms, CLS 0.000, TBT 0 ms, JS 3.5 KB
/menu/       perf 100, a11y 100, best practices 100, SEO 100, LCP 1364 ms, CLS 0.000, TBT 0 ms, JS 3.5 KB
/visit/      perf 100, a11y 100, best practices 100, SEO 100, LCP 1372 ms, CLS 0.000, TBT 0 ms, JS 3.1 KB
/visit/      perf 100, a11y 100, best practices 100, SEO 100, LCP 1378 ms, CLS 0.000, TBT 0 ms, JS 3.1 KB
/visit/      perf 100, a11y 100, best practices 100, SEO 100, LCP 1393 ms, CLS 0.000, TBT 0 ms, JS 3.1 KB
Checking assertions against 7 URL(s), 7 total run(s)
All results processed!
```

### audit:content

`npm run audit:content`

```
> royal-indraprastha-site@1.0.0 audit:content
> node scripts/audit-content.mjs
audit:content passed (23 pages, demo mode)
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
  kannada: 229 string(s) marked NEEDS-NATIVE-REVIEW in src/i18n/kn.ts (plus menu, FAQ and legal summaries)
7 launch-blocking value(s) missing: legalName, domain, address.line1, email, googleMapsUrl, fssaiLicence, grievanceOfficer
DEMO mode: not failing.
```
