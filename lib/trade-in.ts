import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  ClipboardCheck,
  Headset,
  Microwave,
  Refrigerator,
  ShieldCheck,
  Truck,
  WashingMachine,
} from "lucide-react";
import { BUSINESS } from "@/lib/contact";

export const TRADE_IN_ACCENT = "#ffffff";

export const tradeInGlass = [
  "rounded-3xl border border-white/12 bg-black",
  "shadow-[0_30px_100px_rgba(0,0,0,0.55)]",
].join(" ");

export const TRADE_IN_LINKS = {
  valuation: "#valuation",
  whatsapp:
    "https://wa.me/919000000000?text=Hi%20Protronics%2C%20I%27d%20like%20help%20with%20a%20trade-in%20valuation%20for%20my%20appliance.",
  shop: "/shop",
} as const;

export type ApplianceTypeId =
  | "refrigerator"
  | "washing-machine"
  | "air-conditioner"
  | "microwave"
  | "dishwasher";

export type ApplianceCategory = {
  id: ApplianceTypeId;
  label: string;
  icon: LucideIcon;
  baseValue: number;
};

export const APPLIANCE_CATEGORIES: ApplianceCategory[] = [
  { id: "refrigerator", label: "Refrigerators", icon: Refrigerator, baseValue: 14000 },
  {
    id: "washing-machine",
    label: "Washing Machines",
    icon: WashingMachine,
    baseValue: 9000,
  },
  {
    id: "air-conditioner",
    label: "Air Conditioners",
    icon: AirVent,
    baseValue: 11000,
  },
  { id: "microwave", label: "Microwaves", icon: Microwave, baseValue: 2500 },
  {
    id: "dishwasher",
    label: "Dishwashers",
    icon: WashingMachine,
    baseValue: 7000,
  },
];

export const ACCEPTED_BRANDS = [
  "LG",
  "Samsung",
  "Whirlpool",
  "Bosch",
  "Haier",
  "Godrej",
  "IFB",
] as const;

export type AcceptedBrand = (typeof ACCEPTED_BRANDS)[number];

export const AGE_OPTIONS = [
  "Under 2 years",
  "2–4 years",
  "5–7 years",
  "8+ years",
] as const;

export const CONDITION_OPTIONS = [
  "Excellent",
  "Good",
  "Fair",
  "Needs Repair",
] as const;

export type AgeOption = (typeof AGE_OPTIONS)[number];
export type ConditionOption = (typeof CONDITION_OPTIONS)[number];

const BRAND_MULTIPLIER: Record<string, number> = {
  LG: 1.12,
  Samsung: 1.1,
  Whirlpool: 1.05,
  Bosch: 1.08,
  Haier: 0.98,
  Godrej: 1.02,
  IFB: 1.04,
};

const AGE_MULTIPLIER: Record<AgeOption, number> = {
  "Under 2 years": 1,
  "2–4 years": 0.82,
  "5–7 years": 0.62,
  "8+ years": 0.42,
};

const CONDITION_MULTIPLIER: Record<ConditionOption, number> = {
  Excellent: 1,
  Good: 0.86,
  Fair: 0.68,
  "Needs Repair": 0.45,
};

export type TradeInEstimateInput = {
  applianceType: ApplianceTypeId;
  brand: string;
  age: AgeOption;
  condition: ConditionOption;
};

export type TradeInEstimate = {
  low: number;
  high: number;
  mid: number;
};

export function estimateTradeInValue(input: TradeInEstimateInput): TradeInEstimate | null {
  const category = APPLIANCE_CATEGORIES.find((c) => c.id === input.applianceType);
  if (!category || !input.brand) return null;

  const brandMul = BRAND_MULTIPLIER[input.brand] ?? 0.95;
  const ageMul = AGE_MULTIPLIER[input.age] ?? 0.7;
  const condMul = CONDITION_MULTIPLIER[input.condition] ?? 0.75;

  const mid = Math.round(category.baseValue * brandMul * ageMul * condMul);
  const low = Math.round(mid * 0.82);
  const high = Math.round(mid * 1.18);

  return { low, high, mid };
}

export function formatInrRange(low: number, high: number) {
  return `₹${low.toLocaleString("en-IN")} – ₹${high.toLocaleString("en-IN")}`;
}

export const TRADE_IN_STEPS = [
  {
    step: 1,
    title: "Submit Appliance Details",
    description: "Share brand, model, age, and condition in under a minute.",
  },
  {
    step: 2,
    title: "Get Free Evaluation",
    description: "Our experts review your details and provide a fair trade-in range.",
  },
  {
    step: 3,
    title: "Schedule Pickup",
    description: "We arrange a convenient doorstep pickup at no extra hassle.",
  },
  {
    step: 4,
    title: "Receive Offer & Upgrade",
    description: "Accept your offer and upgrade to a premium renewed appliance.",
  },
] as const;

export const TRADE_IN_WHY = [
  {
    icon: ClipboardCheck,
    title: "Free Evaluation",
    description: "No fees, no obligation—just a clear, honest assessment.",
  },
  {
    icon: ShieldCheck,
    title: "Fair Pricing",
    description: "Market-aligned offers backed by professional inspection.",
  },
  {
    icon: Truck,
    title: "Pickup Assistance",
    description: "Doorstep collection handled carefully by our team.",
  },
  {
    icon: Headset,
    title: "Instant Support",
    description: "WhatsApp and phone support from real appliance experts.",
  },
] as const;

export function generateTradeInReferenceId(brand: string): string {
  const code = brand.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase() || "AP";
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
  return `TR-${code}-${year}-${seq}`;
}

export const tradeInPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Trade-In & Upgrade | Protronics",
  description:
    "Trade in your old appliance for fair value and upgrade to a premium professionally renewed appliance through Protronics.",
  url: "https://protronics.in/trade-in",
  provider: {
    "@type": "Organization",
    name: "Protronics",
    telephone: BUSINESS.phone,
  },
};
