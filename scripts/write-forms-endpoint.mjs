import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadProjectEnv, projectRoot } from "./load-env.mjs";

loadProjectEnv();

const root = projectRoot;
const outPath = join(root, "public", "forms-endpoint.json");

const SCRIPT_RE = /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/;

const url = (
  process.env.FORM_ENDPOINT_URL ||
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
  process.env.VITE_FORM_ENDPOINT_URL ||
  process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL ||
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
  process.env.NEXT_PUBLIC_VITE_FORM_ENDPOINT_URL ||
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

const resolvedUrl = SCRIPT_RE.test(url) ? url : readExistingUrl();

/**
 * Public JSON must NEVER expose the live webhook URL.
 * Server routes read FORM_ENDPOINT_URL / GOOGLE_SHEETS_WEBHOOK_URL from env.
 */
const payload = {
  url: null,
  configured: Boolean(resolvedUrl),
  generatedAt: new Date().toISOString(),
};

writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");

if (resolvedUrl) {
  console.info(
    `[forms] Wrote ${outPath} (configured=true; webhook kept server-side only)`,
  );
} else {
  console.warn(
    `[forms] Wrote ${outPath} (configured=false — set FORM_ENDPOINT_URL or GOOGLE_SHEETS_WEBHOOK_URL)`,
  );
}
