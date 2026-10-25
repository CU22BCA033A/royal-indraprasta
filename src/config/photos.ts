/**
 * Alt text for each photo in docs/SHOT-LIST.md. Write what the photo actually
 * shows once it exists. A photo is only shown when the file has been processed
 * by `npm run photos` AND both alt texts are filled in here.
 *
 * Kannada alt text: NEEDS-NATIVE-REVIEW
 */
export type PhotoSlug =
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

export const photoAlt: Record<PhotoSlug, { en: string; kn: string } | null> = {
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
