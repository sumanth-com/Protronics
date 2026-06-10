import { BUSINESS } from "@/lib/contact";
import { enrichProductDetail, type ProductDetail } from "@/lib/product-detail";
import { SHOP_PRODUCTS, type ShopProduct } from "@/lib/shop";

/** Brand CTA gold — matches shop buttons & theme accent in light mode */
export const COMPARE_ACCENT = "#b88a44";

export type CompareWinnerKey =
  | "bestCapacity"
  | "bestValue"
  | "longestWarranty"
  | "mostPopular"
  | "energyEfficient";

export type CompareWinner = {
  key: CompareWinnerKey;
  label: string;
  productId: string;
};

export type CompareSpecRow = {
  id: string;
  label: string;
  getValue: (p: ProductDetail) => string;
};

export function getCompareProducts(ids: string[]): ProductDetail[] {
  return ids
    .map((id) => SHOP_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is ShopProduct => Boolean(p))
    .map(enrichProductDetail);
}

export function getCoolingType(product: ShopProduct): string {
  if (product.categoryId === "double-door" || product.categoryId === "premium-hubs") {
    return "Frost Free";
  }
  if (product.categoryId === "washing-machines") return "Fully Automatic";
  if (product.categoryId === "mini-fridges") return "Direct Cool";
  return product.specs.some((s) => s.toLowerCase().includes("inverter"))
    ? "Inverter Direct Cool"
    : "Direct Cool";
}

export function getDimensions(product: ShopProduct): string {
  if (product.capacityLiters >= 500) return "91 × 70 × 178 cm (approx.)";
  if (product.capacityLiters >= 300) return "66 × 64 × 164 cm (approx.)";
  if (product.capacityLiters >= 200) return "58 × 58 × 142 cm (approx.)";
  return "48 × 50 × 85 cm (approx.)";
}

function warrantyMonths(warranty: string): number {
  const match = warranty.match(/(\d+)/);
  return match ? Number(match[1]) * (warranty.toLowerCase().includes("year") ? 12 : 1) : 12;
}

export function computeCompareWinners(products: ProductDetail[]): CompareWinner[] {
  if (products.length < 2) return [];

  const winners: CompareWinner[] = [];

  const bestCap = [...products].sort((a, b) => b.capacityLiters - a.capacityLiters)[0]!;
  winners.push({
    key: "bestCapacity",
    label: "Family Choice",
    productId: bestCap.id,
  });

  const bestVal = [...products].sort(
    (a, b) => a.price / a.capacityLiters - b.price / b.capacityLiters,
  )[0]!;
  winners.push({
    key: "bestValue",
    label: "Best Value",
    productId: bestVal.id,
  });

  const bestWar = [...products].sort(
    (a, b) => warrantyMonths(b.warranty) - warrantyMonths(a.warranty),
  )[0]!;
  winners.push({
    key: "longestWarranty",
    label: "Longest Warranty",
    productId: bestWar.id,
  });

  const popular = [...products].sort((a, b) => b.popularity - a.popularity)[0]!;
  winners.push({
    key: "mostPopular",
    label: "Most Popular",
    productId: popular.id,
  });

  const energyBest = [...products].sort((a, b) => {
    const stars = (r: string) => Number(r.match(/\d+/)?.[0] ?? 0);
    return stars(b.energyRating) - stars(a.energyRating);
  })[0]!;
  const star = (r: string) => Number(r.match(/\d+/)?.[0] ?? 0);
  const maxStars = Math.max(...products.map((p) => star(p.energyRating)));
  if (maxStars > 0 && products.some((p) => star(p.energyRating) < maxStars)) {
    winners.push({
      key: "energyEfficient",
      label: "Energy Efficient",
      productId: energyBest.id,
    });
  }

  return winners;
}

export function getWinnerBadges(productId: string, winners: CompareWinner[]) {
  return winners.filter((w) => w.productId === productId);
}

export const COMPARE_SPEC_ROWS: CompareSpecRow[] = [
  { id: "brand", label: "Brand", getValue: (p) => p.brand },
  { id: "model", label: "Model", getValue: (p) => p.name },
  { id: "capacity", label: "Capacity", getValue: (p) => p.capacity },
  {
    id: "price",
    label: "Price",
    getValue: (p) => `₹${p.price.toLocaleString("en-IN")}`,
  },
  { id: "warranty", label: "Warranty", getValue: (p) => p.warranty },
  { id: "energy", label: "Energy Rating", getValue: (p) => p.energyRating },
  { id: "condition", label: "Condition", getValue: (p) => p.condition },
  { id: "cooling", label: "Cooling Type", getValue: (p) => getCoolingType(p) },
  { id: "dimensions", label: "Dimensions", getValue: (p) => getDimensions(p) },
  {
    id: "ideal",
    label: "Recommended For",
    getValue: (p) => p.idealFor.slice(0, 2).join(" · "),
  },
  {
    id: "delivery",
    label: "Delivery Available",
    getValue: (p) => (p.deliveryAvailable ? "Yes — Metro Bengaluru" : "Confirm with team"),
  },
  {
    id: "support",
    label: "Support Included",
    getValue: () => "WhatsApp · Phone · Expert guidance",
  },
];

export function buildCompareWhatsAppLink(products: ProductDetail[]): string {
  const list = products.map((p) => `• ${p.brand} ${p.capacity} — ${p.name}`).join("\n");
  const message = `Hi Protronics,\n\nI'm comparing these appliances and would like expert advice.\n\nProducts:\n${list}\n\nPlease help me choose the best option.`;
  return `${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function shortProductLabel(product: ProductDetail): string {
  return `${product.brand} ${product.capacity}`;
}
