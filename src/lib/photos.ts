import manifest from '../config/photos.generated.json';
import { photoAlt, type PhotoSlug } from '../config/photos.ts';

/** True when a photo has been processed and has alt text in both languages. */
export function hasPhoto(slug: PhotoSlug): boolean {
  return Boolean((manifest as Record<string, unknown>)[slug] && photoAlt[slug]);
}
