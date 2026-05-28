import HeroSlider from "@/components/hero/HeroSlider";
import CategorySection from "@/components/categories/CategorySection";
import WhyProtronics from "@/components/why-protronics/WhyProtronics";
import FeaturedProducts from "@/components/featured-products/FeaturedProducts";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import LifestyleSection from "@/components/lifestyle/LifestyleSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import WarrantySupport from "@/components/warranty-support/WarrantySupport";
import FAQSection from "@/components/faq/FAQSection";
import FinalCTA from "@/components/final-cta/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <HeroSlider />
        <CategorySection />
        <WhyProtronics />
        <FeaturedProducts />
        <HowItWorks />
        <LifestyleSection />
        <TestimonialsSection />
        <WarrantySupport />
        <FAQSection />
        <FinalCTA />
      </main>
    </div>
  );
}
