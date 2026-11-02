/**
 * Alt text for each photo in docs/SHOT-LIST.md. Write what the photo actually
 * shows once it exists. A photo is only shown when the file has been processed
 * by `npm run photos` AND its alt text is filled in here.
 */
export type PhotoSlug =
  | 'cariappa-render'
  | 'cariappa-day'
  | 'cariappa-night'
  | 'channasandra-hotel'
  | 'exterior'
  | 'entrance'
  | 'dosa-plate'
  | 'idli-vada'
  | 'tiffin-counter'
  | 'chaat-counter'
  | 'north-indian'
  | 'coffee'
  | 'dining-hall'
  | 'banquet-wide'
  | 'banquet-stage'
  | 'parking';

export const photoAlt: Record<PhotoSlug, string | null> = {
  // Supplied by the owner on 2 November 2026.
  'cariappa-render':
    'Architect’s rendering of the Royal Indraprastha building on Cariappa Road: cream signboards in English and Kannada, a dark wood panel with the magenta and gold logo and the line Relish. Like a King, Anugraha Banquet on the upper floor and red brick at street level.',
  'cariappa-day':
    'The Cariappa Road branch by day: Royal Indraprastha signboards above the open front, steel tables outside and the counter on the right.',
  'cariappa-night': 'The Royal Indraprastha signboard lit at dusk, the gold Kannada name above the English name.',
  'channasandra-hotel':
    'The Channasandra building at night, strung with lights, with The Hotel above and the lit Royal Indraprastha sign over the entrance steps.',
  exterior: null,
  entrance: null,
  'dosa-plate': null,
  'idli-vada': null,
  'tiffin-counter': null,
  'chaat-counter': null,
  'north-indian': null,
  coffee: null,
  'dining-hall': null,
  'banquet-wide': null,
  'banquet-stage': null,
  parking: null,
};
