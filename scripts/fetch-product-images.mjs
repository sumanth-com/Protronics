/**
 * Syncs refrigerator product images from assets/images/refrigerators/
 * to public/images/refrigerators/ and refreshes public/featured/ copies.
 * Run: npm run images:products
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assetsDir = path.join(root, "assets", "images", "refrigerators");
const publicDir = path.join(root, "public", "images", "refrigerators");
const featuredDir = path.join(root, "public", "featured");

const FEATURED_MAP = [
  ["featured-1.webp", "lg-smart-inverter-single-door-320l.webp"],
  ["featured-2.webp", "samsung-digital-inverter-double-door-340l.webp"],
  ["featured-3.webp", "haier-bottom-mount-frost-free-300l.webp"],
  ["featured-4.webp", "godrej-edge-pro-single-door-240l.webp"],
  ["featured-5.webp", "whirlpool-protton-convertible-360l.webp"],
  ["featured-6.webp", "samsung-family-hub-side-by-side-580l.webp"],
];

function main() {
  if (!fs.existsSync(assetsDir)) {
    console.error("Missing assets/images/refrigerators/. Run: npm run images:refrigerators");
    process.exit(1);
  }

  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(featuredDir, { recursive: true });

  const files = fs.readdirSync(assetsDir).filter((f) => f.endsWith(".webp"));
  for (const file of files) {
    fs.copyFileSync(path.join(assetsDir, file), path.join(publicDir, file));
    console.log(`[ok] public/images/refrigerators/${file}`);
  }

  for (const [featured, source] of FEATURED_MAP) {
    const src = path.join(publicDir, source);
    if (!fs.existsSync(src)) {
      console.warn(`[skip] featured/${featured} — missing ${source}`);
      continue;
    }
    fs.copyFileSync(src, path.join(featuredDir, featured));
    console.log(`[ok] featured/${featured} ← ${source}`);
  }

  console.log(`\nDone — ${files.length} images synced (df-samsung-340 gallery stays in public/products/)`);
}

main();
