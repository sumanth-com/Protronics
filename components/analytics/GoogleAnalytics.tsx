import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  isAnalyticsEnabled,
  isGoogleAdsEnabled,
} from "@/lib/analytics";

/**
 * Loads gtag.js for Google Ads (campaigns) and optional GA4.
 * Ads tag is always on for marketing; GA4 only when measurement ID is set.
 */
export default function GoogleAnalytics() {
  const adsEnabled = isGoogleAdsEnabled();
  const gaEnabled = isAnalyticsEnabled();

  if (!adsEnabled && !gaEnabled) return null;

  const primaryId = adsEnabled ? GOOGLE_ADS_ID : GA_MEASUREMENT_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tags" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${adsEnabled ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
          ${gaEnabled ? `gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });` : ""}
        `}
      </Script>
    </>
  );
}
