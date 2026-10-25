import { en, type Dict } from './en.ts';
import { kn } from './kn.ts';

export type Lang = 'en' | 'kn';
export const LANGS: Lang[] = ['en', 'kn'];

export function dict(lang: Lang): Dict {
  return lang === 'kn' ? kn : en;
}

/** Replaces `{key}` placeholders. */
export function fmt(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}

/** Path of a page in a language. `path` is the English path, for example "/menu/". */
export function localPath(path: string, lang: Lang): string {
  if (lang === 'en') return path;
  return path === '/' ? '/kn/' : `/kn${path}`;
}

/** The English path for a URL path in either language. */
export function basePath(pathname: string): string {
  if (pathname === '/kn' || pathname === '/kn/') return '/';
  return pathname.startsWith('/kn/') ? pathname.slice(3) : pathname;
}

/** Static paths for pages built in both languages via `[...lang]`. */
export function langPaths() {
  return [
    { params: { lang: undefined }, props: { lang: 'en' as Lang } },
    { params: { lang: 'kn' }, props: { lang: 'kn' as Lang } },
  ];
}
