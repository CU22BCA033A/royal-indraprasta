/**
 * Every business fact used on the site lives here.
 *
 * Rule: a value the owner has not confirmed is `null`. The UI hides anything
 * that depends on a `null` value. `npm run audit:placeholders` lists every
 * `null` in `LAUNCH_REQUIRED` and fails a production build until it is filled.
 *
 * Sources for each value are in docs/RESEARCH.md.
 */

export interface Address {
  /** Door number and building, owner to confirm. */
  line1: string | null;
  street: string;
  area: string;
  city: string;
  postalCode: string;
  region: string;
  country: string;
}

export interface Site {
  tradingName: string;
  legalName: string | null;
  /** Canonical domain, for example "https://royalindraprastha.in". */
  domain: string | null;
  address: Address;
  /** Latitude and longitude from an owner-supplied map pin. */
  geo: { lat: number; lng: number } | null;
  /** E.164 format. */
  phone: string;
  phoneDisplay: string;
  /** E.164 digits for wa.me, only if the owner confirms the number is on WhatsApp. */
  whatsapp: string | null;
  email: string | null;
  /** Owner-supplied Google Maps share link. Falls back to a Maps search link. */
  googleMapsUrl: string | null;
  fssaiLicence: string | null;
  gstin: string | null;
  grievanceOfficer: { name: string; email: string } | null;
  social: { instagram: string | null; facebook: string | null };
  cuisines: { en: string[]; kn: string[] };
  /** Banquet facts. Any null value is left off the page. */
  banquet: {
    hallName: string | null;
    capacitySeated: number | null;
    capacityFloating: number | null;
    inclusions: { en: string[]; kn: string[] } | null;
  };
  /** Owner-supplied cancellation and refund terms, plain text per language. */
  cancellationTerms: { en: string[]; kn: string[] } | null;
  /** Owner-supplied story for the About page. The page is not built while null. */
  story: { en: string[]; kn: string[] } | null;
  /** Verified access and parking facts, shown only when supplied. */
  access: { en: string[]; kn: string[] } | null;
  parking: { en: string[]; kn: string[] } | null;
  /** Royal Indraprastha The Hotel, shown only with modules.stay. */
  stayDetails: { address: string; phone: string | null; phoneDisplay: string | null } | null;
  modules: {
    /** Royal Indraprastha The Hotel. Off until common ownership is confirmed. */
    stay: boolean;
    /** Cookieless analytics. Off by default; turns the notice into a consent choice. */
    analytics: boolean;
  };
}

export const site: Site = {
  tradingName: 'Royal Indraprastha',
  legalName: null,
  domain: null,
  address: {
    line1: null,
    street: 'Field Marshal Cariappa Road, 4th Stage',
    area: 'Rajarajeshwari Nagar',
    city: 'Bengaluru',
    postalCode: '560098',
    region: 'Karnataka',
    country: 'IN',
  },
  geo: null,
  phone: '+919743932821',
  phoneDisplay: '+91\u00a097439\u00a032821',
  whatsapp: null,
  email: null,
  googleMapsUrl: null,
  fssaiLicence: null,
  gstin: null,
  grievanceOfficer: null,
  social: { instagram: null, facebook: null },
  cuisines: {
    en: ['South Indian', 'North Indian'],
    kn: ['ದಕ್ಷಿಣ ಭಾರತೀಯ', 'ಉತ್ತರ ಭಾರತೀಯ'],
  },
  banquet: {
    hallName: null,
    capacitySeated: null,
    capacityFloating: null,
    inclusions: null,
  },
  cancellationTerms: null,
  story: null,
  access: null,
  parking: null,
  stayDetails: null,
  modules: {
    stay: false,
    analytics: false,
  },
};

/**
 * Facts that must be confirmed before a production launch. Paths are read by
 * scripts/audit-placeholders.mjs, so keep them as plain dotted strings.
 */
export const LAUNCH_REQUIRED = [
  'legalName',
  'domain',
  'address.line1',
  'email',
  'googleMapsUrl',
  'fssaiLicence',
  'grievanceOfficer',
] as const;

/** Single string address for display and copying. */
export function addressText(): string {
  const a = site.address;
  return [a.line1, a.street, a.area, `${a.city} ${a.postalCode}`].filter(Boolean).join(', ');
}

/** Link that opens the place in Google Maps. */
export function mapsUrl(): string {
  if (site.googleMapsUrl) return site.googleMapsUrl;
  const q = encodeURIComponent(`${site.tradingName}, ${addressText()}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** Link that starts directions in Google Maps. */
export function directionsUrl(): string {
  const dest = site.geo
    ? `${site.geo.lat},${site.geo.lng}`
    : encodeURIComponent(`${site.tradingName}, ${addressText()}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
}

export function whatsappUrl(): string | null {
  return site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}` : null;
}
