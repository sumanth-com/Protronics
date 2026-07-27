import type { MetadataRoute } from "next";
import { getAllLocationSlugs } from "@/lib/local/locations";
import { SHOP_CATEGORIES, SHOP_PRODUCTS } from "@/lib/shop";
import { getAllArticlePaths, SUPPORT_CATEGORIES_VISIBLE } from "@/lib/support";
import { SITE_URL } from "@/lib/site";

/**
 * Google/Bing soft limit is 50,000 URLs per sitemap file.
 * Chunk below that so we never hit the hard ceiling.
 */
export const SITEMAP_URL_LIMIT = 45_000;

/**
 * Manual content-revision stamp for non-product pages.
 * Bump when significant marketing/support/legal copy changes.
 * Product `lastmod` uses each product's `createdAt` (and shop pages use the newest product).
 */
export const SITE_CONTENT_UPDATED = new Date("2026-07-27T12:00:00.000Z");

/** Production origin: HTTPS only, no trailing slash. */
export function getCanonicalSiteOrigin(): string {
  let origin = (SITE_URL || "https://protronics.store").trim().replace(/\/+$/, "");
  if (origin.startsWith("http://")) {
    origin = `https://${origin.slice("http://".length)}`;
  }
  if (!origin.startsWith("https://")) {
    origin = `https://${origin.replace(/^\/+/, "")}`;
  }
  return origin;
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
 * Canonical indexable paths only — no redirects, noindex targets, or private routes.
 * Products and support articles expand automatically from catalog data.
 */
export function getIndexablePaths(): string[] {
  const staticPaths = [
    "/",
    "/shop",
    "/about",
    "/contact",
    "/support",
    "/sell",
    "/warranty",
    "/how-it-works",
    "/privacy-policy",
    "/terms-of-service",
    "/compare",
    "/best-deals",
    "/why-protronics",
    ...getAllLocationSlugs().map((city) => `/locations/${city}`),
  ];

  const categoryPaths = SHOP_CATEGORIES.map((c) => `/shop/${c.slug}`);
  const productPaths = SHOP_PRODUCTS.map((p) => `/product/${p.id}`);
  const supportCategoryPaths = SUPPORT_CATEGORIES_VISIBLE.map(
    (c) => `/support/${c.id}`,
  );
  const supportArticlePaths = getAllArticlePaths().map(
    ({ category, article }) => `/support/${category}/${article}`,
  );

  // Preserve a stable, intentional order while removing accidental duplicates.
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const path of [
    ...staticPaths,
    ...categoryPaths,
    ...productPaths,
    ...supportCategoryPaths,
    ...supportArticlePaths,
  ]) {
    if (seen.has(path)) continue;
    seen.add(path);
    ordered.push(path);
  }
  return ordered;
}

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

function getPriorityAndFrequency(path: string): {
  priority: number;
  changeFrequency: ChangeFrequency;
} {
  if (path === "/") {
    return { priority: 1, changeFrequency: "daily" };
  }
  if (path === "/shop" || path === "/sell" || path === "/contact") {
    return { priority: 0.9, changeFrequency: "weekly" };
  }
  if (path.startsWith("/product/")) {
    return { priority: 0.8, changeFrequency: "weekly" };
  }
  if (path.startsWith("/shop/")) {
    return { priority: 0.75, changeFrequency: "weekly" };
  }
  if (
    path === "/about" ||
    path === "/warranty" ||
    path === "/how-it-works" ||
    path === "/why-protronics" ||
    path.startsWith("/locations/")
  ) {
    return { priority: 0.7, changeFrequency: "weekly" };
  }
  if (path === "/best-deals" || path === "/compare") {
    return { priority: 0.65, changeFrequency: "weekly" };
  }
  if (path === "/support") {
    return { priority: 0.6, changeFrequency: "monthly" };
  }
  if (path.startsWith("/support/")) {
    return { priority: 0.5, changeFrequency: "monthly" };
  }
  if (path === "/privacy-policy" || path === "/terms-of-service") {
    return { priority: 0.3, changeFrequency: "yearly" };
  }
  return { priority: 0.5, changeFrequency: "monthly" };
}

function getLastModified(path: string, latestProduct: Date | null): Date {
  if (path.startsWith("/product/")) {
    const product = SHOP_PRODUCTS.find((p) => `/product/${p.id}` === path);
    if (product) {
      const parsed = Date.parse(product.createdAt);
      if (!Number.isNaN(parsed)) return new Date(parsed);
    }
  }

  // Catalog surfaces should reflect the newest product listing.
  if (path === "/" || path === "/shop" || path.startsWith("/shop/") || path === "/best-deals") {
    return maxDate(latestProduct, SITE_CONTENT_UPDATED);
  }

  return SITE_CONTENT_UPDATED;
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const latestProduct = getLatestProductDate();
  const entries = getIndexablePaths().map((path) => {
    const { priority, changeFrequency } = getPriorityAndFrequency(path);
    const url = toSitemapUrl(path);

    if (!url.startsWith("https://")) {
      throw new Error(`[sitemap] Non-HTTPS URL generated: ${url}`);
    }

    return {
      url,
      lastModified: getLastModified(path, latestProduct),
      changeFrequency,
      priority,
    };
  });

  const urls = entries.map((e) => e.url);
  if (new Set(urls).size !== urls.length) {
    throw new Error("[sitemap] Duplicate URLs detected in sitemap entries.");
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
