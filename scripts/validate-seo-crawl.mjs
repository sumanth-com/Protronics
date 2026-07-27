/**
 * Lightweight crawl-config validation (no TS runtime required).
 * Run: node scripts/validate-seo-crawl.mjs
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const robots = readFileSync(join(root, "app/robots.ts"), "utf8");
const sitemapLib = readFileSync(join(root, "lib/seo-sitemap.ts"), "utf8");
const sitemapApp = readFileSync(join(root, "app/sitemap.ts"), "utf8");

const errors = [];

if (robots.includes('"/_next/"') || robots.includes("'/\_next/'")) {
  errors.push("robots.txt must not block /_next/ (needed for rendering).");
}

for (const blocked of ["/api/", "/admin/", "/private/", "/draft/", "/dev/", "/test/"]) {
  if (!robots.includes(`"${blocked}"`) && !robots.includes(`'${blocked}'`)) {
    errors.push(`robots.ts missing disallow for ${blocked}`);
  }
}

if (!/userAgent:\s*"\*"/.test(robots)) {
  errors.push('robots.ts should use a single default userAgent: "*" policy.');
}

if (/Googlebot|GPTBot|Bingbot/.test(robots) && robots.includes("AI_AND_SEARCH")) {
  errors.push("robots.ts still repeats per-bot rules unnecessarily.");
}

if (!sitemapLib.includes("getCanonicalSiteOrigin")) {
  errors.push("seo-sitemap.ts missing HTTPS origin helper.");
}

if (!sitemapLib.includes("SHOP_PRODUCTS.map")) {
  errors.push("sitemap must auto-include product pages from SHOP_PRODUCTS.");
}

if (!sitemapApp.includes("getSitemapEntries")) {
  errors.push("app/sitemap.ts must emit getSitemapEntries().");
}

if (errors.length) {
  console.error("[validate-seo-crawl] FAILED:");
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

console.info("[validate-seo-crawl] OK — robots + sitemap config look production-ready.");
