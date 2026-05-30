import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "public", "forms-endpoint.json");

const url = (
  process.env.VITE_FORM_ENDPOINT_URL ||
  process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL ||
  process.env.NEXT_PUBLIC_VITE_FORM_ENDPOINT_URL ||
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
  ""
).trim();

const payload = { url: url || null, generatedAt: new Date().toISOString() };

writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");
console.info(`[forms] Wrote ${outPath}${url ? "" : " (url empty — set env before production deploy)"}`);
