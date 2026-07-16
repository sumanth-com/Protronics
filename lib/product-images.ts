/** Semantic product image filenames (assets + public/images/) */
export const REFRIGERATOR_IMAGE_FILES: Record<string, string> = {
  "sf-godrej-240": "godrej-edge-pro-single-door-240l.webp",
  "sf-lg-190": "lg-single-door-190l.webp",
  "sf-godrej-edge-190": "godrej-edge-pro-190l.webp",
  "df-whirlpool-protton-260": "whirlpool-protton-triple-door-260l.webp",
  "mini-haier-190": "haier-compact-mini-fridge-190l.webp",
  "mini-lg-170": "lg-direct-cool-mini-170l.webp",
};

export const WASHING_MACHINE_IMAGE_FILES: Record<string, string> = {
  "wm-samsung-7kg": "samsung-wm-7kg.webp",
  "wm-ifb-6kg": "ifb-wm-6kg.webp",
  "wm-lg-turbodrum-6kg": "lg-turbodrum-6kg.webp",
  "wm-lg-turbodrum-6-5kg": "lg-turbodrum-6-5kg.webp",
  "wm-lg-smart-inverter-8kg": "lg-smart-inverter-8kg.webp",
  "wm-samsung-wobble-6-2kg": "samsung-wobble-diamond-6-2kg.webp",
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
  "double-door": imageUrl(
    "refrigerators",
    REFRIGERATOR_IMAGE_FILES["df-whirlpool-protton-260"]!,
  ),
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
  "sf-lg-190": galleryUrls("refrigerators", REFRIGERATOR_IMAGE_FILES["sf-lg-190"]!, 5),
  "sf-godrej-edge-190": galleryUrls(
    "refrigerators",
    REFRIGERATOR_IMAGE_FILES["sf-godrej-edge-190"]!,
    5,
  ),
  "df-whirlpool-protton-260": galleryUrls(
    "refrigerators",
    REFRIGERATOR_IMAGE_FILES["df-whirlpool-protton-260"]!,
    5,
  ),
  "wm-samsung-7kg": galleryUrls("washingMachines", WASHING_MACHINE_IMAGE_FILES["wm-samsung-7kg"]!, 5),
  "wm-ifb-6kg": galleryUrls("washingMachines", WASHING_MACHINE_IMAGE_FILES["wm-ifb-6kg"]!, 5),
  "wm-lg-turbodrum-6kg": galleryUrls(
    "washingMachines",
    WASHING_MACHINE_IMAGE_FILES["wm-lg-turbodrum-6kg"]!,
    5,
  ),
  "wm-lg-turbodrum-6-5kg": galleryUrls(
    "washingMachines",
    WASHING_MACHINE_IMAGE_FILES["wm-lg-turbodrum-6-5kg"]!,
    5,
  ),
  "wm-lg-smart-inverter-8kg": galleryUrls(
    "washingMachines",
    WASHING_MACHINE_IMAGE_FILES["wm-lg-smart-inverter-8kg"]!,
    5,
  ),
  "wm-samsung-wobble-6-2kg": galleryUrls(
    "washingMachines",
    WASHING_MACHINE_IMAGE_FILES["wm-samsung-wobble-6-2kg"]!,
    5,
  ),
};

export const DEFAULT_PRODUCT_IMAGE = productImagePath("sf-lg-190");
