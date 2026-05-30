export type BrandShowcase = {
  id: string;
  name: string;
  tagline: string;
};

/** Premium brand showcase — includes Panasonic for full lineup display. */
export const SHOWCASE_BRANDS: BrandShowcase[] = [
  { id: "lg", name: "LG", tagline: "Smart cooling innovation" },
  { id: "samsung", name: "Samsung", tagline: "Digital inverter excellence" },
  { id: "whirlpool", name: "Whirlpool", tagline: "Trusted household performance" },
  { id: "godrej", name: "Godrej", tagline: "Engineered for Indian homes" },
  { id: "haier", name: "Haier", tagline: "Efficient modern design" },
  { id: "panasonic", name: "Panasonic", tagline: "Precision Japanese quality" },
];

export function buildBrandShopPath(brandName: string) {
  return `/shop?brand=${encodeURIComponent(brandName)}`;
}
