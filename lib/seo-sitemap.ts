import { getAllLocationSlugs } from "@/lib/local/locations";
import { SHOP_CATEGORIES, SHOP_PRODUCTS } from "@/lib/shop";
import { getAllArticlePaths, SUPPORT_CATEGORIES_VISIBLE } from "@/lib/support";
import { SITE_URL } from "@/lib/site";

/** Stable content revision date for non-product sitemap entries. */
const SITE_CONTENT_UPDATED = new Date("2026-07-27T00:00:00.000Z");

/** All indexable canonical paths (products auto-expand when SHOP_PRODUCTS grows). */
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
  const supportPaths = getAllArticlePaths().map(
    ({ category, article }) => `/support/${category}/${article}`,
  );

  return [
    ...staticPaths,
    ...categoryPaths,
    ...productPaths,
    ...supportCategoryPaths,
    ...supportPaths,
  ];
}

export function getSitemapEntries() {
  return getIndexablePaths().map((path) => {
    const product = path.startsWith("/product/")
      ? SHOP_PRODUCTS.find((p) => `/product/${p.id}` === path)
      : undefined;

    let priority = 0.8;
    let changeFrequency: "daily" | "weekly" | "monthly" = "weekly";

    if (path === "/") {
      priority = 1;
      changeFrequency = "daily";
    } else if (path.startsWith("/product/")) {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (path.startsWith("/locations/")) {
      priority = 0.88;
      changeFrequency = "weekly";
    } else if (path.startsWith("/shop")) {
      priority = 0.85;
    } else if (path === "/support") {
      priority = 0.75;
      changeFrequency = "monthly";
    } else if (path.startsWith("/support/")) {
      priority = 0.7;
      changeFrequency = "monthly";
    } else if (path === "/why-protronics" || path === "/warranty") {
      priority = 0.82;
    }

    return {
      url: `${SITE_URL}${path}`,
      lastModified: product ? new Date(product.createdAt) : SITE_CONTENT_UPDATED,
      changeFrequency,
      priority,
    };
  });
}
