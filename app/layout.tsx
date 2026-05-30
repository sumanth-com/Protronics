import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import RouteScrollReset from "@/components/layout/RouteScrollReset";
import NavPrefetch from "@/components/layout/NavPrefetch";
import HeroNavbar from "@/components/hero/HeroNavbar";
import MotionProvider from "@/components/providers/MotionProvider";
import CompareShell from "@/components/compare/CompareShell";
import Footer from "@/components/footer/Footer";
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
      className={`${geistSans.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black text-white overflow-x-hidden">
        <MotionProvider>
          <SmoothScroll>
            <RouteScrollReset />
            <NavPrefetch />
            <HeroNavbar />
            {/* Spacer for fixed navbar */}
            <div className="h-[60px] sm:h-[64px]" />
            {children}
            <Footer />
            <CompareShell />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
