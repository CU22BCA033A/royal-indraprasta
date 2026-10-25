/**
 * Questions and answers, written only from verified facts.
 *
 * `requires` lists fields that must be set for the answer to be true; the
 * question is dropped while any of them is missing. `pages` controls where it
 * appears besides /faq/.

 */
import { site, addressText } from './site.ts';
import { commonClose, formatTime } from './hours.ts';

export interface Faq {
  id: string;
  pages: ('home' | 'banquet')[];
  available: boolean;
  q: string;
  a: string;
}

const close = commonClose();

export const faqs: Faq[] = [
  {
    id: 'veg',
    pages: ['home', 'banquet'],
    available: true,
    q: 'Is the food vegetarian?',
    a: 'Yes. Royal Indraprastha is a pure vegetarian restaurant.',
  },
  {
    id: 'food',
    pages: ['home'],
    available: true,
    q: 'What kind of food do you serve?',
    a: 'South Indian tiffin such as idli and vada, North Indian dishes, chaat such as masala puri, and coffee, tea, badam milk, juices and milkshakes. Ask at the counter for the full menu.',
  },
  {
    id: 'where',
    pages: ['home'],
    available: true,
    q: 'Where are you?',
    a: `${addressText()}.`,
  },
  {
    id: 'hours',
    pages: ['home'],
    available: close !== null,
    q: 'What time do you close?',
    a: `At ${close ? formatTime(close) : ''}. Please call ${site.phoneDisplay} to confirm the opening time.`,
  },
  {
    id: 'events',
    pages: ['home', 'banquet'],
    available: true,
    q: 'Can I hold an event in your hall?',
    a: 'Yes. Send an event enquiry from the banquet page or call us, and we will talk through dates, guest numbers and food.',
  },
  {
    id: 'booking',
    pages: ['banquet'],
    available: true,
    q: 'Does sending an enquiry book the hall?',
    a: 'No. A booking is confirmed only when we confirm it with you directly. The website takes no payments.',
  },
  {
    id: 'contact',
    pages: ['home', 'banquet'],
    available: true,
    q: 'What is the quickest way to reach you?',
    a: `Call ${site.phoneDisplay}.`,
  },
  {
    id: 'orders',
    pages: [],
    available: true,
    q: 'Can I order food on this website?',
    a: 'No. This website does not take orders or payments. Please call or visit.',
  },
];

export function faqsFor(page?: 'home' | 'banquet'): Faq[] {
  return faqs.filter((f) => f.available && (!page || f.pages.includes(page)));
}
