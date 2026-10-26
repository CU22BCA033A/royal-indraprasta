import { site } from '../config/site.ts';
import { hoursComplete, DAYS } from '../config/hours.ts';
import { liveBranches, branchAddress, type Branch } from '../data/branches.ts';

const DAY_SCHEMA: Record<string, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

/** The brand, on every page. */
export function organizationJsonLd(origin: string): Record<string, unknown> {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#brand`,
    name: site.tradingName,
    url: `${origin}/`,
    logo: `${origin}/icon-512.png`,
    subOrganization: liveBranches.map((b) => ({ '@id': `${origin}/locations/${b.slug}/#restaurant` })),
  };
  if (site.legalName) data.legalName = site.legalName;
  if (site.email) data.email = site.email;
  const sameAs = [site.social.instagram, site.social.facebook].filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}

/** One branch. Unconfirmed facts are left out; never aggregateRating. */
export function restaurantJsonLd(origin: string, b: Branch): Record<string, unknown> {
  const a = b.address;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${origin}/locations/${b.slug}/#restaurant`,
    name: `${b.tradingName}, ${b.name}`,
    url: `${origin}/locations/${b.slug}/`,
    parentOrganization: { '@id': `${origin}/#brand` },
    servesCuisine: [...site.cuisines, 'Vegetarian'],
    hasMenu: `${origin}/menu/`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [a.line1, a.street].filter(Boolean).join(', '),
      addressLocality: `${a.locality}, ${a.city}`,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    image: `${origin}/og.png`,
  };
  if (b.phone) data.telephone = b.phone.e164;
  if (b.geo) data.geo = { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng };
  if (b.googleMapsUrl) data.hasMap = b.googleMapsUrl;
  if (hoursComplete(b.hours)) {
    data.openingHoursSpecification = DAYS.filter((d) => !b.hours[d].closed).map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${DAY_SCHEMA[d]}`,
      opens: b.hours[d].open,
      closes: b.hours[d].close,
    }));
  }
  return data;
}

/** EventVenue, only once a hall's capacity is confirmed. */
export function venueJsonLd(origin: string, b: Branch): Record<string, unknown> | null {
  const h = b.hall;
  if (!h || (h.seated === null && h.standing === null)) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: h.name ?? `${site.tradingName} banquet hall, ${b.name}`,
    url: `${origin}/banquet/`,
    address: branchAddress(b),
    maximumAttendeeCapacity: Math.max(h.seated ?? 0, h.standing ?? 0),
    containedInPlace: { '@id': `${origin}/locations/${b.slug}/#restaurant` },
  };
}

/** Makes JSON safe to place inside a script element. */
export function jsonForScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
