import { BUSINESS } from "@/lib/contact";

export const shopGlass = [
  "rounded-2xl border border-white/[0.08]",
  "bg-black",
  "supports-[backdrop-filter]:bg-black supports-[backdrop-filter]:backdrop-blur-xl",
].join(" ");

export type ShopCategoryId =
  | "single-door"
  | "double-door"
  | "mini-fridges"
  | "premium-hubs"
  | "commercial";

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
  { id: "premium-hubs", slug: "premium-hubs", label: "Premium Hubs", description: "Side-by-side & French door" },
  { id: "commercial", slug: "commercial", label: "Commercial", description: "High-capacity units" },
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
    id: "sf-luxe-320",
    name: "LG Smart Inverter Single Door 320L",
    brand: "LG",
    categoryId: "single-door",
    capacity: "320L",
    capacityLiters: 320,
    price: 18999,
    originalPrice: 25999,
    condition: "Certified Premium",
    warranty: "1 Year",
    energyRating: "4 Star",
    deliveryAvailable: true,
    image: "/featured/featured-1.webp",
    specs: ["Inverter", "Stabilizer Free", "Deodorizer"],
    tag: "Most Popular",
    popularity: 98,
    salesRank: 1,
    createdAt: "2026-03-12",
  },
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
    image: "/featured/featured-4.webp",
    specs: ["Quick Chill", "Low Power", "Compact"],
    popularity: 86,
    salesRank: 5,
    createdAt: "2026-02-20",
  },
  {
    id: "df-samsung-340",
    name: "Samsung Digital Inverter Double Door 340L",
    brand: "Samsung",
    categoryId: "double-door",
    capacity: "340L",
    capacityLiters: 340,
    price: 23999,
    originalPrice: 31999,
    condition: "Like New",
    warranty: "1 Year",
    energyRating: "5 Star",
    deliveryAvailable: true,
    image: "/featured/featured-2.webp",
    specs: ["Frost Free", "Twin Cooling", "Low Noise"],
    tag: "Best Seller",
    popularity: 95,
    salesRank: 2,
    createdAt: "2026-03-01",
  },
  {
    id: "df-whirlpool-360",
    name: "Whirlpool Protton Convertible 360L",
    brand: "Whirlpool",
    categoryId: "double-door",
    capacity: "360L",
    capacityLiters: 360,
    price: 26999,
    originalPrice: 34999,
    condition: "Certified Premium",
    warranty: "1 Year",
    energyRating: "Inverter",
    deliveryAvailable: true,
    image: "/featured/featured-5.webp",
    specs: ["Convertible", "Power Cool", "360L"],
    popularity: 91,
    salesRank: 3,
    createdAt: "2026-02-28",
  },
  {
    id: "df-haier-300",
    name: "Haier Bottom Mount Frost Free 300L",
    brand: "Haier",
    categoryId: "double-door",
    capacity: "300L",
    capacityLiters: 300,
    price: 21999,
    originalPrice: 28999,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "4 Star",
    deliveryAvailable: true,
    image: "/featured/featured-3.webp",
    specs: ["Frost Free", "300L", "Energy Saver"],
    tag: "New",
    popularity: 88,
    salesRank: 4,
    createdAt: "2026-04-02",
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
    image: "/featured/featured-4.webp",
    specs: ["190L", "Space Optimized", "Quick Chill"],
    popularity: 82,
    salesRank: 6,
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
    image: "/featured/featured-4.webp",
    specs: ["170L", "Low Power", "Dorm Ready"],
    popularity: 79,
    salesRank: 8,
    createdAt: "2026-02-10",
  },
  {
    id: "prem-samsung-580",
    name: "Samsung Family Hub Side-by-Side 580L",
    brand: "Samsung",
    categoryId: "premium-hubs",
    capacity: "580L",
    capacityLiters: 580,
    price: 54999,
    originalPrice: 74999,
    condition: "Certified Premium",
    warranty: "1 Year",
    energyRating: "Inverter",
    deliveryAvailable: true,
    image: "/featured/featured-6.webp",
    specs: ["580L", "Premium Finish", "Smart Shelves"],
    tag: "Most Popular",
    popularity: 93,
    salesRank: 7,
    createdAt: "2026-03-18",
  },
  {
    id: "prem-lg-650",
    name: "LG InstaView French Door 650L",
    brand: "LG",
    categoryId: "premium-hubs",
    capacity: "650L",
    capacityLiters: 650,
    price: 62999,
    originalPrice: 84999,
    condition: "Like New",
    warranty: "1 Year",
    energyRating: "5 Star",
    deliveryAvailable: true,
    image: "/featured/featured-6.webp",
    specs: ["650L", "InstaView", "Door Cooling+"],
    popularity: 90,
    salesRank: 9,
    createdAt: "2026-04-05",
  },
  {
    id: "com-whirlpool-850",
    name: "Whirlpool Commercial Cooler 850L",
    brand: "Whirlpool",
    categoryId: "commercial",
    capacity: "850L",
    capacityLiters: 850,
    price: 48999,
    originalPrice: 64999,
    condition: "Certified Premium",
    warranty: "1 Year",
    energyRating: "4 Star",
    deliveryAvailable: true,
    image: "/featured/featured-5.webp",
    specs: ["850L", "Heavy Duty", "Fast Recovery"],
    popularity: 76,
    salesRank: 10,
    createdAt: "2026-01-28",
  },
  {
    id: "com-haier-720",
    name: "Haier Display Refrigerator 720L",
    brand: "Haier",
    categoryId: "commercial",
    capacity: "720L",
    capacityLiters: 720,
    price: 45999,
    originalPrice: 59999,
    condition: "Excellent",
    warranty: "1 Year",
    energyRating: "3 Star",
    deliveryAvailable: false,
    image: "/featured/featured-1.webp",
    specs: ["720L", "Display Ready", "Commercial Grade"],
    popularity: 72,
    salesRank: 11,
    createdAt: "2026-02-05",
  },
  {
    id: "sf-samsung-280",
    name: "Samsung Single Door 280L",
    brand: "Samsung",
    categoryId: "single-door",
    capacity: "280L",
    capacityLiters: 280,
    price: 16999,
    originalPrice: 22999,
    condition: "Like New",
    warranty: "1 Year",
    energyRating: "4 Star",
    deliveryAvailable: true,
    image: "/featured/featured-1.webp",
    specs: ["280L", "Digital Inverter", "Toughened Glass"],
    tag: "New",
    popularity: 84,
    salesRank: 12,
    createdAt: "2026-04-08",
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
  { label: "Under ₹15,000", min: 0, max: 15000 },
  { label: "₹15,000 – ₹20,000", min: 15000, max: 20000 },
  { label: "₹20,000 – ₹30,000", min: 20000, max: 30000 },
  { label: "₹30,000+", min: 30000, max: 999999 },
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

export function buildCategoryMetadata(slug?: string) {
  const category = getCategoryBySlug(slug);
  if (!category) {
    return {
      title: "Shop Premium Renewed Appliances | Protronics",
      description:
        "Browse professionally restored refrigerators—tested, sanitized, and warranty protected. Single door, double door, mini, premium & commercial.",
    };
  }
  return {
    title: `${category.label} Refrigerators | Protronics Shop`,
    description: `Shop premium renewed ${category.label.toLowerCase()} refrigerators—100+ checks, sanitization, warranty included. ${category.description}.`,
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
      ? `${getCategoryBySlug(categorySlug)?.label} Refrigerators`
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
