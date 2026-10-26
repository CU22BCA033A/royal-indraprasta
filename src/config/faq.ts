/**
 * Questions and answers, written only from verified facts. A question whose
 * answer depends on a missing fact sets `available: false` and is dropped.
 * `pages` controls where it appears besides /faq/.
 */
import { site } from './site.ts';
import { commonClose, formatTime } from './hours.ts';
import { liveBranches, branchBySlug, branchAddress } from '../data/branches.ts';

export interface Faq {
  id: string;
  pages: ('home' | 'banquet' | 'locations')[];
  available: boolean;
  q: string;
  a: string;
}

const cariappa = branchBySlug('cariappa-road');
const close = cariappa ? commonClose(cariappa.hours) : null;
const hallBranches = liveBranches.filter((b) => b.services.banquet).map((b) => b.name);
const roomBranches = liveBranches.filter((b) => b.services.rooms).map((b) => b.name);
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs.at(-1)}`);

export const faqs: Faq[] = [
  {
    id: 'veg',
    pages: ['home', 'banquet'],
    available: true,
    q: 'Is everything vegetarian?',
    a: 'Yes. Royal Indraprastha is a pure vegetarian restaurant.',
  },
  {
    id: 'branches',
    pages: ['home', 'locations'],
    available: liveBranches.length > 1,
    q: 'How many branches are there?',
    a: `${liveBranches.length}, in Rajarajeshwari Nagar: ${liveBranches
      .map((b) => `${b.name} (${branchAddress(b)})`)
      .join(' and ')}.`,
  },
  {
    id: 'hall',
    pages: ['home', 'banquet', 'locations'],
    available: hallBranches.length > 0,
    q: 'Which branch has the banquet hall?',
    a: `${list(hallBranches)}. Send an enquiry from the banquet page or call ${site.phoneDisplay}.`,
  },
  {
    id: 'rooms',
    pages: ['home', 'locations'],
    available: roomBranches.length > 0,
    q: 'Can I stay overnight?',
    a: `Rooms are at the ${list(roomBranches)} branch. Contact that branch for availability and rates.`,
  },
  {
    id: 'hours',
    pages: ['home', 'locations'],
    available: close !== null,
    q: 'What time does Cariappa Road close?',
    a: `At ${close ? formatTime(close) : ''}. Call ${site.phoneDisplay} to confirm the opening time.`,
  },
  {
    id: 'booking',
    pages: ['banquet'],
    available: true,
    q: 'Does sending an enquiry book the hall?',
    a: 'No. A booking is confirmed only when we confirm it with you directly. The website takes no payments.',
  },
  {
    id: 'food',
    pages: [],
    available: true,
    q: 'What kind of food do you serve?',
    a: 'South Indian tiffin such as idli, vada and dosa, North Indian dishes such as paneer butter masala with kulcha, chaat such as masala puri, and coffee, tea, badam milk, juices and milkshakes.',
  },
  {
    id: 'orders',
    pages: [],
    available: true,
    q: 'Can I order food on this website?',
    a: 'No. This website does not take orders or payments. Please call or visit.',
  },
];

export function faqsFor(page?: 'home' | 'banquet' | 'locations'): Faq[] {
  return faqs.filter((f) => f.available && (!page || f.pages.includes(page)));
}
