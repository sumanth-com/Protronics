/** Single production canonical origin (www). */
export const CANONICAL_SITE_URL = "https://www.protronics.store";

export const APEX_HOSTNAME = "protronics.store";
export const WWW_HOSTNAME = "www.protronics.store";

/**
 * Normalize any site URL to the canonical production host when the apex
 * domain is used. Preserves localhost / preview hosts for local and Vercel
 * preview deployments.
 */
export function normalizeSiteUrl(raw?: string | null): string {
  const trimmed = (raw ?? "").trim().replace(/\/+$/, "");
  if (!trimmed) return CANONICAL_SITE_URL;

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const url = new URL(withProtocol);
    const host = url.hostname.toLowerCase();

    if (host === "localhost" || host === "127.0.0.1") {
      return url.origin;
    }

    if (host === APEX_HOSTNAME || host === WWW_HOSTNAME) {
      url.protocol = "https:";
      url.hostname = WWW_HOSTNAME;
      url.port = "";
      return url.origin;
    }

    // Vercel preview / other hosts — keep as provided (https preferred).
    if (url.protocol === "http:" && host.endsWith(".vercel.app")) {
      url.protocol = "https:";
    }
    return url.origin;
  } catch {
    return CANONICAL_SITE_URL;
  }
}
