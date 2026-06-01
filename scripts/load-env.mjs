import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const projectRoot = join(__dirname, "..");

/**
 * Load .env files into process.env (same keys Next.js reads at dev/build time).
 * Later files override earlier ones.
 */
export function loadProjectEnv(root = projectRoot) {
  const files = [".env", ".env.local"];

  if (process.env.NODE_ENV === "production") {
    files.push(".env.production", ".env.production.local");
  } else {
    files.push(".env.development", ".env.development.local");
  }

  for (const file of files) {
    loadEnvFile(join(root, file));
  }
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}
