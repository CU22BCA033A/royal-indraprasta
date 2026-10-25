# Licences

## Fonts (self-hosted from `public/fonts/`)

| Family             | Package                          | Version | Licence                   |
| ------------------ | -------------------------------- | ------- | ------------------------- |
| Young Serif        | `@fontsource/young-serif`        | 5.3.0   | SIL Open Font License 1.1 |
| Figtree            | `@fontsource/figtree`            | 5.3.0   | SIL Open Font License 1.1 |
| Noto Sans Kannada  | `@fontsource/noto-sans-kannada`  | 5.3.0   | SIL Open Font License 1.1 |
| Noto Serif Kannada | `@fontsource/noto-serif-kannada` | 5.3.0   | SIL Open Font License 1.1 |

Kannada files are subsets made with fonttools (`npm run fonts`). The OFL allows subsetting; the subset files keep their original names inside the font and are not sold on their own.

## Code dependencies

Runtime dependencies are Astro (MIT), @astrojs/sitemap (MIT), zod (MIT) and the font packages. Development tools are listed in `package.json` (MIT, Apache-2.0 or BSD licences). No third-party script runs in the visitor's browser except Pagefind (MIT), which is bundled and self-hosted.

## Artwork

The wordmark, lattice, favicon and Open Graph image are original to this project.
