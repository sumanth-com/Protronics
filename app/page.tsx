import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSlider from "@/components/hero/HeroSlider";
import CategorySection from "@/components/categories/CategorySection";
import DeferredMount from "@/components/layout/DeferredMount";
import MobileCategoryIcons from "@/components/mobile/MobileCategoryIcons";
import { buildFaqJsonLd, HOMEPAGE_FAQS } from "@/lib/faq";
import { buildPageMetadata, PAGE_SEO } from "@/lib/seo";

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
const MobileTestimonialsMarquee = dynamic(
  () => import("@/components/testimonials/MobileTestimonialsMarquee"),
);

export const metadata: Metadata = buildPageMetadata({
  absoluteTitle: PAGE_SEO.home.absoluteTitle,
  description: PAGE_SEO.home.description,
  path: PAGE_SEO.home.path,
  keywords: PAGE_SEO.home.keywords ? [...PAGE_SEO.home.keywords] : undefined,
});

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
          <HeroSlider />
          <CategorySection />
          <DeferredMount minHeight="520px" className="mobile-home-order-featured">
            <FeaturedProducts />
          </DeferredMount>
          <DeferredMount minHeight="360px" className="mobile-home-order-brands">
            <TopBrandsSection />
          </DeferredMount>
          <DeferredMount minHeight="400px" className="mobile-home-order-why">
            <WhyProtronics />
          </DeferredMount>
          <DeferredMount minHeight="320px" className="mobile-home-order-compare">
            <ValueCompareSection />
          </DeferredMount>
          <DeferredMount minHeight="380px" className="mobile-home-order-testimonials">
            <TestimonialsSection />
            <MobileTestimonialsMarquee />
          </DeferredMount>
          <DeferredMount minHeight="420px" className="mobile-home-order-how">
            <HowItWorks />
          </DeferredMount>
          <DeferredMount minHeight="480px" className="mobile-home-order-faq">
            <FAQSection />
          </DeferredMount>
        </main>
      </div>
    </>
  );
}
