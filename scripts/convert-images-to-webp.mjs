/**
 * Converts PNG/JPEG under assets/ and public/ to WebP.
 * Run: node scripts/convert-images-to-webp.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const SKIP_DIRS = new Set(["node_modules", ".next", "node_modules/.cache"]);
const KEEP_PNG = new Set([
  path.join(root, "app", "icon.png"),
  path.join(root, "app", "apple-icon.png"),
]);

const QUALITY = 88;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.basename(dir);
    if (SKIP_DIRS.has(name) || SKIP_DIRS.has(rel)) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/\.(png|jpe?g)$/i.test(name)) files.push(full);
  }
  return files;
}

function webpOutPath(file) {
  const dir = path.dirname(file);
  const base = path.basename(file).replace(/\.(png|jpe?g)$/i, "");
  // mb (1).png → mb-1.webp (matches lib/hero-slides.ts imports)
  const mbMatch = base.match(/^mb\s*\((\d+)\)$/i);
  const safe = mbMatch ? `mb-${mbMatch[1]}` : base.replace(/\s+/g, "-").replace(/[()]/g, "");
  return path.join(dir, `${safe}.webp`);
}

async function convert(file) {
  if (KEEP_PNG.has(file)) {
    console.info(`[skip] ${path.relative(root, file)} (app icon)`);
    return null;
  }
  const out = webpOutPath(file);
  await sharp(file)
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(out);
  const before = fs.statSync(file).size;
  const after = fs.statSync(out).size;
  console.info(
    `[ok] ${path.relative(root, file)} → ${path.relative(root, out)} (${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB)`,
  );
  return { file, out };
}

const targets = [path.join(root, "assets"), path.join(root, "public")];
const all = targets.flatMap((d) => walk(d));

console.info(`Converting ${all.length} images to WebP…\n`);

const results = [];
for (const file of all) {
  try {
    const r = await convert(file);
    if (r) results.push(r);
  } catch (err) {
    console.error(`[fail] ${file}:`, err.message);
  }
}

console.info(`\nDone: ${results.length} WebP files written.`);
