/** Semantic refrigerator image filenames (assets + public/images/refrigerators/) */
export const REFRIGERATOR_IMAGE_FILES: Record<string, string> = {
  "sf-luxe-320": "lg-smart-inverter-single-door-320l.webp",
  "sf-godrej-240": "godrej-edge-pro-single-door-240l.webp",
  "df-samsung-340": "samsung-digital-inverter-double-door-340l.webp",
  "df-whirlpool-360": "whirlpool-protton-convertible-360l.webp",
  "df-haier-300": "haier-bottom-mount-frost-free-300l.webp",
  "mini-haier-190": "haier-compact-mini-fridge-190l.webp",
  "mini-lg-170": "lg-direct-cool-mini-170l.webp",
  "prem-samsung-580": "samsung-family-hub-side-by-side-580l.webp",
  "prem-lg-650": "lg-instaview-french-door-650l.webp",
  "com-whirlpool-850": "whirlpool-commercial-cooler-850l.webp",
  "com-haier-720": "haier-display-refrigerator-720l.webp",
  "sf-samsung-280": "samsung-single-door-280l.webp",
};

const REFRIGERATOR_IMAGE_BASE = "/images/refrigerators";

/** Product card / shop image URL */
export function productImagePath(productId: string) {
  const file = REFRIGERATOR_IMAGE_FILES[productId];
  if (file) return `${REFRIGERATOR_IMAGE_BASE}/${file}`;
  return `/products/${productId}.webp`;
}

/** Product-specific detail gallery (overrides category peer fallback) */
export const PRODUCT_GALLERY: Partial<Record<string, string[]>> = {
  "df-samsung-340": [
    "/products/df-samsung-340-sp1.webp",
    "/products/df-samsung-340-sp2.webp",
    "/products/df-samsung-340-sp3.webp",
    "/products/df-samsung-340-sp4.webp",
  ],
};

export const DEFAULT_PRODUCT_IMAGE = productImagePath("sf-luxe-320");
