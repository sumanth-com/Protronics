"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, Sparkles, TrendingUp } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { buildProductPath } from "@/lib/product-detail";
import { SHOP_PRODUCTS, type ShopProduct } from "@/lib/shop";
import { cn } from "@/lib/utils";
import { IMAGE_QUALITY } from "@/lib/images";

type DealTab = "limited" | "value" | "popular" | "recent";

const TABS: { id: DealTab; label: string; icon: typeof Flame }[] = [
  { id: "limited", label: "Limited Deals", icon: Clock },
  { id: "value", label: "Best Value", icon: Sparkles },
  { id: "popular", label: "Most Popular", icon: TrendingUp },
  { id: "recent", label: "Recently Added", icon: Flame },
];

function getDealsForTab(tab: DealTab): ShopProduct[] {
  switch (tab) {
    case "limited":
      return [...SHOP_PRODUCTS]
        .sort((a, b) => b.originalPrice - b.price - (a.originalPrice - a.price))
        .slice(0, 4);
    case "value":
      return [...SHOP_PRODUCTS]
        .sort(
          (a, b) =>
            (b.originalPrice - b.price) / b.originalPrice -
            (a.originalPrice - a.price) / a.originalPrice,
        )
        .slice(0, 4);
    case "popular":
      return [...SHOP_PRODUCTS]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 4);
    case "recent":
      return [...SHOP_PRODUCTS]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 4);
  }
}

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function BestDealsSection() {
  const [activeTab, setActiveTab] = useState<DealTab>("limited");
  const deals = useMemo(() => getDealsForTab(activeTab), [activeTab]);

  return (
    <section id="deals" className="theme-section-c relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-16 hidden h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))] lg:block" />

      <div className="relative mx-auto w-full max-w-7xl px-3 pt-6 pb-8 sm:px-6 sm:pt-10 sm:pb-12 lg:px-4 lg:pt-14 lg:pb-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-[12px] font-medium tracking-[0.22em] text-white/55"
            >
              Best Deals
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className={cn(
                "mt-2 font-semibold tracking-tight text-white sm:mt-3",
                "text-[22px] leading-[1.08] sm:type-section-title sm:text-[44px] sm:leading-[1.04]",
              )}
            >
              Shop Best Deals
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-2 text-[13px] leading-6 text-white/65 sm:mt-3 sm:text-[15px]"
            >
              Discounted refurbished appliances—tap any product to view and buy.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="best-deals-tabs -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:pb-0"
            role="tablist"
            aria-label="Deal categories"
            data-lenis-prevent
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "deals-tab inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-300 sm:px-3.5 sm:py-2 sm:text-[12px]",
                    active
                      ? "deals-tab-active bg-theme-accent text-theme-accent-fg shadow-theme-sm"
                      : "border border-white/10 text-white/60 hover:border-white/20 hover:text-white",
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="best-deals-grid mt-6 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4 lg:grid-cols-4"
            role="tabpanel"
          >
            {deals.map((product) => {
              const savings = product.originalPrice - product.price;
              const savingsPct = Math.round(
                (savings / product.originalPrice) * 100,
              );

              return (
                <Link
                  key={product.id}
                  href={buildProductPath(product.id)}
                  prefetch
                  className={cn(
                    "best-deals-card premium-card group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] sm:rounded-2xl",
                    "transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]",
                  )}
                >
                  <div className="relative aspect-square overflow-hidden bg-white/[0.03] sm:aspect-[4/3]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03] sm:object-cover sm:p-0"
                      quality={IMAGE_QUALITY.card}
                    />
                    {savingsPct > 0 && (
                      <span className="deals-save-pill absolute left-2 top-2 z-[1] text-[10px] sm:left-3 sm:top-3 sm:text-[11px]">
                        {savingsPct}% off
                      </span>
                    )}
                  </div>
                  <div className="p-2.5 sm:p-4">
                    <p className="hidden text-[11px] font-medium text-white/45 sm:block">
                      {product.brand}
                    </p>
                    <h3 className="line-clamp-2 text-[12px] font-semibold leading-snug text-white sm:mt-1 sm:text-[14px]">
                      {product.name}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-baseline gap-1 sm:mt-3 sm:gap-2">
                      <span className="text-[13px] font-semibold text-white sm:text-[16px]">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[10px] text-white/40 line-through sm:text-[12px]">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>
                    <span className="best-deals-view mt-2 hidden w-full rounded-md border border-white/10 py-1.5 text-center text-[11px] font-semibold text-white/80 sm:inline-block">
                      View
                    </span>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
