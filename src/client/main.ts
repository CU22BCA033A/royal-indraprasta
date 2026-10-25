/**
 * Site-wide behaviour. No third-party code. Every feature degrades to plain
 * links and native elements when JavaScript is off.
 */
import { openStatus, formatTime, type DayHours, type DayKey } from '../config/hours.ts';

const KEYS = { theme: 'ri-theme', lang: 'ri-lang', notice: 'ri-notice', utm: 'ri-utm' } as const;

function store(kind: 'local' | 'session') {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}
function get(key: string, kind: 'local' | 'session' = 'local'): string | null {
  try {
    return store(kind)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}
function set(key: string, value: string, kind: 'local' | 'session' = 'local'): void {
  try {
    store(kind)?.setItem(key, value);
  } catch {
    /* storage blocked: the choice simply is not remembered */
  }
}

/* Theme */
function currentTheme(): 'light' | 'dark' {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function syncThemeButtons(): void {
  const dark = currentTheme() === 'dark';
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(dark));
  });
}
document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((b) => {
  b.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    set(KEYS.theme, next);
    syncThemeButtons();
  });
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncThemeButtons);
syncThemeButtons();

/* Language preference */
document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]').forEach((a) => {
  a.addEventListener('click', () => set(KEYS.lang, a.dataset.langSwitch ?? 'en'));
});

/* Dialogs: mobile menu and search. Native modal dialogs trap focus and close on Escape. */
let lastOpener: HTMLElement | null = null;
function openDialog(d: HTMLDialogElement, opener: HTMLElement): void {
  lastOpener = opener;
  if (!d.open) d.showModal();
}
document.querySelectorAll<HTMLDialogElement>('dialog').forEach((d) => {
  d.addEventListener('close', () => {
    lastOpener?.focus();
    lastOpener = null;
  });
  d.querySelectorAll<HTMLElement>('[data-dialog-close]').forEach((b) => b.addEventListener('click', () => d.close()));
  d.addEventListener('click', (e) => {
    if (e.target === d) d.close();
  });
});
const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
document.querySelector<HTMLButtonElement>('[data-menu-open]')?.addEventListener('click', (e) => {
  if (menu) openDialog(menu, e.currentTarget as HTMLElement);
});
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.close()));

/* Search, using the Pagefind index built after the site */
const searchDialog = document.querySelector<HTMLDialogElement>('#search-dialog');
const searchBody = searchDialog?.querySelector<HTMLElement>('[data-search]');
interface PagefindResult {
  data: () => Promise<{ url: string; excerpt: string; meta: { title?: string } }>;
}
interface Pagefind {
  search: (q: string) => Promise<{ results: PagefindResult[] } | null>;
  debouncedSearch?: (q: string, opts?: unknown, ms?: number) => Promise<{ results: PagefindResult[] } | null>;
  options?: (o: Record<string, unknown>) => Promise<void>;
}
let pagefind: Pagefind | null | undefined;
async function loadPagefind(): Promise<Pagefind | null> {
  if (pagefind !== undefined) return pagefind;
  try {
    const url = '/pagefind/pagefind.js';
    pagefind = (await import(/* @vite-ignore */ url)) as Pagefind;
  } catch {
    pagefind = null;
  }
  return pagefind;
}
if (searchDialog && searchBody) {
  const input = searchBody.querySelector<HTMLInputElement>('input')!;
  const status = searchBody.querySelector<HTMLElement>('[role="status"]')!;
  const list = searchBody.querySelector<HTMLUListElement>('.search-results')!;
  const text = JSON.parse(searchBody.dataset.text ?? '{}') as Record<string, string>;
  const fill = (s: string, k: string, v: string | number) => s.replace(`{${k}}`, String(v));
  document.querySelectorAll<HTMLButtonElement>('[data-search-open]').forEach((b) =>
    b.addEventListener('click', () => {
      menu?.open && menu.close();
      openDialog(searchDialog, b);
      input.focus();
      void loadPagefind();
    }),
  );
  let seq = 0;
  input.addEventListener('input', async () => {
    const q = input.value.trim();
    const mine = ++seq;
    if (q.length < 2) {
      list.replaceChildren();
      status.textContent = text.hint ?? '';
      return;
    }
    const pf = await loadPagefind();
    if (mine !== seq) return;
    if (!pf) {
      status.textContent = text.unavailable ?? '';
      return;
    }
    const res = await pf.search(q);
    if (mine !== seq || !res) return;
    const top = await Promise.all(res.results.slice(0, 8).map((r) => r.data()));
    if (mine !== seq) return;
    list.replaceChildren(
      ...top.map((r) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = r.url;
        a.textContent = r.meta.title ?? r.url;
        const p = document.createElement('p');
        // Pagefind excerpts contain only <mark> tags around matches; rebuild safely.
        r.excerpt.split(/(<mark>|<\/mark>)/).reduce((inMark, part) => {
          if (part === '<mark>') return true;
          if (part === '</mark>') return false;
          const node = inMark ? document.createElement('mark') : document.createTextNode('');
          node.textContent = part.replace(/&[a-z#0-9]+;/gi, (m) => {
            const el = document.createElement('textarea');
            el.innerHTML = m;
            return el.value;
          });
          p.append(node);
          return inMark;
        }, false);
        li.append(a, p);
        return li;
      }),
    );
    status.textContent = top.length ? fill(text.count ?? '', 'n', top.length) : fill(text.none ?? '', 'q', q);
  });
}

/* Scroll progress and back to top */
const progress = document.querySelector<HTMLElement>('.progress');
const toTop = document.querySelector<HTMLElement>('[data-back-to-top]');
let ticking = false;
function onScroll(): void {
  ticking = false;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const y = window.scrollY;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  if (toTop) toTop.hidden = y < window.innerHeight * 1.2;
}
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true },
);
onScroll();
toTop?.querySelector('a')?.addEventListener('click', () => {
  window.setTimeout(() => document.querySelector<HTMLElement>('.skip')?.focus({ preventScroll: true }), 0);
});

/* Copy buttons */
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((b) => {
  const status = b.parentElement?.querySelector<HTMLElement>('.copy-status');
  let timer = 0;
  b.addEventListener('click', async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(b.dataset.copy ?? '');
      ok = true;
    } catch {
      ok = false;
    }
    if (status) {
      status.textContent = ok ? (b.dataset.copied ?? '') : (b.dataset.failed ?? '');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => (status.textContent = ''), 4000);
    }
  });
});

/* Open or closed status, computed in Asia/Kolkata */
document.querySelectorAll<HTMLElement>('.status[data-hours]').forEach((el) => {
  const h = JSON.parse(el.dataset.hours ?? '{}') as Record<DayKey, DayHours>;
  const text = JSON.parse(el.dataset.text ?? '{}') as Record<string, string>;
  const s = openStatus(new Date(), h);
  if (!s) return;
  el.dataset.open = String(s.open);
  const time = s.until ? formatTime(s.until) : '';
  el.textContent = s.open
    ? (text.open ?? '').replace('{time}', time)
    : s.until
      ? (text.closed ?? '').replace('{time}', time)
      : (text.closedToday ?? '');
});

/* UTM parameters, first party only, kept for this browser tab */
(() => {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  params.forEach((v, k) => {
    if (/^utm_(source|medium|campaign|term|content)$/.test(k)) utm[k] = v.slice(0, 200);
  });
  if (Object.keys(utm).length) set(KEYS.utm, JSON.stringify(utm), 'session');
})();

/* Storage notice */
const notice = document.querySelector<HTMLElement>('[data-notice]');
if (notice && !get(KEYS.notice)) {
  notice.hidden = false;
  document.documentElement.classList.add('has-notice');
  notice.querySelectorAll<HTMLButtonElement>('[data-notice-choice]').forEach((b) =>
    b.addEventListener('click', () => {
      set(KEYS.notice, b.dataset.noticeChoice ?? 'ok');
      notice.hidden = true;
      document.documentElement.classList.remove('has-notice');
      document.dispatchEvent(new CustomEvent('ri:consent', { detail: b.dataset.noticeChoice }));
    }),
  );
}

/* Mobile contact panel */
const contact = document.querySelector<HTMLElement>('[data-contact]');
if (contact) {
  const btn = contact.querySelector<HTMLButtonElement>('button')!;
  const panel = contact.querySelector<HTMLElement>('.contact-panel')!;
  const setOpen = (open: boolean, focusButton = false) => {
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    if (open) panel.querySelector('a')?.focus();
    else if (focusButton) btn.focus();
  };
  btn.addEventListener('click', () => setOpen(panel.hidden));
  contact.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) setOpen(false, true);
  });
  document.addEventListener('click', (e) => {
    if (!panel.hidden && !contact.contains(e.target as Node)) setOpen(false);
  });
  // Never cover a form's submit button.
  const submits = document.querySelectorAll('form [type="submit"], form [data-review]');
  if (submits.length && 'IntersectionObserver' in window) {
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
      contact.hidden = visible.size > 0;
      if (contact.hidden) setOpen(false);
    });
    submits.forEach((s) => io.observe(s));
  }
}

export {};
