const DEFAULT_SITE_URL = "https://protronics.store";

/** Empty string from next.config env must not override the default (?? only catches null/undefined). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;

export const SITE_NAME = "Protronics";

/** Default site title (home + root metadata). */
export const SITE_TITLE_DEFAULT = `${SITE_NAME} | Premium Refurbished Appliances`;

/** Global meta description for root / fallback. */
export const SITE_DESCRIPTION =
  "Shop professionally refurbished refrigerators and home appliances with warranty, quality testing, safe delivery, and trusted support from Protronics.";

/** Home page H1-adjacent SEO description (richer). */
export const SITE_HOME_DESCRIPTION =
  "Discover professionally refurbished refrigerators and home appliances backed by 100+ quality checks, warranty coverage, expert support, and trusted delivery across India.";

import { LOCAL_SEO_KEYWORDS } from "@/lib/local/business";

export const SITE_KEYWORDS = [
  "refurbished refrigerators",
  "premium refurbished appliances",
  "renewed refrigerators",
  "refrigerator trade-in",
  "certified refurbished appliances",
  "used refrigerator with warranty",
  "appliance exchange",
  "refurbished home appliances",
  "Protronics",
  "refurbished fridge India",
  "renewed appliances Bengaluru",
  ...LOCAL_SEO_KEYWORDS,
] as const;

export const DEFAULT_OG_IMAGE = "/og/protronics-og.webp";
export const OG_IMAGE_ALT = "Protronics — Premium Refurbished Refrigerators & Appliances";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
