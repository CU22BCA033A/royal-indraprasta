# Design direction

## Ten principles

1. **One dominant thing per screen.** Award-recognised editorial restaurant sites give each screen a single anchor, usually type at very large scale or one photograph. Here the anchor is the restaurant's name, set as a signboard.
2. **The name is the brand.** Locals find the place by its board "opposite Cariappa Park". The hero treats the name as a sign, not as a logo in a corner.
3. **Colour as a field, not a sprinkle.** Instead of ivory with small maroon buttons, whole bands are set in deep maroon with cream lettering and brass rules, the way a painted board or a printed menu cover would be.
4. **Print typography for food.** The menu is set like a printed card: numbered sections, dish names, a branch note, veg marks and a price column ready for prices, all on ruled lines.
5. **Branches first.** Multi-outlet chains that work well put an outlet index and identical branch pages at the centre. Here: a two-row "Today" ledger in the hero, `/locations/`, and one page per branch.
6. **Change of pace.** Dark sign, dense ivory menu board, spacious hall statement, tight ledger, quiet questions, dark sign-off. Section padding varies with content.
7. **Asymmetry with a grid.** A 12-column grid with deliberately unequal spans (7 and 5, 8 and 4), never centred blocks.
8. **Facts set large.** Address, hours and phone are design elements: big numerals for closing time, the address in display size on branch pages.
9. **Specific copy.** Name the road, the park, the dishes. Copy that would fit any restaurant is rewritten or cut.
10. **Restraint in motion.** A cross-fade between pages via View Transitions, a short fade-in, a 2 px progress bar. Nothing else moves.

## Adopt

1. Signboard band with double brass rule frame.
2. Ledger rows (name, detail, action) for branches, hours and FAQs.
3. Numbered menu sections with display numerals.
4. Branch choice remembered across pages, and used by the Call button.
5. Large-type sign-off footer with both addresses.

## Avoid

1. Centred hero with slogan.
2. Repeated cards or tiles.
3. Eyebrow-heading-subtitle on every section.
4. Identical section spacing.
5. Icons as decoration.
6. Carousels and auto-advancing anything.
7. Menus as images.
8. Stock or AI food imagery.
9. Palace, crown or gold-gradient "royal" clichés.
10. Review scores and testimonials.

## Branch pattern

- `src/data/branches.ts` holds typed branches with `confirmed`, `city`, services and nullable facts.
- `/locations/`: ledger list; "Find the nearest" asks for location only on a button press and computes distance in the browser.
- `/locations/[slug]/`: same template for every branch: name, address set large, copy address, directions, phone if confirmed, hours board, services, and links to the hall or rooms where that branch has them.
- Header branch picker; the choice is kept in `localStorage` (`ri-branch`) and drives the Call button and the hero ledger highlight.

## Hero concepts

Screenshots: `docs/design-rounds/concepts/`.

**A. Signboard (chosen).**

```
+------------------------------------------------------------+
| deep maroon field                                          |
| +===================================+   TODAY             |
| | PURE VEGETARIAN . RR NAGAR        |   ---------------    |
| | Royal                             |   Cariappa Road      |
| | Indraprastha      (display, huge) |   closes 10:30 pm    |
| | Idli, dosa, coffee ... chaat      |   ---------------    |
| | [Call]  [Directions]              |   Channasandra       |
| +===================================+   restaurant, rooms  |
+------------------------------------------------------------+
```

The strongest single image without photographs. Specific to this business (its name, its two roads). Works at 390 px by stacking the ledger under the board.

**B. Menu board.** A long typographic sentence ("Idli, dosa and coffee in the morning...") over a three-column ruled menu. Distinctive copy, but the long headline breaks badly on phones and the first screen has no branch information. Its copy and ruled board become the second section of A.

**C. Photo-led split.** Text left, image right. Without the owner's photos the right half falls back to an illustration (a line-drawn tumbler and dabara), which is charming but reads as decoration. Revisit when real photos arrive: the hero component accepts a photo and switches to this layout.

## Type and colour

- Display: **Rozha One** (Indian Type Foundry, OFL), a high-contrast display face with the weight of a painted board. Used only at 40 px and above.
- Text and UI: **Figtree**, 400 and 600, tabular figures for times and prices.
- Young Serif is retired, which takes the site from three families to two.
- Colours: ivory field, deep maroon field `#4A1219`, maroon action `#6E1F2B`, brass `#C79A4B` (rules and text on dark only), brass ink `#6F5116` (small text on light), veg green. Dark mode keeps the sign field distinct from the page.
