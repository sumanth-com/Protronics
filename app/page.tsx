import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSlider from "@/components/hero/HeroSlider";
import CategorySection from "@/components/categories/CategorySection";
import DeferredMount from "@/components/layout/DeferredMount";
import MobileCategoryIcons from "@/components/mobile/MobileCategoryIcons";
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
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials/TestimonialsSection"),
);
const HowItWorks = dynamic(
  () => import("@/components/how-it-works/HowItWorks"),
);
const FAQSection = dynamic(() => import("@/components/faq/FAQSection"));
const MobileWarrantySection = dynamic(
  () => import("@/components/mobile/MobileWarrantySection"),
);

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
        <main className="mobile-home-main">
          <MobileCategoryIcons className="mobile-home-order-categories" />

          <div className="mobile-home-order-hero">
            <HeroSlider />
          </div>

          <CategorySection />

          <DeferredMount minHeight="720px" className="mobile-home-order-featured">
            <FeaturedProducts />
          </DeferredMount>

          <DeferredMount minHeight="480px" className="mobile-home-order-brands">
            <TopBrandsSection />
          </DeferredMount>

          <div className="mobile-home-landing-sections hidden lg:block">
            <DeferredMount minHeight="640px">
              <WhyProtronics />
            </DeferredMount>
            <DeferredMount minHeight="520px">
              <ValueCompareSection />
            </DeferredMount>
          </div>

          <div className="mobile-home-landing-sections hidden lg:block">
            <DeferredMount minHeight="560px">
              <TestimonialsSection />
            </DeferredMount>
            <DeferredMount minHeight="560px">
              <HowItWorks />
            </DeferredMount>
          </div>

          <DeferredMount minHeight="520px" className="mobile-home-order-warranty">
            <MobileWarrantySection />
          </DeferredMount>

          <DeferredMount minHeight="480px" className="mobile-home-order-faq">
            <FAQSection />
          </DeferredMount>
        </main>
      </div>
    </>
  );
}
