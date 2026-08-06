/** GA4 Measurement ID from env (e.g. G-XXXXXXXXXX). */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

/** Google Ads account ID for campaign / conversion tracking. */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "AW-18370858469";

/** Website lead conversion send_to (Ads conversion action). */
export const GOOGLE_ADS_LEAD_CONVERSION_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION?.trim() ||
  "AW-18370858469/ptDuCPGz_NscEOWb9LdE";

export function isAnalyticsEnabled(): boolean {
  return /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID);
}

export function isGoogleAdsEnabled(): boolean {
  return /^AW-\d+$/i.test(GOOGLE_ADS_ID);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire Google Ads “Website lead” conversion after a real form success. */
export function trackGoogleAdsLeadConversion() {
  if (typeof window === "undefined") return;
  if (!isGoogleAdsEnabled()) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_LEAD_CONVERSION_SEND_TO,
  });
}
