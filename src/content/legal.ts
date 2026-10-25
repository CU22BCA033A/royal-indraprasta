/**
 * Legal page text. Drafting aid only: have a lawyer review before launch.
 */
import { site, addressText } from '../config/site.ts';

export type Block = string | { list: string[] } | { table: { head: string[]; rows: string[][] } };
export interface Section {
  h: string;
  body: Block[];
}
export interface LegalDoc {
  sections: Section[];
}

const who = site.legalName ?? 'the business that runs Royal Indraprastha';
const contactLine = () =>
  `Phone ${site.phoneDisplay}${site.email ? `, email ${site.email}` : ''}, or in person at ${addressText()}.`;

export function privacy(): LegalDoc {
  return {
    sections: [
      {
        h: 'Who we are',
        body: [
          `This website is run by ${who} ("we", "us"), which operates the Royal Indraprastha restaurant at ${addressText()}. We decide why and how the personal data described here is used, which makes us the data fiduciary under the Digital Personal Data Protection Act, 2023.`,
          `Contact: ${contactLine()}`,
        ],
      },
      {
        h: 'What we collect',
        body: [
          'We only collect what you type into a form on this site. Browsing the site does not identify you to us.',
          {
            table: {
              head: ['Form', 'What you give us', 'Why'],
              rows: [
                [
                  'Event enquiry',
                  'Name, mobile number, email (optional), type of event, expected guests, preferred date, message (optional)',
                  'To call you back about availability, food and price for your event',
                ],
                ['Contact', 'Name, phone number or email, message', 'To reply to your message'],
                [
                  'Data request',
                  'Name, phone number or email, the type of request, details',
                  'To find your information and act on your request',
                ],
              ],
            },
          },
          'With each form we also receive: how long the form was open (to filter out automated spam), and, if you reached this site through a link with campaign tags (utm_source, utm_medium, utm_campaign, utm_term, utm_content), those tags. Campaign tags tell us which link or notice brought you here. They do not identify you.',
        ],
      },
      {
        h: 'Legal basis',
        body: [
          'We use your details on the basis of your consent, which you give by ticking the box on the form. You can withdraw consent at any time by contacting us. Withdrawing does not undo replies already sent, but we will stop using your details and delete them unless the law requires us to keep them.',
        ],
      },
      {
        h: 'Who processes it',
        body: [
          {
            list: [
              'Cloudflare, Inc. hosts this website and runs the code that receives form submissions. Cloudflare processes your IP address to deliver pages and protect the site from abuse.',
              'Resend delivers the form contents to our email inbox and, if you gave an email address, sends you a copy confirming we received it.',
            ],
          },
          'These providers may process data outside India. They act only on our instructions. We do not share your details with anyone else.',
        ],
      },
      {
        h: 'How long we keep it',
        body: [
          'The website itself does not store your submission. It passes it on by email and keeps nothing.',
          'The email copy is kept only as long as we need it to reply to you and, if you book with us, to manage that booking. After that we delete it.',
          'If we use rate limiting to block spam, a scrambled (hashed) form of your IP address is held for up to 10 minutes and then deleted automatically.',
        ],
      },
      {
        h: 'What we do not do',
        body: [
          {
            list: [
              'We do not sell or rent your personal data.',
              'We do not use advertising trackers or third-party advertising.',
              'We do not send marketing emails. The only emails we send are replies to what you asked. If we ever start a newsletter, it will be opt-in with a one-click unsubscribe link in every email.',
              site.modules.analytics
                ? 'We use visit-counting analytics only if you choose "Accept optional" in the notice. It sets no cookies.'
                : 'We do not use analytics.',
            ],
          },
        ],
      },
      {
        h: 'Information kept in your browser',
        body: [
          'This site sets no cookies. It keeps a few small settings in your browser, listed in the Cookie Policy.',
        ],
      },
      {
        h: 'Your rights',
        body: [
          'Under the Digital Personal Data Protection Act, 2023 you can ask us to:',
          {
            list: [
              'tell you what personal data we hold about you and how we use it;',
              'correct, complete or update it;',
              'delete it;',
              'resolve a grievance about how we handled it;',
              'record a person who can exercise these rights for you if you die or cannot do so yourself.',
            ],
          },
          'Use the Data Request page or contact us directly. We may call the phone number you gave us to confirm the request is yours. We will respond as soon as we can, and within the time the law allows (currently 90 days at most).',
          'If you are not satisfied with our response, you can complain to the Data Protection Board of India.',
        ],
      },
      {
        h: 'Children',
        body: [
          'Our forms are for people aged 18 or over. If you are under 18, please ask a parent or guardian to contact us. If we learn that a form was sent by someone under 18, we will delete it.',
        ],
      },
      {
        h: 'Security',
        body: [
          'The site is served only over HTTPS. Form contents travel encrypted to our inbox, and access to that inbox is limited to the people who reply to enquiries. If a breach affects your personal data, we will tell you and the Data Protection Board as the law requires.',
        ],
      },
      {
        h: 'Grievance officer',
        body: [
          site.grievanceOfficer
            ? `${site.grievanceOfficer.name}, ${site.grievanceOfficer.email}.`
            : `Contact the restaurant on ${site.phoneDisplay} and ask for the person responsible for data protection.`,
        ],
      },
      {
        h: 'Changes to this policy',
        body: [
          'When we change this policy we update the date at the top of this page. If a change affects how we use details you have already sent us, we will ask for your consent again.',
        ],
      },
    ],
  };
}

export function terms(): LegalDoc {
  return {
    sections: [
      {
        h: 'About these terms',
        body: [
          `These terms apply to your use of this website, which is run by ${who}. By using the site you agree to them. They do not cover meals, events or stays, which are agreed with the venue directly.`,
        ],
      },
      {
        h: 'Menu, prices and hours',
        body: [
          'We keep the menu, hours and other details on this site as accurate as we can, but dishes, prices and timings can change without notice. What is offered and charged at the restaurant on the day is what applies. If something matters to you, please call before you visit.',
        ],
      },
      {
        h: 'Enquiries are not bookings',
        body: [
          'Sending an event enquiry or a message does not reserve a date, a hall or a table. A booking exists only when we confirm it with you directly. This website does not take orders or payments.',
        ],
      },
      {
        h: 'Using the site',
        body: [
          'Please do not misuse the site: do not send false or abusive messages, try to break or overload it, or submit other people’s details without their permission.',
        ],
      },
      {
        h: 'Intellectual property',
        body: [
          'The text, wordmark, design and photographs on this site belong to us or are used with permission. You may share links to the site. Please ask before reusing anything else.',
        ],
      },
      {
        h: 'Links to other sites',
        body: [
          'Links to Google Maps and other sites are provided for convenience. We are not responsible for their content or how they handle your data.',
        ],
      },
      {
        h: 'Limitation of liability',
        body: [
          'To the extent the law allows, we are not liable for losses that arise only from relying on information on this website. Nothing in these terms limits any liability that cannot be limited under Indian law, including under the Consumer Protection Act, 2019.',
        ],
      },
      {
        h: 'Law and courts',
        body: [
          'These terms are governed by the laws of India. The courts at Bengaluru, Karnataka have jurisdiction over any dispute about this website.',
        ],
      },
      {
        h: 'Contact',
        body: [contactLine()],
      },
    ],
  };
}

export function cookies(): LegalDoc {
  const rows = [
    ['ri-theme', 'Local storage', 'Remembers if you chose the light or dark theme', 'Until you clear it'],
    ['ri-notice', 'Local storage', 'Remembers that you closed the notice about storage', 'Until you clear it'],
    [
      'ri-utm',
      'Session storage',
      'Holds campaign tags from the link that brought you here, so they can be sent with an enquiry',
      'Until you close the tab',
    ],
  ];
  if (site.modules.analytics) {
    rows.push([
      'Cloudflare Web Analytics',
      'No storage',
      'Counts page views without cookies; loads only if you choose "Accept optional"',
      'Not stored in your browser',
    ]);
  }
  return {
    sections: [
      {
        h: 'Cookies',
        body: [
          'This site sets no cookies. It keeps the small settings below in your browser so it can remember your choices. None of them identify you or are sent to us, except campaign tags, which are added to an enquiry only if you send one.',
        ],
      },
      {
        h: 'What is stored',
        body: [{ table: { head: ['Name', 'Where', 'Purpose', 'How long'], rows } }],
      },
      {
        h: 'Your choices',
        body: [
          'All of these are essential to the features they support. You can delete them at any time in your browser settings, or block site storage; the site still works, but forgets your choices.',
        ],
      },
    ],
  };
}

export function cancellation(): LegalDoc {
  const terms = site.cancellationTerms;
  return {
    sections: [
      {
        h: 'This website',
        body: ['This website does not take bookings, orders or payments, so nothing paid through it needs refunding.'],
      },
      {
        h: site.modules.stay ? 'Banquet and room bookings' : 'Banquet bookings',
        body: terms
          ? terms
          : [
              'Bookings are confirmed directly with the venue. Any advance, cancellation charge and refund is agreed with you when you book, and the venue confirms it to you at that time.',
              `If you have paid an advance and want to change or cancel a booking, call ${site.phoneDisplay} as early as possible.`,
            ],
      },
    ],
  };
}

export function dataRequest(): LegalDoc {
  return {
    sections: [
      {
        h: 'How to make a request',
        body: [
          `Use the form below, or contact us directly: ${contactLine()}`,
          'Tell us which details or message your request is about. We may call the phone number you gave us earlier to confirm the request is yours before we act on it.',
          'We will respond as soon as we can, and within the time the law allows (currently 90 days at most). There is no charge.',
        ],
      },
    ],
  };
}
