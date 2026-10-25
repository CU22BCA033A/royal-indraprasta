/**
 * The one place "Last updated" dates come from. Change a date only when the
 * content of that page actually changes. ISO format, YYYY-MM-DD.
 */
export const contentDates = {
  site: '2026-10-25',
  menu: '2026-10-25',
  faq: '2026-10-25',
  privacy: '2026-10-25',
  terms: '2026-10-25',
  cookies: '2026-10-25',
  cancellation: '2026-10-25',
  dataRequest: '2026-10-25',
} as const;

export type ContentDateKey = keyof typeof contentDates;

export function formatDate(iso: string, lang: 'en' | 'kn'): string {
  const d = new Date(`${iso}T00:00:00+05:30`);
  return new Intl.DateTimeFormat(lang === 'kn' ? 'kn-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(d);
}
