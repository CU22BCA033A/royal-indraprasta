/**
 * Menu shown on /menu/ and summarised on the home page.
 *
 * Every item records where it was seen (ids from docs/RESEARCH.md; S0 is the
 * research brief supplied with the project). `price` stays null until the owner
 * supplies a current price list. Prices from aggregators are never used.
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number | null;
  sources: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    id: 'tiffin',
    name: 'Tiffin',
    items: [
      { id: 'idli', name: 'Idli', price: null, sources: ['S0', 'S1', 'S2'] },
      { id: 'vada', name: 'Vada', price: null, sources: ['S0', 'S2'] },
      { id: 'rice-bath', name: 'Rice bath', price: null, sources: ['S2'] },
    ],
  },
  {
    id: 'dosa',
    name: 'Dosa',
    items: [
      { id: 'butter-masala-dosa', name: 'Butter masala dosa', price: null, sources: ['S0'] },
      { id: 'onion-dosa', name: 'Onion dosa', price: null, sources: ['S0'] },
    ],
  },
  {
    id: 'north-indian',
    name: 'North Indian',
    items: [
      { id: 'butter-kulcha', name: 'Butter kulcha', price: null, sources: ['S1'] },
      { id: 'paneer-butter-masala', name: 'Paneer butter masala', price: null, sources: ['S1'] },
      { id: 'soup', name: 'Soup', price: null, sources: ['S0'] },
    ],
  },
  {
    id: 'chaat',
    name: 'Chaat',
    items: [{ id: 'masala-puri', name: 'Masala puri', price: null, sources: ['S0', 'S1'] }],
  },
  {
    id: 'beverages-desserts',
    name: 'Beverages and desserts',
    items: [
      { id: 'coffee', name: 'Coffee', price: null, sources: ['S0', 'S1', 'S2'] },
      { id: 'tea', name: 'Tea', price: null, sources: ['S0', 'S1'] },
      { id: 'badam-milk', name: 'Badam milk', price: null, sources: ['S0', 'S1'] },
      { id: 'juices', name: 'Fresh juices', price: null, sources: ['S0', 'S1', 'S2'] },
      { id: 'milkshakes', name: 'Milkshakes', price: null, sources: ['S0', 'S1'] },
      { id: 'ice-cream', name: 'Ice cream', price: null, sources: ['S0'] },
    ],
  },
];

/** True once the owner has priced every item. */
export function menuHasPrices(): boolean {
  return menu.every((c) => c.items.every((i) => i.price !== null));
}

export function formatPrice(p: number): string {
  return `Rs ${p}`;
}
