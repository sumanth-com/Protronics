import { SHOP_CATEGORIES, SHOP_PRODUCTS } from "@/lib/shop";

export type SearchResult = {
  id: string;
  type: "product" | "category" | "page";
  title: string;
  subtitle?: string;
  href: string;
};

export const POPULAR_SEARCHES = [
  "Double door refrigerator",
  "Samsung fridge",
  "Mini fridge",
  "Best deals",
  "Warranty",
] as const;

const STATIC_PAGES: SearchResult[] = [
  { id: "shop", type: "page", title: "Shop All Refrigerators", href: "/shop" },
  { id: "about", type: "page", title: "About Protronics", href: "/about" },
  { id: "how", type: "page", title: "How It Works", href: "/how-it-works" },
  { id: "warranty", type: "page", title: "Warranty & Support", href: "/warranty" },
  { id: "contact", type: "page", title: "Contact", href: "/contact" },
  { id: "compare", type: "page", title: "Compare Products", href: "/compare" },
  { id: "best-deals", type: "page", title: "Best Deals", href: "/best-deals" },
  { id: "trade-in", type: "page", title: "Trade-In", href: "/trade-in" },
];

function productResults(): SearchResult[] {
  return SHOP_PRODUCTS.map((p) => ({
    id: p.id,
    type: "product" as const,
    title: p.name,
    subtitle: `${p.brand} · ${p.capacity} · ₹${p.price.toLocaleString("en-IN")}`,
    href: `/product/${p.id}`,
  }));
}

function categoryResults(): SearchResult[] {
  return SHOP_CATEGORIES.map((c) => ({
    id: c.id,
    type: "category" as const,
    title: c.label,
    subtitle: c.description,
    href: `/shop/${c.slug}`,
  }));
}

const SEARCH_INDEX: SearchResult[] = [
  ...STATIC_PAGES,
  ...categoryResults(),
  ...productResults(),
];

export function searchSite(query: string, limit = 8): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return SEARCH_INDEX.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q),
  ).slice(0, limit);
}

export function getDefaultSuggestions(): SearchResult[] {
  return [
    ...categoryResults().slice(0, 3),
    ...productResults()
      .filter((p) => p.subtitle?.includes("Best Seller") || p.subtitle?.includes("Most Popular"))
      .slice(0, 2),
    ...STATIC_PAGES.slice(0, 2),
  ].slice(0, 6);
}
