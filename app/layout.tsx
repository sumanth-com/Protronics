import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import HeroNavbar from "@/components/hero/HeroNavbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import AppProviders from "@/components/providers/AppProviders";
import Footer from "@/components/footer/Footer";
import GlobalJsonLd from "@/components/seo/GlobalJsonLd";
import { THEME_BLOCKING_SCRIPT } from "@/lib/theme";
import { SPLASH_BLOCKING_SCRIPT } from "@/lib/splash";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { buildRootMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/logo.webp" as="image" type="image/webp" />
        <script dangerouslySetInnerHTML={{ __html: THEME_BLOCKING_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: SPLASH_BLOCKING_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-theme-bg text-theme-fg overflow-x-hidden has-mobile-bottom-nav">
        <GoogleAnalytics />
        <GlobalJsonLd />
        {/* Instant splash before JS — shown only when html.splash-active (see lib/splash.ts) */}
        <div id="splash-static" className="splash-screen splash-static" aria-hidden="true">
          <div className="splash-ambient" aria-hidden>
            <span className="splash-orb splash-orb--a" />
            <span className="splash-orb splash-orb--b" />
            <span className="splash-orb splash-orb--c" />
            <span className="splash-shimmer" />
          </div>
          <div className="splash-screen-content">
            <div className="splash-reveal-stage">
              <span className="splash-logo-ring" aria-hidden />
              <span className="splash-logo-glow" aria-hidden />
              <div className="splash-logo-layer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.webp"
                  alt="Protronics logo"
                  width={80}
                  height={80}
                  className="splash-logo-image"
                />
              </div>
              <div className="splash-fridge-layer" aria-hidden>
                <svg
                  className="splash-fridge-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56 72"
                  fill="none"
                  aria-hidden
                >
                  <rect
                    x="9"
                    y="3"
                    width="38"
                    height="66"
                    rx="4"
                    fill="#ebe4db"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                  <rect
                    x="11.5"
                    y="6"
                    width="33"
                    height="21"
                    rx="2"
                    fill="#ffffff"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                  <rect
                    x="11.5"
                    y="29.5"
                    width="33"
                    height="35.5"
                    rx="2"
                    fill="#ffffff"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                  <line
                    x1="11.5"
                    y1="28"
                    x2="44.5"
                    y2="28"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                  <rect x="40" y="11" width="2.75" height="11" rx="1.25" fill="currentColor" />
                  <rect x="40" y="38" width="2.75" height="15" rx="1.25" fill="currentColor" />
                  <rect
                    x="15"
                    y="58"
                    width="27"
                    height="3.5"
                    rx="1"
                    fill="currentColor"
                    opacity="0.12"
                  />
                  <rect x="13" y="67" width="5.5" height="2.5" rx="1" fill="currentColor" />
                  <rect x="37.5" y="67" width="5.5" height="2.5" rx="1" fill="currentColor" />
                </svg>
              </div>
            </div>
            <p className="splash-tagline">
              <span className="splash-tagline-text">
                <span className="splash-tagline-part" style={{ ["--splash-i" as string]: 0 }}>
                  Premium.
                </span>{" "}
                <span className="splash-tagline-part" style={{ ["--splash-i" as string]: 1 }}>
                  Refurbished.
                </span>{" "}
                <span className="splash-tagline-part" style={{ ["--splash-i" as string]: 2 }}>
                  Perfected.
                </span>
              </span>
            </p>
          </div>
          <div className="splash-progress" aria-hidden>
            <span className="splash-progress-bar" />
          </div>
        </div>
        <AppProviders>
          <div id="site-shell" className="flex min-h-full flex-1 flex-col">
            <HeroNavbar />
            <div className="navbar-spacer" aria-hidden />
            <div className="site-main flex flex-1 flex-col">{children}</div>
            <Footer />
            <MobileBottomNav />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
