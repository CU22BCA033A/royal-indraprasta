/**
 * Brand-wide facts. Facts that belong to one outlet (address, phone, hours,
 * hall, rooms) live in src/data/branches.ts.
 *
 * Rule: a value the owner has not confirmed is `null`. The UI hides anything
 * that depends on a `null` value. `npm run audit:placeholders` lists every
 * `null` in `LAUNCH_REQUIRED` and fails a production build until it is filled.
 */
import { mainBranch } from '../data/branches.ts';

export interface Site {
  tradingName: string;
  legalName: string | null;
  /** Canonical domain, for example "https://royalindraprastha.in". */
  domain: string | null;
  /** Brand phone line: the main branch's confirmed number. */
  phone: string;
  phoneDisplay: string;
  whatsapp: string | null;
  email: string | null;
  gstin: string | null;
  grievanceOfficer: { name: string; email: string } | null;
  social: { instagram: string | null; facebook: string | null };
  cuisines: string[];
  /** Owner-supplied cancellation and refund terms, one paragraph per entry. */
  cancellationTerms: string[] | null;
  /** Owner-supplied story for the About page. The page is not built while null. */
  story: string[] | null;
  modules: {
    /** Cookieless analytics. Off by default; turns the notice into a consent choice. */
    analytics: boolean;
  };
}

export const site: Site = {
  tradingName: 'Royal Indraprastha',
  legalName: null,
  domain: null,
  phone: mainBranch.phone?.e164 ?? '',
  phoneDisplay: mainBranch.phone?.display ?? '',
  whatsapp: null,
  email: null,
  gstin: null,
  grievanceOfficer: null,
  social: { instagram: null, facebook: null },
  cuisines: ['South Indian', 'North Indian'],
  cancellationTerms: null,
  story: null,
  modules: {
    analytics: false,
  },
};

/**
 * Facts that must be confirmed before a production launch. Paths are read by
 * scripts/audit-placeholders.mjs. Branch facts are checked there too.
 */
export const LAUNCH_REQUIRED = ['legalName', 'domain', 'email', 'grievanceOfficer'] as const;

export function whatsappUrl(): string | null {
  return site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}` : null;
}
