import type { Metadata } from "next";
import { Geist, Syncopate } from "next/font/google";
import "../styles/globals.css";
import HeroNavbar from "@/components/hero/HeroNavbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import AppProviders from "@/components/providers/AppProviders";
import Footer from "@/components/footer/Footer";
import { THEME_BLOCKING_SCRIPT } from "@/lib/theme";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

/** Navbar wordmark only — bold geometric extended caps */
const navbarBrand = Syncopate({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-navbar-brand",
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
      { url: "/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
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
      className={`${geistSans.variable} ${navbarBrand.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BLOCKING_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-theme-bg text-theme-fg overflow-x-hidden has-mobile-bottom-nav">
        <GoogleAnalytics />
        <AppProviders>
          <HeroNavbar />
          <div className="navbar-spacer" aria-hidden />
          <div className="site-main flex flex-1 flex-col">{children}</div>
          <Footer />
          <MobileBottomNav />
        </AppProviders>
      </body>
    </html>
  );
}
