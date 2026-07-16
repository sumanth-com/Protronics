import { BUSINESS } from "@/lib/contact";
import { productImagePath } from "@/lib/product-images";

export const shopGlass = [
  "rounded-2xl border border-white/[0.08]",
  "bg-black",
  "supports-[backdrop-filter]:bg-black supports-[backdrop-filter]:backdrop-blur-xl",
].join(" ");

export type ShopCategoryId =
  | "single-door"
  | "double-door"
  | "mini-fridges"
  | "washing-machines"
  | "premium-hubs";

export type ShopCategory = {
  id: ShopCategoryId;
  slug: ShopCategoryId;
  label: string;
  description: string;
};

export const SHOP_CATEGORIES: ShopCategory[] = [
  { id: "single-door", slug: "single-door", label: "Single Door", description: "Compact & efficient" },
  { id: "double-door", slug: "double-door", label: "Double Door", description: "Frost-free family size" },
  { id: "mini-fridges", slug: "mini-fridges", label: "Mini Fridges", description: "Dorms & small spaces" },
  {
    id: "washing-machines",
    slug: "washing-machines",
    label: "Washing Machines",
    description: "Front & top load renewals",
  },
];

export type ShopSortId =
  | "newest"
  | "best-selling"
  | "price-asc"
  | "price-desc"
  | "popular";

export const SHOP_SORT_OPTIONS: { id: ShopSortId; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "best-selling", label: "Best Selling" },
  { id: "price-asc", label: "Price Low to High" },
  { id: "price-desc", label: "Price High to Low" },
  { id: "popular", label: "Most Popular" },
];

export type ShopProduct = {
  id: string;
  name: string;
  brand: string;
  categoryId: ShopCategoryId;
  capacity: string;
  capacityLiters: number;
  price: number;
  originalPrice: number;
  condition: "Like New" | "Excellent" | "Certified Premium";
  warranty: string;
  energyRating: string;
  deliveryAvailable: boolean;
  image: string;
  specs: string[];
  tag?: "Best Seller" | "Most Popular" | "New";
  popularity: number;
  salesRank: number;
  createdAt: string;
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "sf-godrej-240",
    name: "Godrej Edge Pro Single Door 240L",
    brand: "Godrej",
    categoryId: "single-door",
    capacity: "240L",
    capacityLiters: 240,
    price: 14999,
    originalPrice: 19999,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "3 Star",
    deliveryAvailable: true,
    image: productImagePath("sf-godrej-240"),
    specs: ["Quick Chill", "Low Power", "Compact"],
    popularity: 86,
    salesRank: 9,
    createdAt: "2026-02-20",
  },
  {
    id: "sf-lg-190",
    name: "LG 190 Litre Inverter Single Door Refrigerator",
    brand: "LG",
    categoryId: "single-door",
    capacity: "190L",
    capacityLiters: 190,
    price: 9999,
    originalPrice: 11000,
    condition: "Excellent",
    warranty: "1 Yr Compressor + 6 Mo Service",
    energyRating: "Inverter",
    deliveryAvailable: true,
    image: productImagePath("sf-lg-190"),
    specs: ["190L", "Inverter", "Free Home Delivery"],
    tag: "New",
    popularity: 96,
    salesRank: 1,
    createdAt: "2026-07-16",
  },
  {
    id: "sf-godrej-edge-190",
    name: "Godrej Edge Pro 190 Litre Single Door Refrigerator",
    brand: "Godrej",
    categoryId: "single-door",
    capacity: "190L",
    capacityLiters: 190,
    price: 7500,
    originalPrice: 7500,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "3 Star",
    deliveryAvailable: true,
    image: productImagePath("sf-godrej-edge-190"),
    specs: ["190L", "Edge Pro", "Single Door"],
    tag: "New",
    popularity: 88,
    salesRank: 4,
    createdAt: "2026-07-16",
  },
  {
    id: "df-whirlpool-protton-260",
    name: "Whirlpool Protton Triple Door 260 Litre Refrigerator",
    brand: "Whirlpool",
    categoryId: "double-door",
    capacity: "260L",
    capacityLiters: 260,
    price: 12000,
    originalPrice: 12000,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "5 Star",
    deliveryAvailable: true,
    image: productImagePath("df-whirlpool-protton-260"),
    specs: ["260L", "Triple Door", "Protton"],
    tag: "New",
    popularity: 90,
    salesRank: 2,
    createdAt: "2026-07-16",
  },
  {
    id: "mini-haier-190",
    name: "Haier Compact Mini Fridge 190L",
    brand: "Haier",
    categoryId: "mini-fridges",
    capacity: "190L",
    capacityLiters: 190,
    price: 12999,
    originalPrice: 16999,
    condition: "Like New",
    warranty: "1 Year",
    energyRating: "3 Star",
    deliveryAvailable: true,
    image: productImagePath("mini-haier-190"),
    specs: ["190L", "Space Optimized", "Quick Chill"],
    popularity: 82,
    salesRank: 10,
    createdAt: "2026-01-15",
  },
  {
    id: "mini-lg-170",
    name: "LG Direct Cool Mini 170L",
    brand: "LG",
    categoryId: "mini-fridges",
    capacity: "170L",
    capacityLiters: 170,
    price: 11999,
    originalPrice: 15499,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "3 Star",
    deliveryAvailable: true,
    image: productImagePath("mini-lg-170"),
    specs: ["170L", "Low Power", "Dorm Ready"],
    popularity: 79,
    salesRank: 11,
    createdAt: "2026-02-10",
  },
  {
    id: "wm-samsung-7kg",
    name: "Samsung Digital Inverter 7 kg Fully Automatic Top Load Washing Machine",
    brand: "Samsung",
    categoryId: "washing-machines",
    capacity: "7 kg",
    capacityLiters: 7,
    price: 9000,
    originalPrice: 9000,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "5 Star",
    deliveryAvailable: true,
    image: productImagePath("wm-samsung-7kg"),
    specs: ["7 kg", "Digital Inverter", "Fully Automatic", "Top Load"],
    tag: "Best Seller",
    popularity: 92,
    salesRank: 8,
    createdAt: "2026-07-16",
  },
  {
    id: "wm-lg-turbodrum-6kg",
    name: "LG Turbo Drum 6 kg Fully Automatic Top Load Washing Machine",
    brand: "LG",
    categoryId: "washing-machines",
    capacity: "6 kg",
    capacityLiters: 6,
    price: 6500,
    originalPrice: 6500,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "5 Star",
    deliveryAvailable: true,
    image: productImagePath("wm-lg-turbodrum-6kg"),
    specs: ["6 kg", "Turbo Drum", "Fully Automatic", "Top Load"],
    tag: "New",
    popularity: 91,
    salesRank: 5,
    createdAt: "2026-07-16",
  },
  {
    id: "wm-lg-turbodrum-6-5kg",
    name: "LG 6.5 kg Turbo Drum Fully Automatic Top Load Washing Machine",
    brand: "LG",
    categoryId: "washing-machines",
    capacity: "6.5 kg",
    capacityLiters: 6.5,
    price: 7000,
    originalPrice: 7000,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "5 Star",
    deliveryAvailable: true,
    image: productImagePath("wm-lg-turbodrum-6-5kg"),
    specs: ["6.5 kg", "Turbo Drum", "Fully Automatic", "Top Load"],
    tag: "New",
    popularity: 90,
    salesRank: 6,
    createdAt: "2026-07-16",
  },
  {
    id: "wm-lg-smart-inverter-8kg",
    name: "LG Smart Inverter 8 kg Fully Automatic Top Load Washing Machine",
    brand: "LG",
    categoryId: "washing-machines",
    capacity: "8 kg",
    capacityLiters: 8,
    price: 9000,
    originalPrice: 9000,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "5 Star",
    deliveryAvailable: true,
    image: productImagePath("wm-lg-smart-inverter-8kg"),
    specs: ["8 kg", "Smart Inverter", "Fully Automatic", "Top Load"],
    tag: "New",
    popularity: 93,
    salesRank: 3,
    createdAt: "2026-07-16",
  },
  {
    id: "wm-samsung-wobble-6-2kg",
    name: "Samsung Wobble Diamond Drum 6.2 kg Fully Automatic Washing Machine",
    brand: "Samsung",
    categoryId: "washing-machines",
    capacity: "6.2 kg",
    capacityLiters: 6.2,
    price: 7500,
    originalPrice: 7500,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "5 Star",
    deliveryAvailable: true,
    image: productImagePath("wm-samsung-wobble-6-2kg"),
    specs: ["6.2 kg", "Wobble", "Diamond Drum", "Fully Automatic"],
    tag: "New",
    popularity: 89,
    salesRank: 7,
    createdAt: "2026-07-16",
  },
  {
    id: "wm-ifb-6kg",
    name: "IFB 6 kg Front Load Fully Automatic Washing Machine",
    brand: "IFB",
    categoryId: "washing-machines",
    capacity: "6 kg",
    capacityLiters: 6,
    price: 9000,
    originalPrice: 13999,
    condition: "Like New",
    warranty: "1 Year",
    energyRating: "5 Star",
    deliveryAvailable: true,
    image: productImagePath("wm-ifb-6kg"),
    specs: ["6 kg", "Front Load", "Fully Automatic"],
    popularity: 89,
    salesRank: 12,
    createdAt: "2026-06-10",
  },
];

export const SHOP_BRANDS = [...new Set(SHOP_PRODUCTS.map((p) => p.brand))].sort();
export const SHOP_ENERGY_RATINGS = [...new Set(SHOP_PRODUCTS.map((p) => p.energyRating))].sort();
export const SHOP_CONDITIONS = [...new Set(SHOP_PRODUCTS.map((p) => p.condition))].sort();

export type ShopFilterState = {
  brands: string[];
  priceMin: number | null;
  priceMax: number | null;
  capacities: string[];
  warranties: string[];
  energyRatings: string[];
  conditions: string[];
  deliveryOnly: boolean;
};

export const DEFAULT_FILTERS: ShopFilterState = {
  brands: [],
  priceMin: null,
  priceMax: null,
  capacities: [],
  warranties: [],
  energyRatings: [],
  conditions: [],
  deliveryOnly: false,
};

export const PRICE_PRESETS = [
  { label: "Under ₹8,000", min: 0, max: 8000 },
  { label: "₹8,000 – ₹10,000", min: 8000, max: 10000 },
  { label: "₹10,000 – ₹12,000", min: 10000, max: 12000 },
  { label: "₹12,000 – ₹15,000", min: 12000, max: 15000 },
] as const;

export const CAPACITY_OPTIONS = ["Under 200L", "200–300L", "300–400L", "400L+"] as const;

export function getCategoryBySlug(slug?: string): ShopCategory | null {
  if (!slug) return null;
  return SHOP_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function buildShopPath(categorySlug?: string) {
  return categorySlug ? `/shop/${categorySlug}` : "/shop";
}

export function getWhatsAppProductLink(productName: string, productId: string) {
  const message = `Hi Protronics,

I'm interested in:

${productName}

Product ID:
${productId}

Please share:

• Availability
• Delivery Details
• Warranty Coverage

Thank you.`;
  return `${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function capacityMatches(option: string, liters: number) {
  if (option === "Under 200L") return liters < 200;
  if (option === "200–300L") return liters >= 200 && liters <= 300;
  if (option === "300–400L") return liters > 300 && liters <= 400;
  if (option === "400L+") return liters > 400;
  return true;
}

export function filterProducts(
  products: ShopProduct[],
  categorySlug: string | undefined,
  filters: ShopFilterState,
) {
  return products.filter((p) => {
    if (categorySlug && p.categoryId !== categorySlug) return false;
    if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
    if (filters.priceMin != null && p.price < filters.priceMin) return false;
    if (filters.priceMax != null && p.price > filters.priceMax) return false;
    if (filters.capacities.length && !filters.capacities.some((c) => capacityMatches(c, p.capacityLiters)))
      return false;
    if (filters.warranties.length && !filters.warranties.includes(p.warranty)) return false;
    if (filters.energyRatings.length && !filters.energyRatings.includes(p.energyRating)) return false;
    if (filters.conditions.length && !filters.conditions.includes(p.condition)) return false;
    if (filters.deliveryOnly && !p.deliveryAvailable) return false;
    return true;
  });
}

export function sortProducts(products: ShopProduct[], sort: ShopSortId) {
  const copy = [...products];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "best-selling":
      return copy.sort((a, b) => a.salesRank - b.salesRank);
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "popular":
      return copy.sort((a, b) => b.popularity - a.popularity);
    default:
      return copy;
  }
}

export function isWashingMachineCategory(categoryId: ShopCategoryId) {
  return categoryId === "washing-machines";
}

export function buildCategoryMetadata(slug?: string) {
  const category = getCategoryBySlug(slug);
  if (!category) {
    return {
      title: "Shop Refurbished Appliances | Protronics",
      description:
        "Browse certified refurbished refrigerators and washing machines from trusted brands. Quality tested, sanitized, warranty included, and ready for delivery.",
    };
  }
  const applianceLabel = category.id === "washing-machines" ? "washing machines" : "refrigerators";
  return {
    title: `${category.label} Refurbished ${category.id === "washing-machines" ? "Washing Machines" : "Refrigerators"} | Protronics`,
    description: `Shop certified refurbished ${category.label.toLowerCase()} ${applianceLabel}—100+ quality checks, sanitization, warranty included. ${category.description}.`,
  };
}

export function getShopJsonLd(categorySlug?: string) {
  const products = categorySlug
    ? SHOP_PRODUCTS.filter((p) => p.categoryId === categorySlug)
    : SHOP_PRODUCTS;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: categorySlug
      ? `${getCategoryBySlug(categorySlug)?.label} Appliances`
      : "Protronics Shop",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        brand: p.brand,
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };
}
