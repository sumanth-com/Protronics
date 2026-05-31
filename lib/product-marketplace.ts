import { getCategoryBySlug, type ShopProduct } from "@/lib/shop";
import type { ProductDetail } from "@/lib/product-detail";

export type SpecGroup = {
  title: string;
  items: { label: string; value: string }[];
};

function hashNumber(id: string, min: number, max: number) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i) * (i + 1)) % 997;
  return min + (h % (max - min + 1));
}

export function getProductRating(product: ShopProduct): number {
  const base = 4.5 + (product.popularity % 50) / 100;
  return Math.min(4.9, Math.round(base * 10) / 10);
}

export function getProductReviewCount(product: ShopProduct): number {
  return hashNumber(product.id, 48, 280);
}

export function getVerifiedPurchaseCount(product: ShopProduct): number {
  return hashNumber(`${product.id}-vp`, 12, 96);
}

export function getMonthlySavings(product: ShopProduct): number {
  const saved = Math.max(0, product.originalPrice - product.price);
  return Math.round(saved / 12);
}

export function getDiscountPercent(product: ShopProduct): number {
  if (product.originalPrice <= product.price) return 0;
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

export function getMarketplaceOffers(product: ProductDetail) {
  return [
    { label: `${product.warranty} Warranty`, icon: "shield" as const },
    { label: product.deliveryAvailable ? "Free Delivery" : "Delivery on Enquiry", icon: "truck" as const },
    { label: "Free Installation", icon: "wrench" as const },
    { label: "100+ Point Tested", icon: "check" as const },
    { label: "Sanitized", icon: "sparkle" as const },
  ];
}

export function getHighlightChips(product: ProductDetail): string[] {
  const chips = [product.capacity, ...product.specs];
  if (product.energyRating) chips.push(`${product.energyRating} Energy`);
  if (product.condition) chips.push(product.condition);
  return [...new Set(chips)].slice(0, 6);
}

export function getProductSpecGroups(product: ProductDetail): SpecGroup[] {
  const category = getCategoryBySlug(product.categoryId);

  return [
    {
      title: "General",
      items: [
        { label: "Brand", value: product.brand },
        { label: "Model", value: product.name },
        { label: "Capacity", value: product.capacity },
        { label: "Category", value: category?.label ?? "Refrigerator" },
        { label: "Condition Grade", value: product.condition },
        { label: "Availability", value: product.availability },
      ],
    },
    {
      title: "Performance",
      items: [
        ...product.specs.map((spec) => ({ label: "Feature", value: spec })),
        { label: "Energy Rating", value: product.energyRating },
      ],
    },
    {
      title: "Dimensions",
      items: [
        { label: "Capacity", value: `${product.capacityLiters} Liters` },
        { label: "Type", value: category?.label ?? "Refrigerator" },
        { label: "Door Type", value: category?.id === "double-door" ? "Double Door" : "Single Door" },
      ],
    },
    {
      title: "Warranty",
      items: [
        { label: "Warranty Period", value: product.warranty },
        ...product.warrantyCoverage.map((item) => ({ label: "Coverage", value: item })),
      ],
    },
    {
      title: "Energy",
      items: [
        { label: "Star Rating", value: product.energyRating },
        { label: "Inverter Technology", value: product.specs.some((s) => /inverter/i.test(s)) ? "Yes" : "Standard" },
        { label: "Stabilizer Free", value: product.specs.some((s) => /stabilizer/i.test(s)) ? "Yes" : "Check manual" },
      ],
    },
  ];
}

export function getTradeInCategoryLabel(product: ProductDetail): string {
  if (product.categoryId === "mini-fridges") return "mini fridge";
  if (product.categoryId === "commercial") return "commercial refrigerator";
  return "refrigerator";
}
