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
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
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
                "mt-3 font-semibold tracking-tight text-white",
                "type-section-title text-[34px] leading-[1.06] sm:text-[44px] sm:leading-[1.04]",
              )}
            >
              This Week&apos;s Top Picks
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Deal categories"
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
                    "deals-tab inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium transition-all duration-300",
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
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
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
                    "premium-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]",
                    "transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]",
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      quality={IMAGE_QUALITY.card}
                    />
                    {savingsPct > 0 && (
                      <span className="deals-save-pill absolute left-3 top-3 z-[1]">
                        Save {savingsPct}%
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-medium text-white/45">
                      {product.brand}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-[14px] font-semibold leading-snug text-white">
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-[16px] font-semibold text-white">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[12px] text-white/40 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>
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
