/**
 * Opening hours, 24-hour "HH:MM" in Asia/Kolkata. `null` means not confirmed.
 *
 * Public listings agree on a 10:30 PM close but give three different opening
 * times (6:00, 6:30 and 8:00 AM), so `open` stays null until the owner confirms.
 * The open or closed badge only appears when every day has both values.
 */

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface DayHours {
  open: string | null;
  close: string | null;
  /** True if the owner confirms the restaurant is closed this day. */
  closed?: boolean;
}

export const DAYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const hours: Record<DayKey, DayHours> = {
  mon: { open: null, close: '22:30' },
  tue: { open: null, close: '22:30' },
  wed: { open: null, close: '22:30' },
  thu: { open: null, close: '22:30' },
  fri: { open: null, close: '22:30' },
  sat: { open: null, close: '22:30' },
  sun: { open: null, close: '22:30' },
};

/** True when every day is either marked closed or has open and close times. */
export function hoursComplete(h: Record<DayKey, DayHours> = hours): boolean {
  return DAYS.every((d) => h[d].closed === true || (h[d].open !== null && h[d].close !== null));
}

/** The single closing time if every day shares it, else null. */
export function commonClose(h: Record<DayKey, DayHours> = hours): string | null {
  const closes = new Set(DAYS.map((d) => h[d].close));
  if (closes.size !== 1) return null;
  const [only] = [...closes];
  return only ?? null;
}

/** Formats "22:30" as "10:30 PM". */
export function formatTime(t: string): string {
  const [hh, mm] = t.split(':').map(Number) as [number, number];
  const suffix = hh >= 12 ? 'PM' : 'AM';
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, '0')} ${suffix}`;
}

function toMinutes(t: string): number {
  const [hh, mm] = t.split(':').map(Number) as [number, number];
  return hh * 60 + mm;
}

/**
 * Open status at a given instant in Asia/Kolkata. Returns null when hours are
 * incomplete, so callers show nothing rather than a guess.
 */
export function openStatus(
  now: Date,
  h: Record<DayKey, DayHours> = hours,
): { open: boolean; until: string | null } | null {
  if (!hoursComplete(h)) return null;
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const day = get('weekday').toLowerCase().slice(0, 3) as DayKey;
  const minutes = (Number(get('hour')) % 24) * 60 + Number(get('minute'));
  const today = h[day];
  if (today.closed || !today.open || !today.close) return { open: false, until: null };
  const o = toMinutes(today.open);
  const c = toMinutes(today.close);
  const isOpen = c > o ? minutes >= o && minutes < c : minutes >= o || minutes < c;
  return { open: isOpen, until: isOpen ? today.close : today.open };
}
