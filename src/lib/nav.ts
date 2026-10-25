import { site } from '../config/site.ts';

export type NavKey = 'menu' | 'banquet' | 'visit' | 'faq' | 'contact' | 'stay' | 'about';

/** Primary navigation. Optional pages appear only when their content exists. */
export function navItems(): { key: NavKey; path: string }[] {
  const items: { key: NavKey; path: string }[] = [
    { key: 'menu', path: '/menu/' },
    { key: 'banquet', path: '/banquet/' },
    { key: 'visit', path: '/visit/' },
  ];
  if (site.modules.stay) items.push({ key: 'stay', path: '/stay/' });
  if (site.story) items.push({ key: 'about', path: '/about/' });
  items.push({ key: 'faq', path: '/faq/' }, { key: 'contact', path: '/contact/' });
  return items;
}

export const legalItems = [
  { key: 'privacy', path: '/privacy/' },
  { key: 'terms', path: '/terms/' },
  { key: 'cookies', path: '/cookies/' },
  { key: 'cancellation', path: '/cancellation-refund/' },
  { key: 'dataRequest', path: '/data-request/' },
] as const;
