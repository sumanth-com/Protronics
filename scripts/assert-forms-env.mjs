const SCRIPT_RE = /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/;

const url = (
  process.env.VITE_FORM_ENDPOINT_URL ||
  process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL ||
  process.env.NEXT_PUBLIC_VITE_FORM_ENDPOINT_URL ||
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
  ""
).trim();

const isStrict =
  process.env.FORMS_SKIP_ASSERT !== "1" &&
  (process.env.VERCEL === "1" ||
    process.env.NETLIFY === "1" ||
    process.env.CI === "true" ||
    process.env.NODE_ENV === "production");

if (!isStrict) {
  if (!url) {
    console.warn(
      "[forms] No form endpoint URL set. Dev builds OK; set VITE_FORM_ENDPOINT_URL or NEXT_PUBLIC_FORM_ENDPOINT_URL for production.",
    );
  }
  process.exit(0);
}

if (!url) {
  console.error(
    "[forms] BUILD FAILED: Form endpoint URL is required for production.\n" +
      "Set VITE_FORM_ENDPOINT_URL or NEXT_PUBLIC_FORM_ENDPOINT_URL to your Apps Script /exec URL.\n" +
      "Local override: FORMS_SKIP_ASSERT=1 npm run build",
  );
  process.exit(1);
}

if (!SCRIPT_RE.test(url)) {
  console.error(
    `[forms] BUILD FAILED: Invalid endpoint URL.\n` +
      `Expected https://script.google.com/macros/s/.../exec\n` +
      `Got: ${url}`,
  );
  process.exit(1);
}

console.info("[forms] Endpoint URL validated for production build.");
