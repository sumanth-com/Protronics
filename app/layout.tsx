import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import HeroNavbar from "@/components/hero/HeroNavbar";
import MotionProvider from "@/components/providers/MotionProvider";
import CompareShell from "@/components/compare/CompareShell";

const Footer = dynamic(() => import("@/components/footer/Footer"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Protronics",
  description:
    "Refurbished refrigerators with premium performance and peace of mind.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://protronics.in",
  ),
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
