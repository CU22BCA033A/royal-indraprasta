# Brand analysis

## Reading

Royal Indraprastha is a neighbourhood pure vegetarian restaurant on Field Marshal Cariappa Road in RR Nagar. Listings point to an all-day place: idli, vada and coffee in the morning, North Indian dishes such as butter kulcha and paneer butter masala later, chaat and badam milk in the evening, and a hall for family events at the same address. Thousands of public reviews on one listing suggest heavy local footfall. The name borrows the grandeur of the Pandava capital, but the business itself is everyday and civic.

Risk: "Royal" invites a purple, gold and crown template. That would misrepresent a busy tiffin room and would look like every banquet marketplace page.

Tone: dependable, clean, warm, civic, with a restrained heritage note.

## Concept: the printed menu board and hotel stationery

- Ivory paper, maroon ink, brass rules.
- Pages are set like a good printed menu: full-width horizontal rules, tabular columns, dotted-free leaders replaced by right-aligned columns, large numerals for time.
- Asymmetric two-column compositions: a narrow label column on the left, content on the right, the way a menu card sets section names against items.
- One ornament: a jali lattice built from straight strokes (a square grid rotated 45 degrees with an inner diamond), used as a section divider, in the wordmark and on the 404 page. Never filled, never dots.
- No cards, no shadows, square corners.

## Colour

Tokens live in `src/styles/tokens.css`. Contrast for every pair is computed by `npm run audit:contrast` and written to `docs/CONTRAST.md`.

| Token          | Light   | Dark    | Use                                                                   |
| -------------- | ------- | ------- | --------------------------------------------------------------------- |
| `--bg`         | #F6EFE2 | #1C1512 | Page                                                                  |
| `--surface`    | #EFE5D3 | #261C17 | Panels, header                                                        |
| `--text`       | #2A1D16 | #F1E8D8 | Body                                                                  |
| `--muted`      | #5B4A3F | #CDBFA9 | Secondary text, input borders                                         |
| `--primary`    | #6E1F2B | #E3A3A8 | Links, buttons, headings accents, focus ring                          |
| `--accent`     | #B8893B | #D9AE63 | Rules and lattice only (fails text contrast in light mode, by design) |
| `--brass-text` | #6F5116 | #D9AE63 | Small labels                                                          |
| `--veg`        | #2F6B3F | #7FBF8E | Veg mark only                                                         |
| `--error`      | #A3261B | #F0A59E | Form errors                                                           |

The supplied values all pass. Light accent (2.75:1 on background) is restricted to decorative rules and the lattice, which carry no information, so no change was needed.

## Type

- Headings: Young Serif 400. Checked at 56 px and above: its soft bracketed serifs read like a hotel signboard and hold up at display sizes, so Newsreader was not needed.
- Body and UI: Figtree 400 and 600.
- Kannada: Noto Serif Kannada 600 for headings, Noto Sans Kannada 400 and 600 for body, subset to the glyphs used in `src/i18n/kn.ts` (run `npm run fonts` after changing Kannada copy).
- Fluid scale with `clamp()`, ratio about 1.25 on mobile, 1.333 on desktop.
- Numerals for hours use Figtree tabular figures.

## Wordmark (proposal)

"ROYAL" set small and tracked in Figtree 600 above "Indraprastha" in Young Serif, with the lattice mark to the left. Drawn in SVG (`src/components/Wordmark.astro`, `public/favicon.svg`). This is an original proposal and should be replaced if the owner has a logo.

## Voice

Plain and specific. Name the dish, the road, the park. Short sentences. No superlatives we cannot prove. Kannada is written natively in tone, not word for word, and every Kannada string is marked `NEEDS-NATIVE-REVIEW`.
