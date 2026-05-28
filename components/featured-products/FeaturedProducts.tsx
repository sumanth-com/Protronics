"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";
import ProductCard, {
  type FeaturedProduct,
} from "@/components/featured-products/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  const products = useMemo<FeaturedProduct[]>(
    () => [
      {
        name: "Protronics Premium Renewed — Frost Free 320L",
        image: "/featured/featured-1.jpg",
        price: 21999,
        originalPrice: 29999,
        condition: "Certified Premium",
        warranty: "1-Year Warranty Included",
        tags: ["Most Popular"],
        specs: ["Frost Free", "320L", "Inverter Compressor", "Energy Efficient"],
        href: "#shop",
      },
      {
        name: "Protronics Studio Series — Double Door 340L",
        image: "/featured/featured-2.jpg",
        price: 23999,
        originalPrice: 31999,
        condition: "Like New",
        warranty: "1-Year Warranty Included",
        tags: ["Best Seller"],
        specs: ["Frost Free", "340L", "Low Noise", "Stabilizer Free"],
        href: "#shop",
      },
      {
        name: "Protronics Modern Home — Inverter 300L",
        image: "/featured/featured-3.jpg",
        price: 19999,
        originalPrice: 27999,
        condition: "Excellent",
        warranty: "1-Year Warranty Included",
        tags: ["Certified Premium"],
        specs: ["Inverter Compressor", "300L", "Faster Cooling", "Energy Saver"],
        href: "#shop",
      },
      {
        name: "Protronics Compact Luxe — Mini 190L",
        image: "/featured/featured-4.jpg",
        price: 14999,
        originalPrice: 19999,
        condition: "Like New",
        warranty: "Warranty Included",
        specs: ["190L", "Quick Chill", "Low Power", "Space Optimized"],
        href: "#shop",
      },
      {
        name: "Protronics Family Edition — 360L Convertible",
        image: "/featured/featured-5.jpg",
        price: 26999,
        originalPrice: 34999,
        condition: "Certified Premium",
        warranty: "1-Year Warranty Included",
        specs: ["Convertible Mode", "360L", "Power Cool", "Eco Mode"],
        href: "#shop",
      },
      {
        name: "Protronics Signature — Premium Finish 330L",
        image: "/featured/featured-6.jpg",
        price: 24999,
        originalPrice: 32999,
        condition: "Excellent",
        warranty: "1-Year Warranty Included",
        specs: ["Frost Free", "330L", "Deodorizer", "Smart Shelves"],
        href: "#shop",
      },
    ],
    [],
  );

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        glow,
        { y: -10 },
        {
          y: 18,
          ease: "none",
          scrollTrigger: {
            trigger: glow,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, glow);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">
      {/* Seamless continuation (no hard break) */}
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_620px_at_50%_-10%,rgba(255,90,85,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_620px_at_15%_40%,rgba(255,255,255,0.06),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
        <div
          ref={glowRef}
          className="absolute right-[-160px] top-20 h-[520px] w-[520px] rounded-full bg-[#ff5a55]/[0.08] blur-3xl"
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
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
            Featured Collection
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className={cn(
              "mt-3 text-center font-semibold tracking-tight text-white",
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
            engineered to feel brand new. Minimal details, maximum desire.
          </motion.p>
        </motion.div>

        <div className="mt-10 sm:mt-12">
          {/* Desktop: curated grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
            className="hidden grid-cols-2 gap-5 md:grid lg:grid-cols-3"
          >
            {products.map((p) => (
              <motion.div key={p.name} variants={fadeUp} className="h-full">
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: luxury slider */}
          <div className="md:hidden">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
              className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex snap-x snap-mandatory gap-4">
                {products.map((p) => (
                  <motion.div
                    key={p.name}
                    variants={fadeUp}
                    className="w-[88%] shrink-0 snap-start"
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

