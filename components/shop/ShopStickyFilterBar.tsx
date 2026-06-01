"use client";

import { motion } from "framer-motion";
import { ChevronDown, ListFilter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ShopFilterDropdown from "@/components/shop/ShopFilterDropdown";
import {
  CAPACITY_OPTIONS,
  PRICE_PRESETS,
  SHOP_BRANDS,
  SHOP_CATEGORIES,
  SHOP_SORT_OPTIONS,
  getCategoryBySlug,
  type ShopFilterState,
  type ShopSortId,
} from "@/lib/shop";
import { cn } from "@/lib/utils";

const CATEGORY_PILLS = [
  { slug: undefined, label: "All Products" },
  ...SHOP_CATEGORIES.map((c) => ({
    slug: c.slug as string | undefined,
    label: c.id === "premium-hubs" ? "Premium" : c.label,
  })),
];

const BAR_SORT_OPTIONS = SHOP_SORT_OPTIONS.filter(
  (o) => o.id !== "best-selling",
);

const PRICE_OPTIONS = PRICE_PRESETS.map((p) => ({
  value: `${p.min}-${p.max}`,
  label: p.label,
}));

const CAPACITY_OPTS = CAPACITY_OPTIONS.map((c) => ({ value: c, label: c }));
const BRAND_OPTS = SHOP_BRANDS.map((b) => ({ value: b, label: b }));

type ShopStickyFilterBarProps = {
  activeCategory?: string;
  filters: ShopFilterState;
  sort: ShopSortId;
  resultCount: number;
  onCategoryChange: (slug: string | undefined) => void;
  onFiltersChange: (filters: ShopFilterState) => void;
  onSortChange: (sort: ShopSortId) => void;
  onMobileFilterOpen: () => void;
};

function getPriceSelected(filters: ShopFilterState): string[] {
  if (filters.priceMin == null || filters.priceMax == null) return [];
  return [`${filters.priceMin}-${filters.priceMax}`];
}

function setPriceFromSelected(filters: ShopFilterState, selected: string[]): ShopFilterState {
  if (!selected.length) {
    return { ...filters, priceMin: null, priceMax: null };
  }
  const [min, max] = selected[0]!.split("-").map(Number);
  return { ...filters, priceMin: min!, priceMax: max! };
}

export default function ShopStickyFilterBar({
  activeCategory,
  filters,
  sort,
  resultCount,
  onCategoryChange,
  onFiltersChange,
  onSortChange,
  onMobileFilterOpen,
}: ShopStickyFilterBarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRefDesktop = useRef<HTMLDivElement>(null);
  const sortRefMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        sortRefDesktop.current?.contains(target) ||
        sortRefMobile.current?.contains(target)
      ) {
        return;
      }
      setSortOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [sortOpen]);

  const sortLabel = BAR_SORT_OPTIONS.find((o) => o.id === sort)?.label ?? "Sort";
  const category = getCategoryBySlug(activeCategory);
  const listTitle = category ? `${category.label}` : "All refrigerators";

  const sortMenu = (
    <>
      {BAR_SORT_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => {
            onSortChange(opt.id);
            setSortOpen(false);
          }}
          className={cn(
            "shop-filter-menu-item w-full rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-colors",
            sort === opt.id
              ? "bg-[color-mix(in_srgb,var(--theme-accent)_12%,var(--theme-surface-card))] text-theme-accent"
              : "text-theme-fg hover:bg-theme-elevated",
          )}
        >
          {opt.label}
        </button>
      ))}
    </>
  );

  return (
    <div className="shop-filter-shell">
      <div className="shop-filter-bar relative border-0 bg-transparent lg:border-b lg:border-theme-border lg:bg-theme-surface-card">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="mb-2.5 flex items-baseline justify-between gap-3 lg:hidden">
            <h1 className="truncate text-base font-bold text-theme-fg">{listTitle}</h1>
            <p className="shrink-0 text-xs font-medium text-theme-fg-muted">
              {resultCount} {resultCount === 1 ? "item" : "items"}
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden items-center justify-between gap-4 lg:flex">
            <div
              className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              data-lenis-prevent
            >
              {CATEGORY_PILLS.map((pill) => {
                const active = (pill.slug ?? undefined) === (activeCategory ?? undefined);
                return (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => onCategoryChange(pill.slug)}
                    className={cn(
                      "shop-category-pill relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200",
                      active
                        ? "shop-category-pill-active border border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] text-white shadow-[0_0_24px_rgba(255,255,255,0.05)]"
                        : "border border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/15 hover:text-white",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="shop-category-pill"
                        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/25"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : null}
                    <span className="relative">{pill.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <ShopFilterDropdown
                label="Price"
                options={PRICE_OPTIONS}
                selected={getPriceSelected(filters)}
                onChange={(sel) => onFiltersChange(setPriceFromSelected(filters, sel))}
                single
              />
              <ShopFilterDropdown
                label="Capacity"
                options={CAPACITY_OPTS}
                selected={filters.capacities}
                onChange={(capacities) => onFiltersChange({ ...filters, capacities })}
              />
              <ShopFilterDropdown
                label="Brand"
                options={BRAND_OPTS}
                selected={filters.brands}
                onChange={(brands) => onFiltersChange({ ...filters, brands })}
              />
              <ShopFilterDropdown
                label="Warranty"
                options={[{ value: "1 Year", label: "1 Year" }]}
                selected={filters.warranties}
                onChange={(warranties) => onFiltersChange({ ...filters, warranties })}
              />

              <div ref={sortRefDesktop} className="relative z-[81]">
                <button
                  type="button"
                  onClick={() => setSortOpen((o) => !o)}
                  className={cn(
                    "shop-sort-trigger inline-flex items-center gap-1.5 rounded-full px-3.5 py-2",
                    "border border-theme-border bg-theme-surface-card",
                    "text-[13px] font-semibold text-theme-fg",
                  )}
                >
                  {sortLabel}
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", sortOpen && "rotate-180")}
                  />
                </button>
                {sortOpen ? (
                  <div className="shop-filter-menu absolute right-0 top-[calc(100%+8px)] z-[82] min-w-[200px] rounded-xl border border-theme-border bg-theme-surface-card p-2 shadow-theme">
                    {sortMenu}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center justify-between gap-2 lg:hidden">
            <button
              type="button"
              onClick={onMobileFilterOpen}
              className={cn(
                "shop-mobile-filter-btn inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-3 py-2",
                "border border-theme-border bg-theme-surface-card text-[13px] font-semibold text-theme-fg",
              )}
            >
              <ListFilter className="h-4 w-4 shrink-0" aria-hidden />
              Filters
            </button>
            <div ref={sortRefMobile} className="relative z-[81] shrink-0">
              <button
                type="button"
                onClick={() => setSortOpen((o) => !o)}
                aria-expanded={sortOpen}
                className={cn(
                  "shop-sort-trigger inline-flex items-center gap-1 rounded-full px-3 py-2",
                  "border border-theme-border bg-theme-surface-card text-[12px] font-semibold text-theme-fg",
                  sortOpen && "border-theme-accent",
                )}
              >
                Sort
                <ChevronDown
                  className={cn("h-3 w-3 transition-transform", sortOpen && "rotate-180")}
                />
              </button>
              {sortOpen ? (
                <div className="shop-filter-menu absolute right-0 top-[calc(100%+8px)] z-[82] min-w-[200px] rounded-xl border border-theme-border bg-theme-surface-card p-2 shadow-theme">
                  {sortMenu}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
