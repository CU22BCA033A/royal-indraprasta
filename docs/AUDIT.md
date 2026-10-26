# Audit of the first build (round 0)

Screenshots: `docs/design-rounds/round-0/` (12 pages at 390 and 1440 px), taken 26 October 2026 from commit `791b4b7`.

The first build is correct and accessible, but it doesn't look like anything. Every page uses the same skeleton: a big serif heading, a grey lead paragraph, a rule, then a "label on the left, rows on the right" split repeated until the footer. Nothing on any page is the obvious first thing to look at, and nothing tells you this is a busy tiffin room on Cariappa Road rather than any restaurant anywhere.

## Scores (1 to 10)

| Area            | Score | Evidence                                                                                                                                                                                                                                                    |
| --------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hierarchy       | 4     | On the home page at 1440 px the h1, the hours board and the menu block all carry similar weight. Squinting at the blurred screenshot shows four grey bands of equal value.                                                                                  |
| Spacing rhythm  | 3     | Every section uses the same `--space-8` padding, so the page reads as one beat repeated. The menu page has 80 px of air above a 5-button chip row that carries no information.                                                                              |
| Typography      | 5     | Young Serif is a good choice and the ruled rows are clean. But the body copy runs at one size, there are no small-caps or numerals used as design elements, prices and times are not set as figures, and headings break awkwardly ("Events in / our hall"). |
| Colour use      | 5     | The palette is pleasant but timid: ivory, ivory-two and a maroon button. The brass appears only as hairlines. There is no moment of colour with real presence.                                                                                              |
| Imagery         | 2     | There are no photos, which is expected, but there is also no substitute. The lattice strip is the only graphic and it reads as a border pattern.                                                                                                            |
| Consistency     | 7     | Components are consistent. Too consistent: the banquet, visit, contact and FAQ pages are visually interchangeable.                                                                                                                                          |
| Craft details   | 5     | Focus states and form errors are good. The details that signal care are missing: no live "today" line, no menu set as a menu (dish, note, mark, price column), footer is a list of links, empty left column beside the enquiry form.                        |
| Distinctiveness | 2     | Cover the wordmark and this could be a dentist, a law firm or a yoga studio with a warm palette.                                                                                                                                                            |
| Mobile quality  | 5     | It works, but on Visit at 390 px there are two stacked "Copy" buttons, a call and a directions button, then the floating Contact button overlapping the Hours heading.                                                                                      |
| Copy quality    | 6     | Honest and plain, but thin. "We host events in our hall at the restaurant's address" says nothing a guest needs. Copy is the same length and tone on every page.                                                                                            |

Average: 4.4.

## "Looks made by AI" test

| Tell                                                          | Present? | Where                                                                                                         |
| ------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| Centred hero with vague slogan over gradient                  | No       | Hero is left-set and specific.                                                                                |
| Same card repeated in a uniform grid                          | Partly   | Not cards, but the ruled two-column menu block and the FAQ rows are the same unit repeated with no variation. |
| Eyebrow, big heading, grey subtitle, content on every section | **Yes**  | Every page head and almost every section.                                                                     |
| Identical vertical spacing everywhere                         | **Yes**  | One section padding token used site-wide.                                                                     |
| Generic line icons as decoration                              | Mild     | Phone and pin icons on every button.                                                                          |
| Words like welcome, premium, crafted                          | No       | Copy audit passes.                                                                                            |
| Equal visual weight on everything                             | **Yes**  | Home, banquet, visit.                                                                                         |
| Symmetrical layouts only, no scale contrast                   | **Yes**  | The only asymmetry is the 1:2.4 split, used everywhere, so it reads as a template.                            |
| Default framework look on controls                            | Partly   | Native select and date picker unstyled; chip row looks like default tags.                                     |
| Copy that could belong to any restaurant                      | **Yes**  | "Events in our hall", "Questions", "Visit".                                                                   |
| Invented stats or reviews                                     | No       |                                                                                                               |

## Decisions

Keep:

- The data layer: `src/config/*`, zod schemas, the form API and Vercel functions, legal text, tests and audits.
- Hard rules already enforced: no invented facts, hidden-when-null, CSP, accessibility.
- Young Serif for display, the ivory and maroon base, the veg mark.

Rewrite:

- The whole visual layer: tokens, layout system, every page template.
- Home page structure: one dominant element, then a change of pace.
- Menu: set as a printed menu card with section numerals, Kannada dish names in small type, veg marks and a price column ready for prices.
- Visit and contact: merge into a branch page system (`/locations/` and `/locations/[slug]/`).
- Footer: a proper sign-off with the address set large, not a link dump.
- Copy: rewrite page by page to name the road, the park, the dishes, the hours.

Delete:

- The chip row on the menu page.
- The separate Visit page (replaced by the branch page; `/visit/` redirects).
- The "What to tell us" list on the banquet page (folded into the form's introduction).
