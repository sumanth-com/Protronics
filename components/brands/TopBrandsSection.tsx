"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { SHOWCASE_BRANDS, buildBrandShopPath } from "@/lib/brands";
import { cn } from "@/lib/utils";

export default function TopBrandsSection() {
  return (
    <section id="brands" className="theme-section-c relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-medium tracking-[0.22em] text-white/55"
          >
            Top Brands
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className={cn(
              "mt-3 font-semibold tracking-tight text-white",
              "type-section-title text-[34px] leading-[1.06] sm:text-[44px] sm:leading-[1.04]",
            )}
          >
            Premium Names. Professionally Renewed.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-[14px] leading-7 text-white/70 sm:text-[15px]"
          >
            Shop certified appliances from the brands you trust—restored to
            premium standards.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
        >
          {SHOWCASE_BRANDS.map((brand) => (
            <motion.div key={brand.id} variants={fadeUp}>
              <Link
                href={buildBrandShopPath(brand.name)}
                prefetch
                className={cn(
                  "premium-card group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08]",
                  "bg-white/[0.02] px-4 py-6 text-center",
                  "transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]",
                )}
              >
                <span className="text-[18px] font-semibold tracking-tight text-white transition-transform duration-300 group-hover:scale-105 sm:text-[20px]">
                  {brand.name}
                </span>
                <span className="mt-2 text-[11px] leading-5 text-white/45 transition-colors group-hover:text-white/60">
                  {brand.tagline}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
