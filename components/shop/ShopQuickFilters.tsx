"use client";

import { X } from "lucide-react";
import {
  SHOP_QUICK_CHIPS,
  activeShopFilterLabels,
  removeShopFilterKey,
  toggleShopQuickChip,
} from "@/lib/shop-quick-filters";
import type { ShopFilterState, ShopSortId } from "@/lib/shop";
import { cn } from "@/lib/utils";

const chipBase = cn(
  "inline-flex shrink-0 items-center justify-center rounded-full border px-3 py-1.5",
  "text-xs font-semibold transition-colors",
  "border-theme-border bg-theme-surface-card text-theme-fg",
);

const chipActive = cn(
  "border-theme-accent bg-[color-mix(in_srgb,var(--theme-accent)_12%,var(--theme-surface-card))]",
  "text-theme-accent",
);

type Props = {
  filters: ShopFilterState;
  sort: ShopSortId;
  onFiltersChange: (filters: ShopFilterState) => void;
  onSortChange: (sort: ShopSortId) => void;
  onClearFilters: () => void;
};

export default function ShopQuickFilters({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onClearFilters,
}: Props) {
  const activeLabels = activeShopFilterLabels(filters);

  return (
    <div className="shop-quick-filters-wrap space-y-2 px-4 pb-3 pt-0 sm:px-6">
      <div
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        data-lenis-prevent
      >
        {SHOP_QUICK_CHIPS.map((chip) => {
          const active = chip.isActive(filters, sort);
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => {
                const next = toggleShopQuickChip(chip, filters, sort);
                onFiltersChange(next.filters);
                onSortChange(next.sort);
              }}
              className={cn(chipBase, active && chipActive)}
              aria-pressed={active}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {activeLabels.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs font-semibold text-theme-accent underline"
          >
            Clear all
          </button>
          {activeLabels.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => onFiltersChange(removeShopFilterKey(key, filters))}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5",
                "border-[color-mix(in_srgb,var(--theme-accent)_35%,var(--theme-border))]",
                "bg-[color-mix(in_srgb,var(--theme-accent)_8%,var(--theme-surface-card))]",
                "text-[11px] font-semibold text-theme-fg",
              )}
            >
              {label}
              <X className="h-3 w-3" aria-hidden />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
