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

function Section({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={cn("py-4", !last && "border-b border-theme-border")}>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-theme-fg-muted">
        {title}
      </p>
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
        "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors",
        active
          ? "border-theme-accent bg-[color-mix(in_srgb,var(--theme-accent)_12%,var(--theme-surface-card))] text-theme-accent"
          : "border-theme-border bg-theme-surface-card text-theme-fg",
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
    <div className="pb-2">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[15px] font-semibold text-theme-fg">Refine</p>
        <button
          type="button"
          onClick={onClear}
          className="text-[12px] font-semibold text-theme-accent"
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
              label={cat.label}
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

      <Section title="Sort" last>
        <div className="flex flex-col gap-1">
          {SHOP_SORT_OPTIONS.filter((o) => o.id !== "best-selling").map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSortChange(opt.id)}
              className={cn(
                "rounded-lg px-3 py-2.5 text-left text-[13px] font-medium",
                sort === opt.id
                  ? "bg-[color-mix(in_srgb,var(--theme-accent)_12%,var(--theme-surface-card))] text-theme-accent"
                  : "text-theme-fg",
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
