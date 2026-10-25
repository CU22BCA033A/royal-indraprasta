/**
 * Questions and answers, written only from verified facts.
 *
 * `requires` lists fields that must be set for the answer to be true; the
 * question is dropped while any of them is missing. `pages` controls where it
 * appears besides /faq/.
 *
 * Kannada: NEEDS-NATIVE-REVIEW
 */
import { site, addressText } from './site.ts';
import { commonClose, formatTime } from './hours.ts';
import type { Lang } from '../i18n/index.ts';

export interface Faq {
  id: string;
  pages: ('home' | 'banquet')[];
  available: boolean;
  q: Record<Lang, string>;
  a: Record<Lang, string>;
}

const close = commonClose();

export const faqs: Faq[] = [
  {
    id: 'veg',
    pages: ['home', 'banquet'],
    available: true,
    q: { en: 'Is the food vegetarian?', kn: 'ಊಟ ಸಸ್ಯಾಹಾರವೇ?' },
    a: {
      en: 'Yes. Royal Indraprastha is a pure vegetarian restaurant.',
      kn: 'ಹೌದು. ರಾಯಲ್ ಇಂದ್ರಪ್ರಸ್ಥ ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಹೋಟೆಲ್.',
    },
  },
  {
    id: 'food',
    pages: ['home'],
    available: true,
    q: { en: 'What kind of food do you serve?', kn: 'ಯಾವ ಬಗೆಯ ಊಟ ಸಿಗುತ್ತದೆ?' },
    a: {
      en: 'South Indian tiffin such as idli and vada, North Indian dishes, chaat such as masala puri, and coffee, tea, badam milk, juices and milkshakes. Ask at the counter for the full menu.',
      kn: 'ಇಡ್ಲಿ, ವಡೆಯಂತಹ ದಕ್ಷಿಣ ಭಾರತೀಯ ತಿಂಡಿ, ಉತ್ತರ ಭಾರತೀಯ ಖಾದ್ಯಗಳು, ಮಸಾಲೆ ಪುರಿಯಂತಹ ಚಾಟ್, ಮತ್ತು ಕಾಫಿ, ಚಹಾ, ಬಾದಾಮಿ ಹಾಲು, ಹಣ್ಣಿನ ರಸ, ಮಿಲ್ಕ್‌ಶೇಕ್. ಪೂರ್ಣ ಮೆನುವನ್ನು ಕೌಂಟರ್‌ನಲ್ಲಿ ಕೇಳಿ.',
    },
  },
  {
    id: 'where',
    pages: ['home'],
    available: true,
    q: { en: 'Where are you?', kn: 'ನೀವು ಎಲ್ಲಿದ್ದೀರಿ?' },
    a: {
      en: `${addressText()}.`,
      kn: 'ಫೀಲ್ಡ್ ಮಾರ್ಷಲ್ ಕಾರ್ಯಪ್ಪ ರಸ್ತೆ, 4ನೇ ಹಂತ, ರಾಜರಾಜೇಶ್ವರಿ ನಗರ, ಬೆಂಗಳೂರು 560098.',
    },
  },
  {
    id: 'hours',
    pages: ['home'],
    available: close !== null,
    q: { en: 'What time do you close?', kn: 'ಎಷ್ಟು ಗಂಟೆಗೆ ಮುಚ್ಚುತ್ತೀರಿ?' },
    a: {
      en: `At ${close ? formatTime(close) : ''}. Please call ${site.phoneDisplay} to confirm the opening time.`,
      kn: `ರಾತ್ರಿ ${close ? formatTime(close).replace(' PM', '') : ''} ಕ್ಕೆ. ತೆರೆಯುವ ಸಮಯಕ್ಕಾಗಿ ${site.phoneDisplay} ಗೆ ಕರೆ ಮಾಡಿ.`,
    },
  },
  {
    id: 'events',
    pages: ['home', 'banquet'],
    available: true,
    q: { en: 'Can I hold an event in your hall?', kn: 'ನಿಮ್ಮ ಸಭಾಂಗಣದಲ್ಲಿ ಸಮಾರಂಭ ನಡೆಸಬಹುದೇ?' },
    a: {
      en: 'Yes. Send an event enquiry from the banquet page or call us, and we will talk through dates, guest numbers and food.',
      kn: 'ಹೌದು. ಸಭಾಂಗಣ ಪುಟದಿಂದ ವಿಚಾರಣೆ ಕಳುಹಿಸಿ ಅಥವಾ ಕರೆ ಮಾಡಿ. ದಿನಾಂಕ, ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ ಮತ್ತು ಊಟದ ಬಗ್ಗೆ ಮಾತನಾಡೋಣ.',
    },
  },
  {
    id: 'booking',
    pages: ['banquet'],
    available: true,
    q: { en: 'Does sending an enquiry book the hall?', kn: 'ವಿಚಾರಣೆ ಕಳುಹಿಸಿದರೆ ಸಭಾಂಗಣ ಕಾಯ್ದಿರಿಸಿದಂತೆಯೇ?' },
    a: {
      en: 'No. A booking is confirmed only when we confirm it with you directly. The website takes no payments.',
      kn: 'ಇಲ್ಲ. ನಾವು ನಿಮ್ಮೊಂದಿಗೆ ನೇರವಾಗಿ ಖಚಿತಪಡಿಸಿದಾಗ ಮಾತ್ರ ಕಾಯ್ದಿರಿಸುವಿಕೆ ಖಚಿತ. ಈ ಜಾಲತಾಣ ಹಣ ಸ್ವೀಕರಿಸುವುದಿಲ್ಲ.',
    },
  },
  {
    id: 'contact',
    pages: ['home', 'banquet'],
    available: true,
    q: { en: 'What is the quickest way to reach you?', kn: 'ನಿಮ್ಮನ್ನು ಬೇಗ ತಲುಪುವುದು ಹೇಗೆ?' },
    a: {
      en: `Call ${site.phoneDisplay}.`,
      kn: `${site.phoneDisplay} ಗೆ ಕರೆ ಮಾಡಿ.`,
    },
  },
  {
    id: 'orders',
    pages: [],
    available: true,
    q: { en: 'Can I order food on this website?', kn: 'ಈ ಜಾಲತಾಣದಲ್ಲಿ ಊಟ ಆರ್ಡರ್ ಮಾಡಬಹುದೇ?' },
    a: {
      en: 'No. This website does not take orders or payments. Please call or visit.',
      kn: 'ಇಲ್ಲ. ಈ ಜಾಲತಾಣ ಆರ್ಡರ್ ಅಥವಾ ಹಣ ಸ್ವೀಕರಿಸುವುದಿಲ್ಲ. ಕರೆ ಮಾಡಿ ಅಥವಾ ಬನ್ನಿ.',
    },
  },
];

export function faqsFor(page?: 'home' | 'banquet'): Faq[] {
  return faqs.filter((f) => f.available && (!page || f.pages.includes(page)));
}
