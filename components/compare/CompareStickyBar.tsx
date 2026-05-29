"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Scale, X } from "lucide-react";
import { useCompare } from "@/hooks/useProductStore";
import { getCompareProducts, shortProductLabel } from "@/lib/compare";
import { cn } from "@/lib/utils";

export default function CompareStickyBar() {
  const pathname = usePathname();
  const { ids, count, remove, clear } = useCompare();
  const products = getCompareProducts(ids);

  if (pathname === "/compare") return null;

  return (
    <AnimatePresence>
      {count > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[55] px-3 pb-3 pt-2 sm:bottom-6 sm:px-4 sm:pb-0"
        >
          <div
            className={cn(
              "mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-[#39ff88]/20",
              "bg-black/85 px-4 py-3.5 shadow-[0_24px_80px_rgba(0,0,0,0.75),0_0_50px_rgba(57,255,136,0.06)]",
              "supports-[backdrop-filter]:bg-black/75 supports-[backdrop-filter]:backdrop-blur-xl",
              "sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3",
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 shrink-0 text-[#39ff88]" />
                <p className="text-[13px] font-semibold text-white">
                  Compare ({count} {count === 1 ? "Product" : "Products"})
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {products.map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/75"
                  >
                    {shortProductLabel(p)}
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="text-white/40 hover:text-white"
                      aria-label={`Remove ${p.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={clear}
                className="rounded-full px-3 py-2 text-[12px] font-medium text-white/50 hover:text-white"
              >
                Clear
              </button>
              <Link
                href="/compare"
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5",
                  "bg-[#39ff88] text-[13px] font-semibold text-black transition-opacity hover:opacity-90",
                )}
              >
                Compare Now
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
