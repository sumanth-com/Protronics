export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://protronics.in";

export const SITE_NAME = "Protronics";

export const SITE_DESCRIPTION =
  "Premium refurbished refrigerators and appliances—100+ quality checks, deep sanitization, performance certification, and 1-year warranty support.";

export const DEFAULT_OG_IMAGE = "/logo.png";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
