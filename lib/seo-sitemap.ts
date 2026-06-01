import { SHOP_CATEGORIES, SHOP_PRODUCTS } from "@/lib/shop";
import { getAllArticlePaths } from "@/lib/support";
import { SITE_URL } from "@/lib/site";

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
  ];

  const categoryPaths = SHOP_CATEGORIES.map((c) => `/shop/${c.slug}`);
  const productPaths = SHOP_PRODUCTS.map((p) => `/product/${p.id}`);
  const supportPaths = getAllArticlePaths().map(
    ({ category, article }) => `/support/${category}/${article}`,
  );

  return [...staticPaths, ...categoryPaths, ...productPaths, ...supportPaths];
}

export function getSitemapEntries() {
  const now = new Date();

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
    } else if (path.startsWith("/shop")) {
      priority = 0.85;
    } else if (path.startsWith("/support/")) {
      priority = 0.7;
      changeFrequency = "monthly";
    }

    return {
      url: `${SITE_URL}${path}`,
      lastModified: product ? new Date(product.createdAt) : now,
      changeFrequency,
      priority,
    };
  });
}
