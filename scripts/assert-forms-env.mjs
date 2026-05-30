const SCRIPT_RE = /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/;

const url = (
  process.env.VITE_FORM_ENDPOINT_URL ||
  process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL ||
  process.env.NEXT_PUBLIC_VITE_FORM_ENDPOINT_URL ||
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
  ""
).trim();

const skipAssert = process.env.FORMS_SKIP_ASSERT === "1";
const requireEndpoint = process.env.FORMS_REQUIRE_ENDPOINT === "1";
const isDeploy =
  process.env.VERCEL === "1" ||
  process.env.NETLIFY === "1" ||
  process.env.CI === "true" ||
  process.env.NODE_ENV === "production";

if (skipAssert) {
  process.exit(0);
}

if (!url) {
  const message =
    "[forms] No form endpoint URL set. Forms will not submit until you set " +
    "VITE_FORM_ENDPOINT_URL or NEXT_PUBLIC_FORM_ENDPOINT_URL (Apps Script /exec URL).";

  if (requireEndpoint) {
    console.error(
      `[forms] BUILD FAILED: ${message}\n` +
        "Unset FORMS_REQUIRE_ENDPOINT or provide the URL to continue.",
    );
    process.exit(1);
  }

  console.warn(`${message}${isDeploy ? " (deploy will continue; add the env var in Vercel/Netlify.)" : ""}`);
  process.exit(0);
}

if (!SCRIPT_RE.test(url)) {
  const message =
    `Invalid form endpoint URL (expected https://script.google.com/macros/s/.../exec). Got: ${url}`;

  if (requireEndpoint) {
    console.error(`[forms] BUILD FAILED: ${message}`);
    process.exit(1);
  }

  console.warn(
    `[forms] ${message}\n` +
      "Fix NEXT_PUBLIC_FORM_ENDPOINT_URL in Vercel → Settings → Environment Variables. " +
      "Build will continue; forms will not submit until the URL is valid.",
  );
  process.exit(0);
}

console.info("[forms] Endpoint URL validated for production build.");
