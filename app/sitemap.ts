import type { MetadataRoute } from "next";
import { SHOP_CATEGORIES, SHOP_PRODUCTS } from "@/lib/shop";
import { getAllArticlePaths } from "@/lib/support";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/shop",
    "/about",
    "/how-it-works",
    "/warranty",
    "/contact",
    "/faq",
    "/compare",
    "/trade-in",
    "/why-protronics",
    "/support",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = SHOP_CATEGORIES.map((c) => ({
    url: `${SITE_URL}/shop/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = SHOP_PRODUCTS.map((p) => ({
    url: `${SITE_URL}/product/${p.id}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const supportRoutes: MetadataRoute.Sitemap = getAllArticlePaths().map(
    ({ category, article }) => ({
      url: `${SITE_URL}/support/${category}/${article}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...supportRoutes];
}
