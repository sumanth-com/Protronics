import type { Metadata } from "next";
import dynamic from "next/dynamic";
import AboutHero from "@/components/about/AboutHero";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/site";
import { aboutPageJsonLd } from "@/lib/about";

const AboutWhyExists = dynamic(
  () => import("@/components/about/AboutWhyExists"),
);
const AboutProcess = dynamic(() => import("@/components/about/AboutProcess"));
const AboutMetrics = dynamic(() => import("@/components/about/AboutMetrics"));
const AboutWarrantySection = dynamic(
  () => import("@/components/about/AboutWarrantySection"),
);
const AboutWhyChoose = dynamic(() => import("@/components/about/AboutWhyChoose"));
const AboutFAQ = dynamic(() => import("@/components/about/AboutFAQ"));
const AboutFinalCTA = dynamic(() => import("@/components/about/AboutFinalCTA"));

const ABOUT_TITLE = "About Protronics | Premium Refurbished Appliances";
const ABOUT_DESCRIPTION =
  "Learn how Protronics restores premium refurbished refrigerators—100+ quality checks, deep sanitization, 1-year warranty, and expert support.";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    type: "website",
    url: absoluteUrl("/about"),
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <div className="about-page min-h-screen bg-black text-white">
        <main>
          <AboutHero />
          <AboutWhyExists />
          <AboutProcess />
          <AboutMetrics />
          <AboutWarrantySection />
          <AboutWhyChoose />
          <AboutFAQ />
          <AboutFinalCTA />
        </main>
      </div>
    </>
  );
}
