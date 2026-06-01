import { PRICE_PRESETS, SHOP_BRANDS, type ShopFilterState, type ShopSortId } from "@/lib/shop";

export type QuickChip = {
  id: string;
  label: string;
  isActive: (f: ShopFilterState, sort: ShopSortId) => boolean;
  apply: (f: ShopFilterState, sort: ShopSortId) => { filters: ShopFilterState; sort: ShopSortId };
};

export const SHOP_QUICK_CHIPS: QuickChip[] = [
  {
    id: "under-20k",
    label: "Under ₹20k",
    isActive: (f) => f.priceMin === 0 && f.priceMax === 20000,
    apply: (f) => ({
      filters: { ...f, priceMin: 0, priceMax: 20000 },
      sort: "price-asc",
    }),
  },
  {
    id: "20-30k",
    label: "₹20k – ₹30k",
    isActive: (f) => f.priceMin === 20000 && f.priceMax === 30000,
    apply: (f) => ({
      filters: { ...f, priceMin: 20000, priceMax: 30000 },
      sort: "price-asc",
    }),
  },
  {
    id: "delivery",
    label: "Free delivery",
    isActive: (f) => f.deliveryOnly,
    apply: (f) => ({
      filters: { ...f, deliveryOnly: !f.deliveryOnly },
      sort: "popular",
    }),
  },
  {
    id: "best-sellers",
    label: "Best sellers",
    isActive: (_f, sort) => sort === "best-selling",
    apply: (f) => ({ filters: f, sort: "best-selling" }),
  },
  ...SHOP_BRANDS.map((brand) => ({
    id: `brand-${brand}`,
    label: brand,
    isActive: (f: ShopFilterState) => f.brands.length === 1 && f.brands[0] === brand,
    apply: (f: ShopFilterState) => {
      const on = f.brands.length === 1 && f.brands[0] === brand;
      return {
        filters: { ...f, brands: on ? [] : [brand] },
        sort: "popular" as ShopSortId,
      };
    },
  })),
];

export function activeShopFilterLabels(
  filters: ShopFilterState,
): { key: string; label: string }[] {
  const items: { key: string; label: string }[] = [];
  if (filters.priceMin != null && filters.priceMax != null) {
    const preset = PRICE_PRESETS.find(
      (p) => p.min === filters.priceMin && p.max === filters.priceMax,
    );
    items.push({
      key: "price",
      label:
        preset?.label ??
        `₹${filters.priceMin.toLocaleString("en-IN")} – ₹${filters.priceMax.toLocaleString("en-IN")}`,
    });
  }
  filters.brands.forEach((b) => items.push({ key: `brand-${b}`, label: b }));
  if (filters.deliveryOnly) items.push({ key: "delivery", label: "Free delivery" });
  filters.capacities.forEach((c) => items.push({ key: `cap-${c}`, label: c }));
  filters.conditions.forEach((c) => items.push({ key: `cond-${c}`, label: c }));
  return items;
}

export function toggleShopQuickChip(
  chip: QuickChip,
  filters: ShopFilterState,
  sort: ShopSortId,
): { filters: ShopFilterState; sort: ShopSortId } {
  const active = chip.isActive(filters, sort);
  if (active && chip.id.startsWith("brand-")) {
    return { filters: { ...filters, brands: [] }, sort };
  }
  if (active && (chip.id === "under-20k" || chip.id === "20-30k")) {
    return { filters: { ...filters, priceMin: null, priceMax: null }, sort: "popular" };
  }
  if (active && chip.id === "delivery") {
    return { filters: { ...filters, deliveryOnly: false }, sort };
  }
  if (active && chip.id === "best-sellers") {
    return { filters, sort: "popular" };
  }
  return chip.apply(filters, sort);
}

export function removeShopFilterKey(
  key: string,
  filters: ShopFilterState,
): ShopFilterState {
  if (key === "price") return { ...filters, priceMin: null, priceMax: null };
  if (key === "delivery") return { ...filters, deliveryOnly: false };
  if (key.startsWith("brand-")) {
    const brand = key.replace("brand-", "");
    return { ...filters, brands: filters.brands.filter((b) => b !== brand) };
  }
  if (key.startsWith("cap-")) {
    const cap = key.replace("cap-", "");
    return { ...filters, capacities: filters.capacities.filter((c) => c !== cap) };
  }
  if (key.startsWith("cond-")) {
    const cond = key.replace("cond-", "");
    return { ...filters, conditions: filters.conditions.filter((c) => c !== cond) };
  }
  return filters;
}
