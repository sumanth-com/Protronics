import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSlider from "@/components/hero/HeroSlider";
import CategorySection from "@/components/categories/CategorySection";
import DeferredMount from "@/components/layout/DeferredMount";
import { buildFaqJsonLd, HOMEPAGE_FAQS } from "@/lib/faq";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

const FeaturedProducts = dynamic(
  () => import("@/components/featured-products/FeaturedProducts"),
);
const TopBrandsSection = dynamic(
  () => import("@/components/brands/TopBrandsSection"),
);
const WhyProtronics = dynamic(
  () => import("@/components/why-protronics/WhyProtronics"),
);
const ValueCompareSection = dynamic(
  () => import("@/components/compare/ValueCompareSection"),
);
const BestDealsSection = dynamic(
  () => import("@/components/deals/BestDealsSection"),
);
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials/TestimonialsSection"),
);
const HowItWorks = dynamic(
  () => import("@/components/how-it-works/HowItWorks"),
);
const FAQSection = dynamic(() => import("@/components/faq/FAQSection"));

export const metadata: Metadata = {
  title: `${SITE_NAME} | Premium Refurbished Refrigerators & Appliances`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Premium Refurbished Appliances`,
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Premium Refurbished Appliances`,
    description: SITE_DESCRIPTION,
  },
};

export default function Home() {
  const faqJsonLd = buildFaqJsonLd(HOMEPAGE_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <main>
          <HeroSlider />
          <CategorySection />
          <DeferredMount minHeight="720px">
            <FeaturedProducts />
          </DeferredMount>
          <DeferredMount minHeight="480px">
            <TopBrandsSection />
          </DeferredMount>
          <DeferredMount minHeight="640px">
            <WhyProtronics />
          </DeferredMount>
          <DeferredMount minHeight="520px">
            <ValueCompareSection />
          </DeferredMount>
          <DeferredMount minHeight="560px">
            <BestDealsSection />
          </DeferredMount>
          <DeferredMount minHeight="560px">
            <TestimonialsSection />
          </DeferredMount>
          <DeferredMount minHeight="560px">
            <HowItWorks />
          </DeferredMount>
          <DeferredMount minHeight="480px">
            <FAQSection />
          </DeferredMount>
        </main>
      </div>
    </>
  );
}
