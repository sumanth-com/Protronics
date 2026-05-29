import { BUSINESS } from "@/lib/contact";
import {
  SHOP_PRODUCTS,
  getCategoryBySlug,
  type ShopProduct,
} from "@/lib/shop";

export type InspectionResult = {
  label: string;
  score: string;
  passed: boolean;
};

export type ProductHighlight = {
  title: string;
  description: string;
};

export type ProductDetail = ShopProduct & {
  images: string[];
  availability: "In Stock" | "Limited Units" | "Enquire for Availability";
  description: string;
  inspection: InspectionResult[];
  highlights: ProductHighlight[];
  idealFor: string[];
  warrantyCoverage: string[];
  deliveryTimeline: string;
  installationSupport: string;
};

const IMAGE_ANGLES = [
  "/featured/featured-1.jpg",
  "/featured/featured-2.jpg",
  "/featured/featured-3.jpg",
  "/featured/featured-4.jpg",
];

function hashIndex(id: string, max: number) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i)) % max;
  return h;
}

export function enrichProductDetail(product: ShopProduct): ProductDetail {
  const idx = hashIndex(product.id, IMAGE_ANGLES.length);
  const images = [
    product.image,
    IMAGE_ANGLES[(idx + 1) % IMAGE_ANGLES.length]!,
    IMAGE_ANGLES[(idx + 2) % IMAGE_ANGLES.length]!,
    IMAGE_ANGLES[(idx + 3) % IMAGE_ANGLES.length]!,
  ];

  return {
    ...product,
    images,
    availability: product.deliveryAvailable ? "In Stock" : "Enquire for Availability",
    description: `Professionally renewed ${product.brand} ${product.capacity} unit—100+ point inspected, deep sanitized, and performance certified before listing.`,
    inspection: [
      { label: "Cooling Test", score: "Optimal", passed: true },
      { label: "Door Seal Test", score: "Excellent", passed: true },
      { label: "Noise Test", score: "Within spec", passed: true },
      { label: "Power Consumption", score: product.energyRating, passed: true },
      { label: "Interior Condition", score: "Sanitized", passed: true },
      { label: "Exterior Condition", score: product.condition, passed: true },
    ],
    highlights: [
      {
        title: "Verified Performance",
        description: "Cooling, seals, and sensors tested under load before certification.",
      },
      {
        title: "Premium Restoration",
        description: "Cosmetic refinement and professional sanitization inside and out.",
      },
      {
        title: "Warranty Backed",
        description: `${product.warranty} coverage with human support when you need it.`,
      },
    ],
    idealFor: getIdealFor(product),
    warrantyCoverage: [
      "Compressor & cooling system defects",
      "Thermostat and sensor failures",
      "Electrical faults at delivery",
      "Service support via WhatsApp & phone",
    ],
    deliveryTimeline: product.deliveryAvailable
      ? "24–72 hours in Bengaluru metro after confirmation"
      : "Confirm pin code with our team",
    installationSupport: "White-glove placement, leveling, and cooling test included",
  };
}

function getIdealFor(product: ShopProduct): string[] {
  if (product.categoryId === "mini-fridges") return ["Apartments", "Office Spaces", "Rental Homes"];
  if (product.categoryId === "commercial") return ["Office Spaces", "Rental Homes", "Families"];
  if (product.capacityLiters >= 500) return ["Families", "Premium Homes", "Office Spaces"];
  return ["Families", "Apartments", "Rental Homes"];
}

export function getProductById(id: string): ProductDetail | null {
  const base = SHOP_PRODUCTS.find((p) => p.id === id);
  if (!base) return null;
  return enrichProductDetail(base);
}

export function getAllProductIds() {
  return SHOP_PRODUCTS.map((p) => p.id);
}

export function getRelatedProducts(productId: string, limit = 4): ShopProduct[] {
  const current = SHOP_PRODUCTS.find((p) => p.id === productId);
  if (!current) return [];
  return SHOP_PRODUCTS.filter(
    (p) => p.id !== productId && p.categoryId === current.categoryId,
  )
    .slice(0, limit)
    .concat(
      SHOP_PRODUCTS.filter(
        (p) => p.id !== productId && p.categoryId !== current.categoryId,
      ).slice(0, Math.max(0, limit - 2)),
    )
    .slice(0, limit);
}

export function buildProductPath(id: string) {
  return `/shop/product/${id}`;
}

export function getWhatsAppInquiryLink(productName: string, productId: string) {
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

export function getWhatsAppReserveSuccessLink(productName: string, referenceId: string) {
  const message = `Hi Protronics,

I've reserved an appliance.

Product: ${productName}
Reference ID: ${referenceId}

Please confirm availability and delivery details.`;
  return `${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildProductMetadata(product: ProductDetail) {
  const category = getCategoryBySlug(product.categoryId);
  return {
    title: `${product.name} | Protronics`,
    description: `${product.brand} ${product.capacity} refurbished refrigerator—${product.condition}, ${product.warranty} warranty. From ₹${product.price.toLocaleString("en-IN")}.`,
    categoryLabel: category?.label ?? "Refrigerators",
  };
}

export function getProductJsonLd(product: ProductDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    image: product.images[0],
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Protronics" },
    },
  };
}

export const TRUST_BADGES = [
  "100+ Point Tested",
  "Sanitized",
  "Warranty Included",
  "Performance Certified",
  "Safe Delivery",
] as const;

export const IDEAL_FOR_CARDS = [
  { title: "Families", description: "Reliable daily cooling with warranty peace of mind." },
  { title: "Apartments", description: "Right-sized capacity with efficient power draw." },
  { title: "Office Spaces", description: "Quiet operation and professional finish." },
  { title: "Rental Homes", description: "Certified quality tenants can trust." },
] as const;
