import type { Metadata } from "next";
import dynamic from "next/dynamic";
import AboutHero from "@/components/about/AboutHero";
import { aboutPageJsonLd } from "@/lib/about";
import { buildPageMetadata, PAGE_SEO } from "@/lib/seo";

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

export const metadata: Metadata = buildPageMetadata({
  absoluteTitle: PAGE_SEO.about.absoluteTitle,
  description: PAGE_SEO.about.description,
  path: PAGE_SEO.about.path,
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
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
