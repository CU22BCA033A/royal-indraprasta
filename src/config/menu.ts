/**
 * Menu shown on /menu/ and summarised on the home page.
 *
 * One shared menu with per-branch overrides: an item without `branches` is
 * listed for every branch; an item with `branches` only for those slugs.
 * Every item records where it was seen (ids from docs/RESEARCH.md and
 * docs/BRAND-DISCOVERY.md; S0 is the research brief). `price` stays null until
 * the owner supplies a current price list. Platform prices are never used.
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number | null;
  /** Branch slugs that serve this item. Omit for all branches. */
  branches?: string[];
  sources: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  /** One line under the section heading. Only verifiable statements. */
  note: string | null;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    id: 'tiffin',
    name: 'Tiffin',
    note: null,
    items: [
      { id: 'idli', name: 'Idli', price: null, sources: ['S0', 'S1', 'S2'] },
      { id: 'rava-idli', name: 'Rava idli', price: null, branches: ['channasandra'], sources: ['S11'] },
      { id: 'vada', name: 'Vada', price: null, sources: ['S0', 'S2'] },
      { id: 'rice-bath', name: 'Rice bath', price: null, sources: ['S2'] },
    ],
  },
  {
    id: 'dosa',
    name: 'Dosa',
    note: null,
    items: [
      { id: 'masala-dosa', name: 'Masala dosa', price: null, sources: ['S0', 'S11'] },
      { id: 'butter-masala-dosa', name: 'Butter masala dosa', price: null, sources: ['S0'] },
      { id: 'onion-dosa', name: 'Onion dosa', price: null, sources: ['S0'] },
    ],
  },
  {
    id: 'north-indian',
    name: 'North Indian',
    note: null,
    items: [
      { id: 'paneer-butter-masala', name: 'Paneer butter masala', price: null, sources: ['S1'] },
      { id: 'butter-kulcha', name: 'Butter kulcha', price: null, sources: ['S1'] },
      { id: 'soup', name: 'Soup', price: null, sources: ['S0'] },
    ],
  },
  {
    id: 'chaat',
    name: 'Chaat and snacks',
    note: 'The chaat counter runs in the evening.',
    items: [
      { id: 'masala-puri', name: 'Masala puri', price: null, sources: ['S0', 'S1'] },
      {
        id: 'mushroom-grill-sandwich',
        name: 'Mushroom grill sandwich',
        price: null,
        branches: ['channasandra'],
        sources: ['S11'],
      },
    ],
  },
  {
    id: 'beverages-desserts',
    name: 'Coffee, drinks and desserts',
    note: null,
    items: [
      { id: 'coffee', name: 'Coffee', price: null, sources: ['S0', 'S1', 'S2'] },
      { id: 'tea', name: 'Tea', price: null, sources: ['S0', 'S1'] },
      { id: 'badam-milk', name: 'Badam milk', price: null, sources: ['S0', 'S1'] },
      { id: 'juices', name: 'Fresh juices', price: null, sources: ['S0', 'S1', 'S2'] },
      { id: 'lime-juice', name: 'Lime juice', price: null, branches: ['channasandra'], sources: ['S11'] },
      { id: 'milkshakes', name: 'Milkshakes', price: null, sources: ['S0', 'S1'] },
      { id: 'ice-cream', name: 'Ice cream', price: null, sources: ['S0'] },
    ],
  },
];

/** Items served at a branch. */
export function itemsFor(cat: MenuCategory, slug: string | null): MenuItem[] {
  return cat.items.filter((i) => !slug || !i.branches || i.branches.includes(slug));
}

export function menuHasPrices(): boolean {
  return menu.every((c) => c.items.every((i) => i.price !== null));
}

export function formatPrice(p: number): string {
  return `₹ ${p}`;
}
