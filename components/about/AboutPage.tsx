"use client";

import dynamic from "next/dynamic";
import AboutHero from "@/components/about/AboutHero";
import DeferredMount from "@/components/layout/DeferredMount";

const AboutWhyExists = dynamic(
  () => import("@/components/about/AboutWhyExists"),
);
const AboutPromise = dynamic(() => import("@/components/about/AboutPromise"));
const AboutMetrics = dynamic(() => import("@/components/about/AboutMetrics"));

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <DeferredMount minHeight="420px">
        <AboutWhyExists />
      </DeferredMount>
      <DeferredMount minHeight="560px">
        <AboutPromise />
      </DeferredMount>
      <DeferredMount minHeight="360px">
        <AboutMetrics />
      </DeferredMount>
    </main>
  );
}
