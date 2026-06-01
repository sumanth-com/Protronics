/**
 * Generate favicons + default OG image from public/logo.webp
 * Run: node scripts/generate-favicons.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const logoPath = join(root, "public", "logo.webp");
const ogDir = join(root, "public", "og");

const sizes = [
  { name: "favicon-16x16.png", size: 16, out: join(root, "public", "favicon-16x16.png") },
  { name: "favicon-32x32.png", size: 32, out: join(root, "public", "favicon-32x32.png") },
  { name: "apple-touch-icon.png", size: 180, out: join(root, "public", "apple-touch-icon.png") },
  { name: "app/icon.png", size: 32, out: join(root, "app", "icon.png") },
  { name: "app/apple-icon.png", size: 180, out: join(root, "app", "apple-icon.png") },
];

async function main() {
  const logo = await readFile(logoPath);
  await mkdir(ogDir, { recursive: true });

  for (const { size, out } of sizes) {
    const buf = await sharp(logo)
      .resize(size, size, { fit: "contain", background: { r: 10, g: 10, b: 10, alpha: 1 } })
      .png()
      .toBuffer();
    await writeFile(out, buf);
    console.info(`Wrote ${out}`);
  }

  const favicon32 = await sharp(logo)
    .resize(32, 32, { fit: "contain", background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .png()
    .toBuffer();
  await writeFile(join(root, "public", "favicon.ico"), favicon32);
  await writeFile(join(root, "app", "favicon.ico"), favicon32);
  console.info("Wrote favicon.ico (32px PNG format)");

  const ogWidth = 1200;
  const ogHeight = 630;
  const logoOg = await sharp(logo).resize(280, 280, { fit: "contain" }).png().toBuffer();

  const og = await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 3,
      background: { r: 14, g: 14, b: 14 },
    },
  })
    .composite([
      { input: logoOg, top: Math.round((ogHeight - 280) / 2) - 40, left: Math.round((ogWidth - 280) / 2) },
    ])
    .webp({ quality: 88 })
    .toBuffer();

  await writeFile(join(ogDir, "protronics-og.webp"), og);
  console.info("Wrote public/og/protronics-og.webp");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
