"use client";

import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { buildProductPath } from "@/lib/product-detail";
import { SHOP_PRODUCTS } from "@/lib/shop";
import { cn } from "@/lib/utils";
import ProductCard, {
  type FeaturedProduct,
} from "@/components/featured-products/ProductCard";
import MarketplaceProductCard from "@/components/featured-products/MarketplaceProductCard";

export default function FeaturedProducts() {
  const products = useMemo<FeaturedProduct[]>(
    () =>
      [...SHOP_PRODUCTS]
        .sort((a, b) => a.salesRank - b.salesRank)
        .slice(0, 6)
        .map((p) => ({
          name: p.name,
          image: p.image,
          price: p.price,
          originalPrice: p.originalPrice,
          condition: p.condition,
          warranty: "1-Year Warranty Included" as const,
          tags: p.tag ? [p.tag === "New" ? "Certified Premium" as const : p.tag] : undefined,
          specs: p.specs,
          href: buildProductPath(p.id),
        })),
    [],
  );

  const mobileProducts = useMemo(
    () =>
      products.slice(0, 6).map((p, i) => ({
        ...p,
        warranty: "1Y Warranty",
        rating: 4.8 - (i % 3) * 0.1,
      })),
    [products],
  );

  return (
    <section id="featured" className="theme-section-b relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1)))] lg:block" />

      {/* Mobile marketplace section */}
      <div className="mobile-section mobile-featured-section lg:hidden">
        <div className="mobile-section-head mobile-featured-head">
          <div>
            <p className="mobile-section-eyebrow">Featured</p>
            <h2 className="mobile-section-title">Top picks for you</h2>
          </div>
        </div>
        <div className="mobile-product-grid mt-3">
          {mobileProducts.map((p) => (
            <MarketplaceProductCard key={p.name} product={p} />
          ))}
        </div>
        <CtaButton href="/shop" fullWidth className="mt-3.5" aria-label="Shop all refurbished appliances">
          Shop All Products
          <ArrowUpRight className="h-4 w-4" />
        </CtaButton>
      </div>

      {/* Desktop — unchanged */}
      <div className="relative mx-auto hidden w-full max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:block">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
          className="mx-auto flex max-w-3xl flex-col items-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-center text-[12px] font-medium tracking-[0.22em] text-white/55"
          >
            Featured Products
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className={cn(
              "type-section-title mt-3 text-center font-semibold tracking-tight text-white",
              "text-[34px] leading-[1.06]",
              "sm:text-[44px] sm:leading-[1.04]",
            )}
          >
            Curated Premium Appliances
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-center text-[14px] leading-7 text-white/70 sm:text-[15px]"
          >
            Handpicked premium renewed refrigerators—studio-lit, verified, and
            engineered to feel brand new.
          </motion.p>
        </motion.div>

        <div className="mt-10 sm:mt-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
            className="grid grid-cols-2 gap-5 md:grid lg:grid-cols-3"
          >
            {products.map((p) => (
              <motion.div key={p.name} variants={fadeUp} className="h-full">
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-10 flex justify-center sm:mt-12"
        >
          <CtaButton href="/shop" size="lg" aria-label="Shop all refurbished appliances">
            Shop All Products
            <ArrowUpRight className="h-4 w-4 text-black/80" />
          </CtaButton>
        </motion.div>
      </div>
    </section>
  );
}
