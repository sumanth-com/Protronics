const DEFAULT_SITE_URL = "https://protronics.store";

/** Empty string from next.config env must not override the default (?? only catches null/undefined). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;

export const SITE_NAME = "Protronics";

export const SITE_DESCRIPTION =
  "Premium refurbished refrigerators and appliances—100+ quality checks, deep sanitization, performance certification, and 1-year warranty support.";

export const DEFAULT_OG_IMAGE = "/logo.webp";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
