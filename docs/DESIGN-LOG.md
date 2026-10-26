# Design log

Scored by looking at full-page screenshots at 390 px and 1440 px in light and dark, against the rubric in `AUDIT.md`. Screenshots for each round are in `docs/design-rounds/<round>/` (made with `node scripts/shots.mjs <round>`).

These are self-assessed scores. They are honest about the gap that remains, but they were not given by an independent reviewer.

## Scores per round

| Area            | R0 (audit) | R1  | R2  | R3  | R4  |
| --------------- | ---------- | --- | --- | --- | --- |
| Hierarchy       | 4          | 6   | 7   | 8   | 9   |
| Spacing rhythm  | 3          | 6   | 7   | 8   | 9   |
| Typography      | 5          | 7   | 8   | 9   | 9   |
| Colour use      | 5          | 7   | 8   | 9   | 9   |
| Imagery         | 2          | 4   | 5   | 6   | 6   |
| Consistency     | 7          | 6   | 7   | 8   | 9   |
| Craft details   | 5          | 6   | 7   | 8   | 9   |
| Distinctiveness | 2          | 6   | 7   | 8   | 9   |
| Mobile quality  | 5          | 6   | 7   | 8   | 9   |
| Copy quality    | 6          | 7   | 8   | 8   | 9   |
| **Average**     | **4.4**    | 6.1 | 7.1 | 8.0 | 8.7 |

**Target was 9 in every area. Imagery is held at 6** and cannot honestly go higher until the owner's photographs arrive: the site uses no stock, AI or internet photos, so the only imagery is type, the signboard field, the brass frame and one original line drawing (the tumbler and dabara). Every other area is at 9.

## What changed in each round

### Round 0: audit of the first build

Ivory pages, one section padding everywhere, equal weight on every block, Young Serif headings. Distinctiveness 2: with the wordmark covered it could have been any warm-palette small business. Full notes in `AUDIT.md`.

### Round 1: the signboard

- Chose hero concept A (Signboard) from the three in `DESIGN-DIRECTION.md`. The home hero became a maroon signboard field with a double brass frame, "Royal Indraprastha" set in Rozha One at poster size, and the header joins the field on the home page.
- Replaced Young Serif with Rozha One for display. Figtree stays for text.
- Introduced the 12-column grid (4 on phones) and the "band" system: sign band, paper band, plain band, so pages alternate pace.
- Branch data model added (`src/data/branches.ts`); the "Visit" page became `/locations/` with one page per branch.
- Problems found: "Indraprastha" broke mid-word at 1024 px; small labels were rendering in the display face; the header on the home page rendered light against the dark hero.

### Round 2: the menu set as a menu

- Home "On the board" section: numbered category columns (01 Tiffin, 02 Dosa...), dish rows on hairlines, veg mark or branch note at the right edge.
- Menu page: a huge "Menu" title, a segmented branch filter, and real tables (dish, mark, served at) with fixed column widths so rows align across categories.
- Fixes: container-query sizing for the hero name so it never breaks; kicker labels always in Figtree; table columns aligned with `colgroup`.
- Problems found: a strip at the right edge from `scrollbar-gutter`; forms cramped because they still used the old spacing tokens; the filter wrapped on narrow phones.

### Round 3: branches and the hall

- "Today" ledger beside the hero: one row per branch, closing time set large in figures where confirmed, "Hours to be confirmed" where not, phone and directions per branch, "Your branch" marker driven by the header branch selector.
- Branch ledger on Home and `/locations/`: large numerals, name, address, services, actions. Uses a container query so it reflows by its own width.
- Banquet page rebuilt around a sign-band head ("Hold your function at Cariappa Road"), a numbered three-step "How booking works", and the enquiry form beside a call panel.
- Footer became a sign-off in the signboard colours with per-branch columns.
- Fixes: floating Contact button no longer covers the hero or a visible submit button; contact page no longer repeats "Send a message"; inline styles removed.

### Round 4: polish and stress tests

- Open Graph image and favicons redrawn in the signboard colours with Rozha One.
- Every count of branches in visible copy is now computed ("two branches" becomes "three branches" when one is added), and "Both branches" became "All branches".
- Banquet head: the hall address now sits under a brass rule, separate from the lead paragraph.
- Phone numbers use non-breaking spaces so they never wrap; telephone links that show a number now say which branch they call to screen readers without an `aria-label` mismatch.
- Branch page descriptions shortened to fit search result limits.
- Duplicate "Main" navigation label in the footer renamed "Pages".

## Stress tests (round 4)

| Test                | How                                                             | Result                                                                                                                                                                                                                                                        |
| ------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Squint              | Blurred the 1440 px home screenshot                             | Three clear masses: the signboard (dark), the menu board (light with ruled columns), the branch ledger. The eye lands on the name first, then "Today", then the menu. Pass.                                                                                   |
| Cover the logo      | Hid the wordmark and hero name                                  | Still reads as a South Indian vegetarian restaurant: maroon and brass signboard, "closes 10:30 pm", a tiffin-to-chaat board with veg marks, the steel tumbler drawing. Would not be mistaken for a clinic or a law firm. Pass.                                |
| Thumb               | 390 px screenshots, primary actions within the lower two thirds | "Call Cariappa Road" and "The full menu" sit inside the hero at full width-friendly sizes; the header has one Menu button; every tap target is at least 44 px (24 px minimum checked by axe). Pass.                                                           |
| No photos           | `round-4-no-photos/`, photo requests blocked                    | Pages are composed for no photos from the start; `Photo` renders nothing when a file is missing, so there are no empty frames or broken images. The banquet steps column carries the right side alone. Pass, but imagery stays at 6 until real photos arrive. |
| Dark                | `round-4-dark/`                                                 | Signboard deepens to `#3A1016`; paper bands become warm brown, not black. All pairs pass in `CONTRAST.md`. Pass.                                                                                                                                              |
| Forced colours      | `forced-colors: active` rules in `base.css`                     | Buttons, the board frame and the branch select keep visible borders.                                                                                                                                                                                          |
| Lighthouse (mobile) | `npm run lighthouse` on 7 pages                                 | 100 / 100 / 100 / 100 on every page tested; largest contentful paint 1.2 to 1.5 s simulated; layout shift 0.                                                                                                                                                  |
