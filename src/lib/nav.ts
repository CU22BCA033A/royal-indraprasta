import { site } from '../config/site.ts';
import { liveBranches } from '../data/branches.ts';

export type NavKey = 'menu' | 'locations' | 'banquet' | 'faq' | 'contact' | 'about';

/** Primary navigation. Optional pages appear only when their content exists. */
export function navItems(): { key: NavKey; path: string }[] {
  const items: { key: NavKey; path: string }[] = [
    { key: 'menu', path: '/menu/' },
    { key: 'locations', path: '/locations/' },
  ];
  if (liveBranches.some((b) => b.services.banquet)) items.push({ key: 'banquet', path: '/banquet/' });
  if (site.story) items.push({ key: 'about', path: '/about/' });
  items.push({ key: 'faq', path: '/faq/' }, { key: 'contact', path: '/contact/' });
  return items;
}

/** Highlights a section for nested paths, for example /locations/channasandra/. */
export function isCurrent(itemPath: string, path: string): boolean {
  return itemPath === '/' ? path === '/' : path.startsWith(itemPath);
}

export const legalItems = [
  { key: 'privacy', path: '/privacy/' },
  { key: 'terms', path: '/terms/' },
  { key: 'cookies', path: '/cookies/' },
  { key: 'cancellation', path: '/cancellation-refund/' },
  { key: 'dataRequest', path: '/data-request/' },
] as const;
