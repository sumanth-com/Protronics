"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, RotateCcw, Scale, Star, X } from "lucide-react";
import { useMemo } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import CompareWinnerBadge from "@/components/compare/CompareWinnerBadge";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { useCompare } from "@/hooks/useProductStore";
import {
  COMPARE_SPEC_ROWS,
  buildCompareWhatsAppLink,
  computeCompareWinners,
  getCompareProducts,
  getWinnerBadges,
  type CompareWinnerKey,
} from "@/lib/compare";
import { buildProductPath, getWhatsAppInquiryLink } from "@/lib/product-detail";
import { cn } from "@/lib/utils";

import { DEFAULT_PRODUCT_IMAGE } from "@/lib/product-images";

const FALLBACK = DEFAULT_PRODUCT_IMAGE;

const ROW_WINNER: Partial<Record<string, CompareWinnerKey>> = {
  capacity: "bestCapacity",
  price: "bestValue",
  warranty: "longestWarranty",
  energy: "energyEfficient",
};

export default function ComparePageClient() {
  const { ids, remove, clear, restoreLastCompare } = useCompare();
  const mounted = useIsClient();

  const lastAvailable = useMemo(() => {
    if (!mounted) return false;
    try {
      const last = JSON.parse(localStorage.getItem("protronics-compare-last") ?? "[]") as string[];
      return last.length >= 1 && ids.length === 0;
    } catch {
      return false;
    }
  }, [mounted, ids]);

  const products = useMemo(() => getCompareProducts(ids), [ids]);
  const winners = useMemo(() => computeCompareWinners(products), [products]);
  const whatsappLink = useMemo(() => buildCompareWhatsAppLink(products), [products]);

  const winnerForRow = (rowId: string) => {
    const key = ROW_WINNER[rowId];
    if (!key) return null;
    return winners.find((w) => w.key === key)?.productId ?? null;
  };

  const handleRestore = () => {
    restoreLastCompare();
  };

  if (!mounted) {
    return <div className="min-h-[60vh] bg-black" />;
  }

  if (products.length === 0) {
    return (
      <main className="min-h-screen bg-black pb-32 pt-8 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="compare-empty-icon-wrap mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
            <Scale className="compare-empty-icon h-6 w-6" />
          </div>
          <h1 className="mt-6 text-[28px] font-semibold tracking-tight sm:text-[34px]">
            Compare Appliances
          </h1>
          <p className="mt-3 text-[15px] leading-7 text-white/60">
            Add up to 3 products from the shop to compare side-by-side — capacity, value,
            warranty, and more.
          </p>

          {lastAvailable ? (
            <motion.button
              type="button"
              onClick={handleRestore}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="compare-btn-secondary mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold"
            >
              <RotateCcw className="h-4 w-4" />
              Continue Last Comparison
            </motion.button>
          ) : null}

          <Link
            href="/shop"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-black"
          >
            Browse Shop
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pb-36 pt-6 text-white sm:pb-32 sm:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Shop
            </Link>
            <h1 className="mt-3 text-[28px] font-semibold tracking-tight sm:text-[36px]">
              Compare Appliances
            </h1>
            <p className="mt-2 max-w-xl text-[14px] leading-6 text-white/55">
              Side-by-side insights to help you decide faster — then reserve or chat with our
              experts.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clear}
              className="rounded-full border border-white/10 px-4 py-2 text-[12px] font-medium text-white/50 hover:text-white"
            >
              Clear All
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="compare-btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Get Expert Advice
            </a>
          </div>
        </div>

        {/* Product columns — horizontal scroll on mobile */}
        <div className="mt-10 -mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden" data-lenis-prevent>
          <div
            className={cn(
              "flex min-w-max gap-4 sm:min-w-0 sm:grid",
              products.length === 1 && "sm:grid-cols-1 sm:max-w-md",
              products.length === 2 && "sm:grid-cols-2",
              products.length >= 3 && "sm:grid-cols-3",
            )}
          >
            <AnimatePresence mode="popLayout">
              {products.map((product) => {
                const badges = getWinnerBadges(product.id, winners);
                const uniqueBadges = [...new Map(badges.map((b) => [b.label, b])).values()];

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "w-[280px] shrink-0 sm:w-auto",
                      "rounded-2xl border border-white/[0.08] bg-white/[0.02]",
                      "p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
                      "supports-[backdrop-filter]:backdrop-blur-xl",
                    )}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 280px, 33vw"
                        className="object-contain p-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK;
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white/60 backdrop-blur-sm hover:text-white"
                        aria-label={`Remove ${product.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {uniqueBadges.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {uniqueBadges.map((b) => (
                          <CompareWinnerBadge key={b.label} label={b.label} />
                        ))}
                      </div>
                    ) : (
                      <div className="mt-3 h-[26px]" />
                    )}

                    <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-white/45">
                      {product.brand}
                    </p>
                    <h2 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-[22px] font-semibold tracking-tight">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        href={buildProductPath(product.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 text-[12px] font-semibold text-black"
                      >
                        <Star className="h-4 w-4" />
                        Reserve This Appliance
                      </Link>
                      <a
                        href={getWhatsAppInquiryLink(product.name, product.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-2.5 text-[12px] font-semibold text-white"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        WhatsApp Inquiry
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Spec comparison — premium rows, not Excel */}
        <div className="mt-12 space-y-3 sm:mt-14">
          <p className="text-[12px] font-medium tracking-[0.2em] text-white/45">
            DETAILED COMPARISON
          </p>

          {COMPARE_SPEC_ROWS.map((row, rowIndex) => {
            const winnerId = winnerForRow(row.id);

            return (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: rowIndex * 0.03, duration: 0.35 }}
                className={cn(
                  "rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4",
                  "supports-[backdrop-filter]:backdrop-blur-xl sm:p-5",
                )}
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
                  {row.label}
                </p>
                <div
                  className={cn(
                    "mt-3 grid gap-3",
                    products.length === 1 && "grid-cols-1",
                    products.length === 2 && "grid-cols-2",
                    products.length >= 3 && "grid-cols-3",
                  )}
                >
                  {products.map((product) => {
                    const isWinner = winnerId === product.id;
                    return (
                      <div
                        key={product.id}
                        className={cn(
                          "rounded-xl px-3 py-2.5 text-[13px] leading-6 transition-colors sm:text-[14px]",
                          isWinner ? "compare-winner-cell font-medium" : "text-white/75",
                        )}
                      >
                        {row.getValue(product)}
                        {isWinner ? (
                          <span className="compare-winner-label mt-1 block text-[10px] font-semibold">
                            ★ Highlight
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile sticky actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 px-4 py-3 backdrop-blur-xl sm:hidden">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="compare-btn-primary flex w-full items-center justify-center gap-2 rounded-full py-3 text-[13px] font-semibold"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Compare &amp; Get Advice
        </a>
      </div>
    </main>
  );
}
