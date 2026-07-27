import type { MetadataRoute } from "next";
import { getCanonicalSiteOrigin } from "@/lib/seo-sitemap";

/**
 * Production robots.txt — one default policy for all crawlers.
 * Do not block `/_next/` or static assets; Google needs them to render pages.
 *
 * Blocked prefixes are non-public / non-indexable surfaces only.
 */
const DISALLOW = [
  "/api/",
  "/admin/",
  "/private/",
  "/draft/",
  "/dev/",
  "/test/",
] as const;

export default function robots(): MetadataRoute.Robots {
  const origin = getCanonicalSiteOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...DISALLOW],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
