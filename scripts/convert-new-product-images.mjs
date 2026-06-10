/**
 * Converts new product JPEGs (6, 7, 8 series) → WebP in assets + public.
 * Run: node scripts/convert-new-product-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assetsSrc = path.join(root, "assets");
const QUALITY = 92;

const JOBS = [
  {
    src: "6 (1).jpeg",
    assetsDir: "images/refrigerators",
    out: "lg-single-door-190l.webp",
  },
  {
    src: "6 (2).jpeg",
    assetsDir: "images/refrigerators",
    out: "lg-single-door-190l-2.webp",
  },
  {
    src: "6 (3).jpeg",
    assetsDir: "images/refrigerators",
    out: "lg-single-door-190l-3.webp",
  },
  {
    src: "6 (4).jpeg",
    assetsDir: "images/refrigerators",
    out: "lg-single-door-190l-4.webp",
  },
  {
    src: "7 (1).jpeg",
    assetsDir: "images/washing-machines",
    out: "samsung-wm-7kg.webp",
  },
  {
    src: "7 (2).jpeg",
    assetsDir: "images/washing-machines",
    out: "samsung-wm-7kg-2.webp",
  },
  {
    src: "7 (3).jpeg",
    assetsDir: "images/washing-machines",
    out: "samsung-wm-7kg-3.webp",
  },
  {
    src: "7 (4).jpeg",
    assetsDir: "images/washing-machines",
    out: "samsung-wm-7kg-4.webp",
  },
  {
    src: "7 (5).jpeg",
    assetsDir: "images/washing-machines",
    out: "samsung-wm-7kg-5.webp",
  },
  {
    src: "8 (1).jpeg",
    assetsDir: "images/washing-machines",
    out: "ifb-wm-6kg.webp",
  },
  {
    src: "8 (2).jpeg",
    assetsDir: "images/washing-machines",
    out: "ifb-wm-6kg-2.webp",
  },
  {
    src: "8 (3).jpeg",
    assetsDir: "images/washing-machines",
    out: "ifb-wm-6kg-3.webp",
  },
  {
    src: "8 (4).jpeg",
    assetsDir: "images/washing-machines",
    out: "ifb-wm-6kg-4.webp",
  },
  {
    src: "8 (5).jpeg",
    assetsDir: "images/washing-machines",
    out: "ifb-wm-6kg-5.webp",
  },
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
