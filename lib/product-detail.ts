import { BUSINESS } from "@/lib/contact";
import { PRODUCT_GALLERY } from "@/lib/product-images";
import { absoluteUrl } from "@/lib/site";
import {
  SHOP_PRODUCTS,
  getCategoryBySlug,
  isWashingMachineCategory,
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

export function enrichProductDetail(product: ShopProduct): ProductDetail {
  const customGallery = PRODUCT_GALLERY[product.id];
  const categoryPeers = SHOP_PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  ).map((p) => p.image);

  const images = customGallery
    ? customGallery
    : Array.from(new Set([product.image, ...categoryPeers])).slice(0, 4);

  const applianceType = isWashingMachineCategory(product.categoryId)
    ? "washing machine"
    : "refrigerator";

  const isLg190Inverter = product.id === "sf-lg-190";

  return {
    ...product,
    images,
    availability: product.deliveryAvailable ? "In Stock" : "Enquire for Availability",
    description: isLg190Inverter
      ? `LG 190 litre inverter single door refrigerator—listed at ₹9,999 (₹11,000 before discount). Includes 1-year compressor warranty, 6 months free doorstep service warranty, and free home delivery. Professionally inspected, deep sanitized, and performance certified.`
      : `Professionally renewed ${product.brand} ${product.capacity} ${applianceType}—100+ point inspected, deep sanitized, and performance certified before listing.`,
    inspection: [
      { label: "Cooling Test", score: "Optimal", passed: true },
      { label: "Door Seal Test", score: "Excellent", passed: true },
      { label: "Noise Test", score: "Within spec", passed: true },
      { label: "Power Consumption", score: product.energyRating, passed: true },
      { label: "Interior Condition", score: "Sanitized", passed: true },
      { label: "Exterior Condition", score: product.condition, passed: true },
    ],
    highlights: isLg190Inverter
      ? [
          {
            title: "Inverter Model",
            description: "190 litre LG inverter refrigerator for efficient everyday cooling.",
          },
          {
            title: "Warranty Bundle",
            description:
              "1-year compressor warranty plus 6 months free doorstep service warranty.",
          },
          {
            title: "Free Home Delivery",
            description: "Doorstep delivery included after confirmation in our service area.",
          },
        ]
      : [
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
    warrantyCoverage: isLg190Inverter
      ? [
          "1-year compressor warranty",
          "6 months free service warranty at your doorstep",
          "Compressor & cooling system defects",
          "Service support via WhatsApp & phone",
        ]
      : [
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
  if (product.categoryId === "washing-machines") {
    return ["Families", "Apartments", "Rental Homes"];
  }
  if (product.capacityLiters >= 500) return ["Families", "Premium Homes", "Office Spaces"];
  return ["Families", "Apartments", "Rental Homes"];
}

export function getProductById(id: string): ProductDetail | null {
  const base = SHOP_PRODUCTS.find((p) => p.id === id);
  if (!base) return null;
  return enrichProductDetail(base);
}

export function getProductBySlug(slug: string): ProductDetail | null {
  return getProductById(slug);
}

export function getAllProductSlugs() {
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
  return `/product/${id}`;
}

export function getWhatsAppInquiryLink(
  product: Pick<ShopProduct, "name" | "id" | "brand" | "capacity" | "price" | "warranty"> | string,
  productId?: string,
) {
  // Back-compat: older call sites passed (name, id)
  const name = typeof product === "string" ? product : product.name;
  const id = typeof product === "string" ? (productId ?? "") : product.id;
  const brand = typeof product === "string" ? "" : product.brand;
  const capacity = typeof product === "string" ? "" : product.capacity;
  const price = typeof product === "string" ? null : product.price;
  const warranty = typeof product === "string" ? "" : product.warranty;

  const details = [
    name,
    brand && capacity ? `${brand} · ${capacity}` : null,
    price != null ? `Price: ₹${price.toLocaleString("en-IN")}` : null,
    warranty ? `Warranty: ${warranty}` : null,
    id ? `Product ID: ${id}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const message = `Hi Protronics,

I'm interested in this appliance:

${details}

Please share:
• Availability
• Delivery details
• Warranty coverage

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
  const applianceLabel = isWashingMachineCategory(product.categoryId)
    ? "Washing Machine"
    : "Refrigerator";
  return {
    title: `${product.name} | Refurbished ${applianceLabel} | Protronics`,
    description: `Buy the ${product.name} refurbished ${applianceLabel.toLowerCase()} from Protronics. Professionally tested, sanitized, ${product.warranty} warranty included, and ready for delivery in Bengaluru.`,
    categoryLabel: category?.label ?? applianceLabel,
  };
}

export function getProductJsonLd(product: ProductDetail) {
  const productUrl = absoluteUrl(`/product/${product.id}`);
  const validUntil = new Date();
  validUntil.setMonth(validUntil.getMonth() + 3);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    mpn: product.id,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    image: product.images.map((img) =>
      img.startsWith("http") ? img : absoluteUrl(img),
    ),
    category: getCategoryBySlug(product.categoryId)?.label ?? "Refrigerator",
    url: productUrl,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      priceValidUntil: validUntil.toISOString().slice(0, 10),
      availability: product.deliveryAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: productUrl,
      itemCondition: "https://schema.org/RefurbishedCondition",
      seller: {
        "@type": "Organization",
        name: "Protronics",
        url: absoluteUrl("/"),
      },
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
