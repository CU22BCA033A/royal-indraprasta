import { site, addressText } from '../config/site.ts';
import { hours, hoursComplete, DAYS } from '../config/hours.ts';

const DAY_SCHEMA: Record<string, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

/** Restaurant JSON-LD. Unconfirmed facts are left out; never aggregateRating. */
export function restaurantJsonLd(origin: string): Record<string, unknown> {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${origin}/#restaurant`,
    name: site.tradingName,
    url: `${origin}/`,
    telephone: site.phone,
    servesCuisine: [...site.cuisines, 'Vegetarian'],
    hasMenu: `${origin}/menu/`,
    menu: `${origin}/menu/`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [site.address.line1, site.address.street].filter(Boolean).join(', '),
      addressLocality: `${site.address.area}, ${site.address.city}`,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    image: `${origin}/og.png`,
  };
  if (site.legalName) data.legalName = site.legalName;
  if (site.email) data.email = site.email;
  if (site.geo) data.geo = { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng };
  if (site.googleMapsUrl) data.hasMap = site.googleMapsUrl;
  const sameAs = [site.social.instagram, site.social.facebook].filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;
  if (hoursComplete()) {
    data.openingHoursSpecification = DAYS.filter((d) => !hours[d].closed).map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${DAY_SCHEMA[d]}`,
      opens: hours[d].open,
      closes: hours[d].close,
    }));
  }
  return data;
}

/** EventVenue JSON-LD, only once the hall's capacity is confirmed. */
export function venueJsonLd(origin: string): Record<string, unknown> | null {
  const b = site.banquet;
  if (b.capacitySeated === null && b.capacityFloating === null) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: b.hallName ?? `${site.tradingName} banquet hall`,
    url: `${origin}/banquet/`,
    telephone: site.phone,
    address: addressText(),
    maximumAttendeeCapacity: Math.max(b.capacitySeated ?? 0, b.capacityFloating ?? 0),
    containedInPlace: { '@id': `${origin}/#restaurant` },
  };
}

/** Makes JSON safe to place inside a script element. */
export function jsonForScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
