import dynamic from "next/dynamic";
import HeroSlider from "@/components/hero/HeroSlider";
import CategorySection from "@/components/categories/CategorySection";
import DeferredMount from "@/components/layout/DeferredMount";

const WhyProtronics = dynamic(
  () => import("@/components/why-protronics/WhyProtronics"),
);
const FeaturedProducts = dynamic(
  () => import("@/components/featured-products/FeaturedProducts"),
);
const HowItWorks = dynamic(
  () => import("@/components/how-it-works/HowItWorks"),
);
const LifestyleSection = dynamic(
  () => import("@/components/lifestyle/LifestyleSection"),
);
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials/TestimonialsSection"),
);
const WarrantySupport = dynamic(
  () => import("@/components/warranty-support/WarrantySupport"),
);
const FAQSection = dynamic(() => import("@/components/faq/FAQSection"));
const FinalCTA = dynamic(() => import("@/components/final-cta/FinalCTA"));

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <HeroSlider />
        <CategorySection />
        <DeferredMount minHeight="640px">
          <WhyProtronics />
        </DeferredMount>
        <DeferredMount minHeight="720px">
          <FeaturedProducts />
        </DeferredMount>
        <DeferredMount minHeight="560px">
          <HowItWorks />
        </DeferredMount>
        <DeferredMount minHeight="520px">
          <LifestyleSection />
        </DeferredMount>
        <DeferredMount minHeight="560px">
          <TestimonialsSection />
        </DeferredMount>
        <DeferredMount minHeight="480px">
          <WarrantySupport />
        </DeferredMount>
        <DeferredMount minHeight="480px">
          <FAQSection />
        </DeferredMount>
        <DeferredMount minHeight="420px">
          <FinalCTA />
        </DeferredMount>
      </main>
    </div>
  );
}
