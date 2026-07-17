import { SHOP_BRANDS } from "@/lib/shop";

export type BrandShowcase = {
  id: string;
  name: string;
  tagline: string;
};

const BRAND_TAGLINES: Record<string, string> = {
  LG: "Smart cooling innovation",
  Samsung: "Digital inverter excellence",
  Whirlpool: "Trusted household performance",
  Godrej: "Engineered for Indian homes",
  Haier: "Efficient modern design",
  IFB: "Precision wash performance",
};

/** Only brands that currently have products in the shop. */
export const SHOWCASE_BRANDS: BrandShowcase[] = SHOP_BRANDS.map((name) => ({
  id: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  tagline: BRAND_TAGLINES[name] ?? "Certified refurbished quality",
}));

export function buildBrandShopPath(brandName: string) {
  return `/shop?brand=${encodeURIComponent(brandName)}`;
}
