# Brand analysis

## Reading

Royal Indraprastha is a neighbourhood pure vegetarian restaurant on Field Marshal Cariappa Road in RR Nagar. Listings point to an all-day place: idli, vada and coffee in the morning, North Indian dishes such as butter kulcha and paneer butter masala later, chaat and badam milk in the evening, and a hall for family events at the same address. Thousands of public reviews on one listing suggest heavy local footfall. The name borrows the grandeur of the Pandava capital, but the business itself is everyday and civic.

Risk: "Royal" invites a purple, gold and crown template. That would misrepresent a busy tiffin room and would look like every banquet marketplace page.

Tone: dependable, clean, warm, civic, with a restrained heritage note.

## Concept: the signboard

Superseded the first "printed menu board" concept after the round-0 audit. Full reasoning in `DESIGN-DIRECTION.md`.

- The home hero is a signboard: a maroon field, a double brass frame with diamond studs, the name at poster size. The header joins the field on the home page.
- Paper bands in ivory carry the menu, set like a printed menu card: numbered categories, ruled rows, a veg mark at the right edge.
- Pages alternate pace (sign band, plain band, paper band) on a 12-column grid with deliberate asymmetry.
- One original illustration: a steel tumbler and dabara in brass line. No stock or AI imagery.
- No cards, shadows, gradients or rounded pills. Square corners.

## Colour

Tokens live in `src/styles/tokens.css`. Contrast for every pair is computed by `npm run audit:contrast` and written to `docs/CONTRAST.md`.

| Token             | Light   | Dark    | Use                                        |
| ----------------- | ------- | ------- | ------------------------------------------ |
| `--sign`          | #4A1219 | #3A1016 | Signboard field: hero, page heads, footer  |
| `--on-sign`       | #F3E6CF | #F3E6CF | Text on the signboard                      |
| `--on-sign-muted` | #D9C7A8 | #D9C7A8 | Secondary text on the signboard            |
| `--brass`         | #D8AE62 | #D9AE63 | Frame, labels and buttons on the signboard |
| `--bg`            | #F6EFE2 | #1C1512 | Page                                       |
| `--surface`       | #EFE5D3 | #261C17 | Paper bands                                |
| `--text`          | #2A1D16 | #F1E8D8 | Body                                       |
| `--muted`         | #5B4A3F | #CDBFA9 | Secondary text                             |
| `--primary`       | #6E1F2B | #E3A3A8 | Links, buttons, focus ring                 |
| `--brass-ink`     | #6F5116 | #D9AE63 | Small labels and numerals on paper         |
| `--veg`           | #2F6B3F | #7FBF8E | Veg mark                                   |
| `--error`         | #A3261B | #F0A59E | Form errors                                |

`prefers-contrast: more` raises muted text on the signboard to full strength.

## Type

- Display: Rozha One 400 (OFL). A high-contrast Indian display serif, the closest in spirit to painted restaurant signboards in Bengaluru. Used for the name, page titles, numerals and the closing time.
- Text and UI: Figtree 400 and 600 (OFL). Small labels are tracked capitals in Figtree, never in the display face.
- Fluid scale with `clamp()`; the hero name is sized by a container query so "Indraprastha" never breaks.
- Times and numbers use tabular lining figures.

## Wordmark (proposal)

"ROYAL" set small and tracked in Figtree 600 above "Indraprastha" in Rozha One. The favicon is a brass lattice diamond on the signboard maroon. Drawn in SVG (`src/components/Wordmark.astro`, `public/favicon.svg`). This is an original proposal and should be replaced if the owner has a logo.

## Voice

Plain and specific. Name the dish, the road, the park. Short sentences. No superlatives we cannot prove.
