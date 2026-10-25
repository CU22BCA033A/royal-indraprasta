/**
 * Menu shown on /menu/ and summarised on the home page.
 *
 * Every item records where it was seen (ids from docs/RESEARCH.md; S0 is the
 * research brief supplied with the project). `price` stays null until the owner
 * supplies a current price list. Prices from aggregators are never used.
 *
 * Kannada names: NEEDS-NATIVE-REVIEW
 */

export interface MenuItem {
  id: string;
  en: string;
  kn: string;
  price: number | null;
  sources: string[];
}

export interface MenuCategory {
  id: string;
  en: string;
  kn: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    id: 'tiffin',
    en: 'Tiffin',
    kn: 'ತಿಂಡಿ',
    items: [
      { id: 'idli', en: 'Idli', kn: 'ಇಡ್ಲಿ', price: null, sources: ['S0', 'S1', 'S2'] },
      { id: 'vada', en: 'Vada', kn: 'ವಡೆ', price: null, sources: ['S0', 'S2'] },
      { id: 'rice-bath', en: 'Rice bath', kn: 'ರೈಸ್ ಬಾತ್', price: null, sources: ['S2'] },
    ],
  },
  {
    id: 'dosa',
    en: 'Dosa',
    kn: 'ದೋಸೆ',
    items: [
      { id: 'butter-masala-dosa', en: 'Butter masala dosa', kn: 'ಬೆಣ್ಣೆ ಮಸಾಲೆ ದೋಸೆ', price: null, sources: ['S0'] },
      { id: 'onion-dosa', en: 'Onion dosa', kn: 'ಈರುಳ್ಳಿ ದೋಸೆ', price: null, sources: ['S0'] },
    ],
  },
  {
    id: 'north-indian',
    en: 'North Indian',
    kn: 'ಉತ್ತರ ಭಾರತೀಯ',
    items: [
      { id: 'butter-kulcha', en: 'Butter kulcha', kn: 'ಬಟರ್ ಕುಲ್ಚಾ', price: null, sources: ['S1'] },
      { id: 'paneer-butter-masala', en: 'Paneer butter masala', kn: 'ಪನೀರ್ ಬಟರ್ ಮಸಾಲಾ', price: null, sources: ['S1'] },
      { id: 'soup', en: 'Soup', kn: 'ಸೂಪ್', price: null, sources: ['S0'] },
    ],
  },
  {
    id: 'chaat',
    en: 'Chaat',
    kn: 'ಚಾಟ್',
    items: [{ id: 'masala-puri', en: 'Masala puri', kn: 'ಮಸಾಲೆ ಪುರಿ', price: null, sources: ['S0', 'S1'] }],
  },
  {
    id: 'beverages-desserts',
    en: 'Beverages and desserts',
    kn: 'ಪಾನೀಯ ಮತ್ತು ಸಿಹಿ',
    items: [
      { id: 'coffee', en: 'Coffee', kn: 'ಕಾಫಿ', price: null, sources: ['S0', 'S1', 'S2'] },
      { id: 'tea', en: 'Tea', kn: 'ಚಹಾ', price: null, sources: ['S0', 'S1'] },
      { id: 'badam-milk', en: 'Badam milk', kn: 'ಬಾದಾಮಿ ಹಾಲು', price: null, sources: ['S0', 'S1'] },
      { id: 'juices', en: 'Fresh juices', kn: 'ಹಣ್ಣಿನ ರಸ', price: null, sources: ['S0', 'S1', 'S2'] },
      { id: 'milkshakes', en: 'Milkshakes', kn: 'ಮಿಲ್ಕ್‌ಶೇಕ್', price: null, sources: ['S0', 'S1'] },
      { id: 'ice-cream', en: 'Ice cream', kn: 'ಐಸ್ ಕ್ರೀಮ್', price: null, sources: ['S0'] },
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
