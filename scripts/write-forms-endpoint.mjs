import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadProjectEnv, projectRoot } from "./load-env.mjs";

loadProjectEnv();

const root = projectRoot;
const outPath = join(root, "public", "forms-endpoint.json");

const SCRIPT_RE = /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/;

const url = (
  process.env.VITE_FORM_ENDPOINT_URL ||
  process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL ||
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
  process.env.NEXT_PUBLIC_VITE_FORM_ENDPOINT_URL ||
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
  ""
).trim();

function readExistingUrl() {
  if (!existsSync(outPath)) return "";
  try {
    const json = JSON.parse(readFileSync(outPath, "utf8"));
    const existing = String(json.url ?? "").trim();
    return SCRIPT_RE.test(existing) ? existing : "";
  } catch {
    return "";
  }
}

const resolvedUrl = url || readExistingUrl();
const payload = {
  url: resolvedUrl || null,
  generatedAt: new Date().toISOString(),
};

writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");

if (resolvedUrl) {
  console.info(`[forms] Wrote ${outPath}`);
} else {
  console.warn(
    `[forms] Wrote ${outPath} (url empty — set NEXT_PUBLIC_FORM_ENDPOINT in .env or Vercel)`,
  );
}

