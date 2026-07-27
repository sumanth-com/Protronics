import type { MetadataRoute } from "next";
import {
  getSitemapChunkCount,
  getSitemapEntries,
  SITEMAP_URL_LIMIT,
} from "@/lib/seo-sitemap";

/**
 * Single production sitemap at `/sitemap.xml`.
 *
 * Chunking helpers in `lib/seo-sitemap.ts` (`getSitemapIds`,
 * `getSitemapEntriesForId`) are ready if the URL count ever exceeds
 * SITEMAP_URL_LIMIT — switch to Next.js `generateSitemaps` + a sitemap
 * index route at that point. Today the catalog is far below the limit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const chunkCount = getSitemapChunkCount();
  if (chunkCount > 1) {
    console.warn(
      `[sitemap] ${chunkCount} chunks needed (>${SITEMAP_URL_LIMIT} URLs). ` +
        "Enable generateSitemaps + a sitemap index before the next deploy.",
    );
  }
  return getSitemapEntries();
}
