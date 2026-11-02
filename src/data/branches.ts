import type { PhotoSlug } from '../config/photos.ts';
/**
 * Every outlet of Royal Indraprastha. One object per branch; the site renders
 * only branches with `confirmed: true` (two independent sources or the owner).
 *
 * Rule: an unconfirmed fact is `null` and is hidden. Sources are listed per
 * branch and explained in docs/RESEARCH.md and docs/BRAND-DISCOVERY.md.
 *
 * To add a branch: copy an object, change the slug and facts, set confirmed.
 * Pages, sitemap, JSON-LD, the header picker and the nearest-branch finder
 * pick it up automatically.
 */
import type { DayHours, DayKey } from '../config/hours.ts';

export interface Phone {
  /** E.164, for tel: links. */
  e164: string;
  /** As printed, with non-breaking spaces. */
  display: string;
}

export interface Hall {
  name: string | null;
  seated: number | null;
  standing: number | null;
  inclusions: string[] | null;
}

export interface Branch {
  slug: string;
  /** Short name used in navigation and ledgers, for example "Cariappa Road". */
  name: string;
  /** Name on the board, if the owner confirms a branch-specific one. */
  tradingName: string;
  confirmed: boolean;
  city: string;
  area: string;
  address: {
    /** Door number and building. */
    line1: string | null;
    street: string;
    locality: string;
    city: string;
    postalCode: string;
    region: string;
    country: string;
  };
  /** Landmark as locals give it, shown only when confirmed. */
  landmark: string | null;
  plusCode: string | null;
  /** Owner-verified pin. Published in JSON-LD and used for directions. */
  geo: { lat: number; lng: number } | null;
  /**
   * Approximate position from public listings. Used only in the visitor's own
   * browser to sort branches by distance; never published as a fact.
   */
  approxGeo: { lat: number; lng: number } | null;
  phone: Phone | null;
  whatsapp: string | null;
  googleMapsUrl: string | null;
  hours: Record<DayKey, DayHours>;
  services: {
    dineIn: boolean;
    takeaway: boolean | null;
    banquet: boolean;
    rooms: boolean;
  };
  hall: Hall | null;
  /** Photo of the branch front, a slug in src/config/photos.ts, or null. */
  photo: PhotoSlug | null;
  fssaiLicence: string | null;
  access: string[] | null;
  parking: string[] | null;
  sources: string[];
}

const everyDay = (open: string | null, close: string | null): Record<DayKey, DayHours> => ({
  mon: { open, close },
  tue: { open, close },
  wed: { open, close },
  thu: { open, close },
  fri: { open, close },
  sat: { open, close },
  sun: { open, close },
});

export const branches: Branch[] = [
  {
    slug: 'cariappa-road',
    name: 'Cariappa Road',
    tradingName: 'Royal Indraprastha',
    confirmed: true,
    city: 'Bengaluru',
    area: 'Rajarajeshwari Nagar, 4th Stage',
    address: {
      line1: null,
      street: 'Field Marshal Cariappa Road, 4th Stage',
      locality: 'Rajarajeshwari Nagar',
      city: 'Bengaluru',
      postalCode: '560098',
      region: 'Karnataka',
      country: 'IN',
    },
    // One listing says "opposite Cariappa Park" (S3). Owner to confirm.
    landmark: null,
    plusCode: null,
    geo: null,
    approxGeo: { lat: 12.9123, lng: 77.521 },
    phone: { e164: '+919743932821', display: '+91 97439 32821' },
    whatsapp: null,
    googleMapsUrl: null,
    // Closing time agreed by three listings; opening time conflicts (6:00, 6:30, 8:00).
    hours: everyDay(null, '22:30'),
    services: { dineIn: true, takeaway: null, banquet: true, rooms: false },
    // A venue marketplace lists 150 seated and 250 standing (S4, single source).
    // Hall name from the owner's building rendering (2 November 2026).
    hall: { name: 'Anugraha Banquet', seated: null, standing: null, inclusions: null },
    photo: 'cariappa-day',
    fssaiLicence: null,
    access: null,
    parking: null,
    sources: ['S1', 'S2', 'S3', 'S4', 'S10'],
  },
  {
    slug: 'channasandra',
    name: 'Channasandra',
    tradingName: 'Royal Indraprastha',
    confirmed: true,
    city: 'Bengaluru',
    area: 'Channasandra, Rajarajeshwari Nagar',
    address: {
      line1: '1221, SN Plaza, B Block',
      street: 'Channasandra',
      locality: 'Rajarajeshwari Nagar',
      city: 'Bengaluru',
      postalCode: '560098',
      region: 'Karnataka',
      country: 'IN',
    },
    landmark: null,
    plusCode: 'WG36+5JG',
    geo: null,
    approxGeo: { lat: 12.9039, lng: 77.5117 },
    // +91 80 4991 0128 appears on one listing only (S12). Owner to confirm.
    phone: null,
    whatsapp: null,
    googleMapsUrl: null,
    // Opening time conflicts between listings (7:00 and 7:30 AM); closing on one listing only.
    hours: everyDay(null, null),
    services: { dineIn: true, takeaway: null, banquet: false, rooms: true },
    hall: null,
    photo: 'channasandra-hotel',
    fssaiLicence: null,
    access: null,
    parking: null,
    sources: ['S5', 'S6', 'S11', 'S12', 'S13', 'S14', 'S15'],
  },
];

export const liveBranches = branches.filter((b) => b.confirmed);

export function branchBySlug(slug: string): Branch | undefined {
  return liveBranches.find((b) => b.slug === slug);
}

/** The branch whose phone is the brand's main line (first confirmed branch with a phone). */
export const mainBranch: Branch = liveBranches.find((b) => b.phone) ?? (liveBranches[0] as Branch);

export function branchAddress(b: Branch): string {
  const a = b.address;
  return [a.line1, a.street, a.street.includes(a.locality) ? null : a.locality, `${a.city} ${a.postalCode}`]
    .filter(Boolean)
    .join(', ');
}

export function branchMapsUrl(b: Branch): string {
  if (b.googleMapsUrl) return b.googleMapsUrl;
  const q = encodeURIComponent(`Royal Indraprastha, ${branchAddress(b)}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function branchDirectionsUrl(b: Branch): string {
  const dest = b.geo ? `${b.geo.lat},${b.geo.lng}` : encodeURIComponent(`Royal Indraprastha, ${branchAddress(b)}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
}

export function branchServices(b: Branch): string[] {
  const out: string[] = [];
  if (b.services.dineIn) out.push('Dine-in');
  if (b.services.takeaway) out.push('Takeaway');
  if (b.services.banquet) out.push('Banquet hall');
  if (b.services.rooms) out.push('Rooms');
  return out;
}

export function cities(): string[] {
  return [...new Set(liveBranches.map((b) => b.city))];
}
