import type { Metadata } from "next";
import dynamic from "next/dynamic";
import AboutHero from "@/components/about/AboutHero";
import { aboutPageJsonLd } from "@/lib/about";

const AboutWhyExists = dynamic(
  () => import("@/components/about/AboutWhyExists"),
);
const AboutPromise = dynamic(() => import("@/components/about/AboutPromise"));
const AboutMetrics = dynamic(() => import("@/components/about/AboutMetrics"));

export const metadata: Metadata = {
  title: "About | Premium Refurbished Appliances | Protronics",
  description:
    "Protronics restores premium refurbished refrigerators and appliances through 100+ quality checks, deep sanitization, performance certification, and 1-year warranty support.",
  keywords: [
    "refurbished refrigerators",
    "refurbished appliances",
    "premium refurbished appliances",
    "appliance warranty",
    "appliance restoration",
    "Protronics",
  ],
  openGraph: {
    title: "About Protronics | Premium Refurbished Appliances",
    description:
      "Professionally renewed appliances—rigorous testing, certified performance, and warranty-backed support.",
    type: "website",
  },
};

export default function About() {
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
          <AboutPromise />
          <AboutMetrics />
        </main>
      </div>
    </>
  );
}
