import { LOCAL_SEO_KEYWORDS } from "@/lib/local/business";
import { CANONICAL_SITE_URL, normalizeSiteUrl } from "@/lib/site-url";

export { CANONICAL_SITE_URL, normalizeSiteUrl } from "@/lib/site-url";

/** Empty string from next.config env must not override the default. */
export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || CANONICAL_SITE_URL,
);

export const SITE_NAME = "Protronics";

/** Default site title (home + root metadata). */
export const SITE_TITLE_DEFAULT = `${SITE_NAME} | Premium Refurbished Appliances`;

/** Global meta description for root / fallback. */
export const SITE_DESCRIPTION =
  "Protronics is a Bengaluru refurbished appliance store selling certified refrigerators and washing machines with warranty, trade-in, delivery, and local support across Bangalore.";

/** Home page SEO description (kept in sync with PAGE_SEO.home). */
export const SITE_HOME_DESCRIPTION =
  "Protronics is a Bengaluru refurbished appliance store selling certified refrigerators and washing machines with warranty, trade-in, delivery, and local support. Browse quality-tested units with 100+ checks across Bangalore.";

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
  const base = SITE_URL.replace(/\/+$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
