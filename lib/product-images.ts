/** Semantic product image filenames (assets + public/images/) */
export const REFRIGERATOR_IMAGE_FILES: Record<string, string> = {
  "sf-luxe-320": "lg-smart-inverter-single-door-320l.webp",
  "sf-godrej-240": "godrej-edge-pro-single-door-240l.webp",
  "sf-lg-190": "lg-single-door-190l.webp",
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

export const WASHING_MACHINE_IMAGE_FILES: Record<string, string> = {
  "wm-samsung-7kg": "samsung-wm-7kg.webp",
  "wm-ifb-6kg": "ifb-wm-6kg.webp",
};

const IMAGE_ROOTS = {
  refrigerators: "/images/refrigerators",
  washingMachines: "/images/washing-machines",
  products: "/products",
} as const;

/** Shop-by-category cover images (your product photos). */
export const CATEGORY_COVER_IMAGES = {
  "mini-fridges": imageUrl("refrigerators", "haier-compact-mini-fridge-190l.webp"),
  "single-door": imageUrl("refrigerators", REFRIGERATOR_IMAGE_FILES["sf-lg-190"]!),
  "double-door": imageUrl("refrigerators", REFRIGERATOR_IMAGE_FILES["df-samsung-340"]!),
  "washing-machines": imageUrl("washingMachines", WASHING_MACHINE_IMAGE_FILES["wm-samsung-7kg"]!),
} as const;

function imageUrl(folder: keyof typeof IMAGE_ROOTS, file: string) {
  return `${IMAGE_ROOTS[folder]}/${file}`;
}

function galleryUrls(folder: keyof typeof IMAGE_ROOTS, baseFile: string, total: number) {
  const stem = baseFile.replace(/\.webp$/, "");
  return Array.from({ length: total }, (_, index) => {
    const suffix = index === 0 ? "" : `-${index + 1}`;
    return imageUrl(folder, `${stem}${suffix}.webp`);
  });
}

/** Product card / shop image URL */
export function productImagePath(productId: string) {
  const fridgeFile = REFRIGERATOR_IMAGE_FILES[productId];
  if (fridgeFile) return imageUrl("refrigerators", fridgeFile);

  const washerFile = WASHING_MACHINE_IMAGE_FILES[productId];
  if (washerFile) return imageUrl("washingMachines", washerFile);

  return imageUrl("products", `${productId}.webp`);
}

/** Product-specific detail gallery (overrides category peer fallback) */
export const PRODUCT_GALLERY: Partial<Record<string, string[]>> = {
  "df-samsung-340": [
    "/products/df-samsung-340-sp1.webp",
    "/products/df-samsung-340-sp2.webp",
    "/products/df-samsung-340-sp3.webp",
    "/products/df-samsung-340-sp4.webp",
  ],
  "sf-lg-190": galleryUrls("refrigerators", REFRIGERATOR_IMAGE_FILES["sf-lg-190"]!, 4),
  "wm-samsung-7kg": galleryUrls("washingMachines", WASHING_MACHINE_IMAGE_FILES["wm-samsung-7kg"]!, 5),
  "wm-ifb-6kg": galleryUrls("washingMachines", WASHING_MACHINE_IMAGE_FILES["wm-ifb-6kg"]!, 5),
};

export const DEFAULT_PRODUCT_IMAGE = productImagePath("sf-luxe-320");
