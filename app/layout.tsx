import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import HeroNavbar from "@/components/hero/HeroNavbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import AppProviders from "@/components/providers/AppProviders";
import Footer from "@/components/footer/Footer";
import { THEME_BLOCKING_SCRIPT } from "@/lib/theme";
import { SPLASH_BLOCKING_SCRIPT, SPLASH_TAGLINE } from "@/lib/splash";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Premium Refurbished Appliances`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Premium Refurbished Appliances`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Premium Refurbished Appliances`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/logo.webp", type: "image/webp" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logo.webp",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
        {/* Instant splash before JS — shown only when html.splash-active (see lib/splash.ts) */}
        <div id="splash-static" className="splash-screen splash-static" aria-hidden="true">
          <div className="splash-screen-content">
            <div className="splash-reveal-stage">
              <div className="splash-logo-layer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.webp" alt="" width={80} height={80} className="splash-logo-image" />
              </div>
              <div className="splash-fridge-layer" aria-hidden>
                <svg
                  className="splash-fridge-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 6c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
                  <path d="M5 10h14" />
                  <path d="M9 16v-4" />
                  <path d="M15 16v-4" />
                </svg>
              </div>
            </div>
            <p className="splash-tagline">
              <span className="splash-tagline-text">{SPLASH_TAGLINE}</span>
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
