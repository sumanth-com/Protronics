import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/seo-sitemap";

/** Production sitemap — lean list of high-value public URLs only. */
export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}
