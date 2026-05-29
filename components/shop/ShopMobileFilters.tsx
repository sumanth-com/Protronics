"use client";

import { cn } from "@/lib/utils";
import {
  CAPACITY_OPTIONS,
  PRICE_PRESETS,
  SHOP_BRANDS,
  SHOP_CATEGORIES,
  SHOP_SORT_OPTIONS,
  type ShopFilterState,
  type ShopSortId,
} from "@/lib/shop";

type ShopMobileFiltersProps = {
  filters: ShopFilterState;
  activeCategory?: string;
  sort: ShopSortId;
  onCategoryChange: (slug: string | undefined) => void;
  onFiltersChange: (filters: ShopFilterState) => void;
  onSortChange: (sort: ShopSortId) => void;
  onClear: () => void;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/[0.06] py-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
        active
          ? "border border-[#39ff88]/40 bg-[#39ff88]/12 text-[#39ff88]"
          : "border border-white/[0.08] bg-white/[0.04] text-white/65",
      )}
    >
      {label}
    </button>
  );
}

export default function ShopMobileFilters({
  filters,
  activeCategory,
  sort,
  onCategoryChange,
  onFiltersChange,
  onSortChange,
  onClear,
}: ShopMobileFiltersProps) {
  const toggle = (key: keyof ShopFilterState, value: string) => {
    const current = filters[key] as string[];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: next });
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[15px] font-semibold text-white">Refine</p>
        <button
          type="button"
          onClick={onClear}
          className="text-[12px] font-medium text-[#39ff88]/80"
        >
          Clear all
        </button>
      </div>

      <Section title="Category">
        <div className="flex flex-wrap gap-2">
          <Chip label="All Products" active={!activeCategory} onClick={() => onCategoryChange(undefined)} />
          {SHOP_CATEGORIES.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.id === "premium-hubs" ? "Premium" : cat.label}
              active={activeCategory === cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
            />
          ))}
        </div>
      </Section>

      <Section title="Price">
        <div className="flex flex-wrap gap-2">
          {PRICE_PRESETS.map((p) => {
            const active = filters.priceMin === p.min && filters.priceMax === p.max;
            return (
              <Chip
                key={p.label}
                label={p.label}
                active={active}
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    priceMin: active ? null : p.min,
                    priceMax: active ? null : p.max,
                  })
                }
              />
            );
          })}
        </div>
      </Section>

      <Section title="Capacity">
        <div className="flex flex-wrap gap-2">
          {CAPACITY_OPTIONS.map((cap) => (
            <Chip
              key={cap}
              label={cap}
              active={filters.capacities.includes(cap)}
              onClick={() => toggle("capacities", cap)}
            />
          ))}
        </div>
      </Section>

      <Section title="Brand">
        <div className="flex flex-wrap gap-2">
          {SHOP_BRANDS.map((brand) => (
            <Chip
              key={brand}
              label={brand}
              active={filters.brands.includes(brand)}
              onClick={() => toggle("brands", brand)}
            />
          ))}
        </div>
      </Section>

      <Section title="Warranty">
        <Chip
          label="1 Year"
          active={filters.warranties.includes("1 Year")}
          onClick={() => toggle("warranties", "1 Year")}
        />
      </Section>

      <Section title="Sort">
        <div className="flex flex-col gap-1">
          {SHOP_SORT_OPTIONS.filter((o) => o.id !== "best-selling").map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSortChange(opt.id)}
              className={cn(
                "rounded-lg px-3 py-2.5 text-left text-[13px]",
                sort === opt.id ? "bg-[#39ff88]/10 text-[#39ff88]" : "text-white/75",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}
