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
              "compare-sticky-shell mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl px-4 py-3.5",
              "supports-[backdrop-filter]:backdrop-blur-xl",
              "sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3",
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Scale className="compare-sticky-icon h-4 w-4 shrink-0" />
                <p className="compare-sticky-title text-[13px] font-semibold">
                  Compare ({count} {count === 1 ? "Product" : "Products"})
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {products.map((p) => (
                  <span
                    key={p.id}
                    className="compare-sticky-chip inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]"
                  >
                    {shortProductLabel(p)}
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="compare-sticky-chip-remove transition-colors"
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
                className="compare-sticky-clear rounded-full px-3 py-2 text-[12px] font-medium transition-colors"
              >
                Clear
              </button>
              <Link
                href="/compare"
                className="compare-btn-primary inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-semibold"
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
