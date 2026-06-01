/**
 * Converts assets/pp1–pp12.png → assets/images/refrigerators/*.webp
 * and mirrors to public/images/refrigerators/ for Next.js static URLs.
 * Run: node scripts/convert-refrigerator-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assetsOut = path.join(root, "assets", "images", "refrigerators");
const publicOut = path.join(root, "public", "images", "refrigerators");
const assetsSrc = path.join(root, "assets");

const QUALITY = 92;

/** ppN.png → output filename */
const MAPPING = [
  ["pp1.png", "lg-smart-inverter-single-door-320l.webp"],
  ["pp2.png", "godrej-edge-pro-single-door-240l.webp"],
  ["pp3.png", "samsung-digital-inverter-double-door-340l.webp"],
  ["pp4.png", "whirlpool-protton-convertible-360l.webp"],
  ["pp5.png", "haier-bottom-mount-frost-free-300l.webp"],
  ["pp6.png", "haier-compact-mini-fridge-190l.webp"],
  ["pp7.png", "lg-direct-cool-mini-170l.webp"],
  ["pp8.png", "samsung-family-hub-side-by-side-580l.webp"],
  ["pp9.png", "lg-instaview-french-door-650l.webp"],
  ["pp10.png", "whirlpool-commercial-cooler-850l.webp"],
  ["pp11.png", "haier-display-refrigerator-720l.webp"],
  ["pp12.png", "samsung-single-door-280l.webp"],
];

async function convertOne(srcFile, outName) {
  const src = path.join(assetsSrc, srcFile);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source: ${src}`);
  }
  const meta = await sharp(src).metadata();
  const assetPath = path.join(assetsOut, outName);
  const publicPath = path.join(publicOut, outName);

  await sharp(src).webp({ quality: QUALITY, effort: 4 }).toFile(assetPath);
  fs.copyFileSync(assetPath, publicPath);

  const kb = Math.round(fs.statSync(assetPath).size / 1024);
  console.log(
    `[ok] ${srcFile} → ${outName} (${meta.width}×${meta.height}, ${kb}KB)`,
  );
  return { outName, width: meta.width, height: meta.height };
}

async function main() {
  fs.mkdirSync(assetsOut, { recursive: true });
  fs.mkdirSync(publicOut, { recursive: true });

  const results = [];
  for (const [src, out] of MAPPING) {
    results.push(await convertOne(src, out));
  }

  for (const [src] of MAPPING) {
    const full = path.join(assetsSrc, src);
    if (fs.existsSync(full)) {
      fs.unlinkSync(full);
      console.log(`[del] assets/${src}`);
    }
  }

  console.log(`\nDone — ${results.length} WebP files in assets/images/refrigerators/ and public/images/refrigerators/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
