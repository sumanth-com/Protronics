"use client";

import AboutHero from "@/components/about/AboutHero";
import AboutMetrics from "@/components/about/AboutMetrics";
import AboutPromise from "@/components/about/AboutPromise";
import AboutWhyExists from "@/components/about/AboutWhyExists";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutWhyExists />
      <AboutPromise />
      <AboutMetrics />
    </main>
  );
}
