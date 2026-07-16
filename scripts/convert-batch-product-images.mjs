/**
 * Converts new appliance JPEG batches → WebP in assets + public.
 * Run: node scripts/convert-batch-product-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assetsSrc = path.join(root, "assets");
const QUALITY = 92;

/** @type {{ src: string; assetsDir: string; out: string }[]} */
const JOBS = [
  // LG 190L inverter fridge
  { src: "190 litre LG (1).jpeg", assetsDir: "images/refrigerators", out: "lg-single-door-190l.webp" },
  { src: "190 litre LG (2).jpeg", assetsDir: "images/refrigerators", out: "lg-single-door-190l-2.webp" },
  { src: "190 litre LG (3).jpeg", assetsDir: "images/refrigerators", out: "lg-single-door-190l-3.webp" },
  { src: "190 litre LG (4).jpeg", assetsDir: "images/refrigerators", out: "lg-single-door-190l-4.webp" },
  { src: "190 litre LG (5).jpeg", assetsDir: "images/refrigerators", out: "lg-single-door-190l-5.webp" },

  // Godrej Edge Pro 190L
  { src: "Edge pro 190 (1).jpeg", assetsDir: "images/refrigerators", out: "godrej-edge-pro-190l.webp" },
  { src: "Edge pro 190 (2).jpeg", assetsDir: "images/refrigerators", out: "godrej-edge-pro-190l-2.webp" },
  { src: "Edge pro 190 (3).jpeg", assetsDir: "images/refrigerators", out: "godrej-edge-pro-190l-3.webp" },
  { src: "Edge pro 190 (4).jpeg", assetsDir: "images/refrigerators", out: "godrej-edge-pro-190l-4.webp" },
  { src: "Edge pro 190 (5).jpeg", assetsDir: "images/refrigerators", out: "godrej-edge-pro-190l-5.webp" },

  // Whirlpool Protton triple door 260L
  { src: "Protron triple door (1).jpeg", assetsDir: "images/refrigerators", out: "whirlpool-protton-triple-door-260l.webp" },
  { src: "Protron triple door (2).jpeg", assetsDir: "images/refrigerators", out: "whirlpool-protton-triple-door-260l-2.webp" },
  { src: "Protron triple door (3).jpeg", assetsDir: "images/refrigerators", out: "whirlpool-protton-triple-door-260l-3.webp" },
  { src: "Protron triple door (4).jpeg", assetsDir: "images/refrigerators", out: "whirlpool-protton-triple-door-260l-4.webp" },
  { src: "Protron triple door (5).jpeg", assetsDir: "images/refrigerators", out: "whirlpool-protton-triple-door-260l-5.webp" },

  // LG Turbo Drum 6 kg
  { src: "Lg turbo drum (1).jpeg", assetsDir: "images/washing-machines", out: "lg-turbodrum-6kg.webp" },
  { src: "Lg turbo drum (2).jpeg", assetsDir: "images/washing-machines", out: "lg-turbodrum-6kg-2.webp" },
  { src: "Lg turbo drum (3).jpeg", assetsDir: "images/washing-machines", out: "lg-turbodrum-6kg-3.webp" },
  { src: "Lg turbo drum (4).jpeg", assetsDir: "images/washing-machines", out: "lg-turbodrum-6kg-4.webp" },
  { src: "Lg turbo drum (5).jpeg", assetsDir: "images/washing-machines", out: "lg-turbodrum-6kg-5.webp" },

  // LG Turbo Drum 6.5 kg
  { src: "Lg 6.5 kg turbodrum (1).jpeg", assetsDir: "images/washing-machines", out: "lg-turbodrum-6-5kg.webp" },
  { src: "Lg 6.5 kg turbodrum (2).jpeg", assetsDir: "images/washing-machines", out: "lg-turbodrum-6-5kg-2.webp" },
  { src: "Lg 6.5 kg turbodrum (3).jpeg", assetsDir: "images/washing-machines", out: "lg-turbodrum-6-5kg-3.webp" },
  { src: "Lg 6.5 kg turbodrum (4).jpeg", assetsDir: "images/washing-machines", out: "lg-turbodrum-6-5kg-4.webp" },
  { src: "Lg 6.5 kg turbodrum (5).jpeg", assetsDir: "images/washing-machines", out: "lg-turbodrum-6-5kg-5.webp" },

  // LG Smart Inverter 8 kg
  { src: "Smart inverter 8 kg (1).jpeg", assetsDir: "images/washing-machines", out: "lg-smart-inverter-8kg.webp" },
  { src: "Smart inverter 8 kg (2).jpeg", assetsDir: "images/washing-machines", out: "lg-smart-inverter-8kg-2.webp" },
  { src: "Smart inverter 8 kg (3).jpeg", assetsDir: "images/washing-machines", out: "lg-smart-inverter-8kg-3.webp" },
  { src: "Smart inverter 8 kg (4).jpeg", assetsDir: "images/washing-machines", out: "lg-smart-inverter-8kg-4.webp" },
  { src: "Smart inverter 8 kg (5).jpeg", assetsDir: "images/washing-machines", out: "lg-smart-inverter-8kg-5.webp" },

  // Samsung Wobble Diamond Drum 6.2 kg
  { src: "Wobble diamond drum (1).jpeg", assetsDir: "images/washing-machines", out: "samsung-wobble-diamond-6-2kg.webp" },
  { src: "Wobble diamond drum (2).jpeg", assetsDir: "images/washing-machines", out: "samsung-wobble-diamond-6-2kg-2.webp" },
  { src: "Wobble diamond drum (3).jpeg", assetsDir: "images/washing-machines", out: "samsung-wobble-diamond-6-2kg-3.webp" },
  { src: "Wobble diamond drum (4).jpeg", assetsDir: "images/washing-machines", out: "samsung-wobble-diamond-6-2kg-4.webp" },
  { src: "Wobble diamond drum (5).jpeg", assetsDir: "images/washing-machines", out: "samsung-wobble-diamond-6-2kg-5.webp" },

  // Samsung Digital Inverter 7 kg
  { src: "Digital inverter 7 kg (1).jpeg", assetsDir: "images/washing-machines", out: "samsung-wm-7kg.webp" },
  { src: "Digital inverter 7 kg (2).jpeg", assetsDir: "images/washing-machines", out: "samsung-wm-7kg-2.webp" },
  { src: "Digital inverter 7 kg (3).jpeg", assetsDir: "images/washing-machines", out: "samsung-wm-7kg-3.webp" },
  { src: "Digital inverter 7 kg (4).jpeg", assetsDir: "images/washing-machines", out: "samsung-wm-7kg-4.webp" },
  { src: "Digital inverter 7 kg (5).jpeg", assetsDir: "images/washing-machines", out: "samsung-wm-7kg-5.webp" },
];

async function convertOne({ src, assetsDir, out }) {
  const input = path.join(assetsSrc, src);
  if (!fs.existsSync(input)) {
    throw new Error(`Missing source: ${input}`);
  }

  const assetsOutDir = path.join(root, "assets", assetsDir);
  const publicOutDir = path.join(root, "public", assetsDir);
  fs.mkdirSync(assetsOutDir, { recursive: true });
  fs.mkdirSync(publicOutDir, { recursive: true });

  const assetPath = path.join(assetsOutDir, out);
  const publicPath = path.join(publicOutDir, out);

  const meta = await sharp(input).metadata();
  await sharp(input).webp({ quality: QUALITY, effort: 4 }).toFile(assetPath);
  fs.copyFileSync(assetPath, publicPath);

  const kb = Math.round(fs.statSync(assetPath).size / 1024);
  console.log(`[ok] ${src} → ${assetsDir}/${out} (${meta.width}×${meta.height}, ${kb}KB)`);
}

async function main() {
  for (const job of JOBS) {
    await convertOne(job);
  }
  console.log(`\nDone — ${JOBS.length} WebP files written.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
