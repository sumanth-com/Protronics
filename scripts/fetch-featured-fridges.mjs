/**
 * Downloads refrigerator-only product images into public/featured/.
 * Run: node scripts/fetch-featured-fridges.mjs
 */
import fs from "node:fs";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "featured");

/** Verified appliance / refrigerator shots — not room interiors */
const FRIDGE_SOURCES = [
  {
    file: "featured-1.webp",
    url: "https://images.unsplash.com/photo-1585338667391-5b279a0c5eb8?auto=format&fit=crop&w=1000&h=1000&q=85",
    label: "white refrigerator",
  },
  {
    file: "featured-2.webp",
    url: "https://images.unsplash.com/photo-1623092242739-5a382879cec9?auto=format&fit=crop&w=1000&h=1000&q=85",
    label: "stainless refrigerator",
  },
  {
    file: "featured-3.webp",
    url: "https://images.unsplash.com/photo-1751831402956-4e5e45f56ba7?auto=format&fit=crop&w=1000&h=1000&q=85",
    label: "refrigerator stocked",
  },
  {
    file: "featured-4.webp",
    url: "https://images.unsplash.com/photo-1771627278721-c0dae3183543?auto=format&fit=crop&w=1000&h=1000&q=85",
    label: "refrigerator unit",
  },
  {
    file: "featured-5.webp",
    url: "https://images.unsplash.com/photo-1722942624429-4e179ed18ec6?auto=format&fit=crop&w=1000&h=1000&q=85",
    label: "modern refrigerator",
  },
  {
    file: "featured-6.webp",
    url: "https://images.unsplash.com/photo-1667404202905-4335b5370d96?auto=format&fit=crop&w=1000&h=1000&q=85",
    label: "premium refrigerator",
  },
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function main() {
  for (const { file, url, label } of FRIDGE_SOURCES) {
    const buf = await fetchBuffer(url);
    const out = path.join(outDir, file);
    await sharp(buf)
      .resize(1000, 1000, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255 },
      })
      .webp({ quality: 90, effort: 4 })
      .toFile(out);
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`[ok] ${file} ← ${label} (${kb}KB)`);
  }
  console.log("\nDone — 6 refrigerator images in public/featured/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
