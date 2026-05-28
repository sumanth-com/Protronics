import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import HeroSection from "@/components/hero/HeroSection";
import TrustBadges from "@/components/hero/TrustBadges";
import CategorySection from "@/components/categories/CategorySection";
import WhyProtronics from "@/components/why-protronics/WhyProtronics";
import FeaturedProducts from "@/components/featured-products/FeaturedProducts";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <Topbar />
      <Navbar />
      <main>
        <HeroSection />
        <TrustBadges />
        <CategorySection />
        <WhyProtronics />
        <FeaturedProducts />
      </main>
    </div>
  );
}
