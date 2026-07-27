import type { MetadataRoute } from "next";
import { getAllLocationSlugs } from "@/lib/local/locations";
import { SHOP_CATEGORIES, SHOP_PRODUCTS } from "@/lib/shop";
import { SITE_URL } from "@/lib/site";
import { CANONICAL_SITE_URL, normalizeSiteUrl } from "@/lib/site-url";

/** Soft limit per sitemap file (Google hard limit is 50,000). */
export const SITEMAP_URL_LIMIT = 45_000;

/**
 * Content revision for non-product pages.
 * Bump when core marketing pages change meaningfully.
 */
export const SITE_CONTENT_UPDATED = new Date("2026-07-27T12:00:00.000Z");

/** Production origin: HTTPS www only (via SITE_URL / normalizeSiteUrl). */
export function getCanonicalSiteOrigin(): string {
  return normalizeSiteUrl(SITE_URL || CANONICAL_SITE_URL);
}

export function toSitemapUrl(path: string): string {
  const origin = getCanonicalSiteOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return origin;
  return `${origin}${normalized}`;
}

function getLatestProductDate(): Date | null {
  if (!SHOP_PRODUCTS.length) return null;
  let latest = 0;
  for (const product of SHOP_PRODUCTS) {
    const ts = Date.parse(product.createdAt);
    if (!Number.isNaN(ts) && ts > latest) latest = ts;
  }
  return latest > 0 ? new Date(latest) : null;
}

function maxDate(...dates: Array<Date | null | undefined>): Date {
  let best = SITE_CONTENT_UPDATED.getTime();
  for (const date of dates) {
    if (!date) continue;
    const ts = date.getTime();
    if (!Number.isNaN(ts) && ts > best) best = ts;
  }
  return new Date(best);
}

/**
 * Lean production sitemap — only high-value public URLs.
 *
 * Included: home, shop + categories, products, sell, contact, about,
 * warranty, how-it-works, why, support hub, locations, legal.
 *
 * Excluded (unnecessary / thin / tools / duplicates):
 * compare, best-deals, support category hubs, individual FAQ articles.
 * Those pages stay crawlable via internal links; they just aren’t listed here.
 */
export function getIndexablePaths(): string[] {
  const paths = [
    "/",
    "/shop",
    ...SHOP_CATEGORIES.map((c) => `/shop/${c.slug}`),
    ...SHOP_PRODUCTS.map((p) => `/product/${p.id}`),
    "/sell",
    "/contact",
    "/about",
    "/warranty",
    "/how-it-works",
    "/why-protronics",
    "/support",
    ...getAllLocationSlugs().map((city) => `/locations/${city}`),
    "/privacy-policy",
    "/terms-of-service",
  ];

  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const path of paths) {
    if (seen.has(path)) continue;
    seen.add(path);
    ordered.push(path);
  }
  return ordered;
}

function getLastModified(path: string, latestProduct: Date | null): Date {
  if (path.startsWith("/product/")) {
    const product = SHOP_PRODUCTS.find((p) => `/product/${p.id}` === path);
    if (product) {
      const parsed = Date.parse(product.createdAt);
      if (!Number.isNaN(parsed)) return new Date(parsed);
    }
  }

  if (path === "/" || path === "/shop" || path.startsWith("/shop/")) {
    return maxDate(latestProduct, SITE_CONTENT_UPDATED);
  }

  return SITE_CONTENT_UPDATED;
}

/** Clean urlset entries: loc + lastmod only (Google ignores priority/changefreq). */
export function getSitemapEntries(): MetadataRoute.Sitemap {
  const latestProduct = getLatestProductDate();
  const entries = getIndexablePaths().map((path) => {
    const url = toSitemapUrl(path);
    if (!url.startsWith("https://")) {
      throw new Error(`[sitemap] Non-HTTPS URL generated: ${url}`);
    }
    return {
      url,
      lastModified: getLastModified(path, latestProduct),
    };
  });

  const urls = entries.map((e) => e.url);
  if (new Set(urls).size !== urls.length) {
    throw new Error("[sitemap] Duplicate URLs detected.");
  }

  return entries;
}

export function getSitemapChunkCount(): number {
  return Math.max(1, Math.ceil(getIndexablePaths().length / SITEMAP_URL_LIMIT));
}

export function getSitemapIds(): Array<{ id: number }> {
  return Array.from({ length: getSitemapChunkCount() }, (_, id) => ({ id }));
}

export function getSitemapEntriesForId(id: number): MetadataRoute.Sitemap {
  const all = getSitemapEntries();
  const start = id * SITEMAP_URL_LIMIT;
  return all.slice(start, start + SITEMAP_URL_LIMIT);
}
