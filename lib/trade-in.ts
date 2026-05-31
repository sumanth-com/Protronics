import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  Leaf,
  Microwave,
  Package,
  Refrigerator,
  ShieldCheck,
  Sparkles,
  Truck,
  WashingMachine,
  Zap,
} from "lucide-react";
import { BUSINESS } from "@/lib/contact";

export const SELL_PAGE_PATH = "/sell" as const;

export const tradeInGlass = [
  "rounded-2xl border border-theme-border bg-theme-surface-card",
  "shadow-theme-sm",
].join(" ");

export const tradeInSection = "bg-theme-bg text-theme-fg";

export const TRADE_IN_LINKS = {
  valuation: "#sell-form",
  estimator: "#estimator",
  whatsapp: BUSINESS.whatsappMessage,
  shop: "/shop",
} as const;

export const TRADE_IN_TRUST_STATS = [
  { label: "500+ Trade-Ins Completed", icon: Sparkles },
  { label: "Free Evaluation", icon: ClipboardCheck },
  { label: "Fair Market Pricing", icon: CircleDollarSign },
  { label: "Pickup Assistance", icon: Truck },
  { label: "Fast Response", icon: Clock },
] as const;

export type ApplianceTypeId =
  | "refrigerator"
  | "washing-machine"
  | "air-conditioner"
  | "microwave"
  | "dishwasher"
  | "small-appliance";

export type ApplianceCategory = {
  id: ApplianceTypeId;
  label: string;
  icon: LucideIcon;
  baseValue: number;
  image?: string;
};

export const APPLIANCE_CATEGORIES: ApplianceCategory[] = [
  {
    id: "refrigerator",
    label: "Refrigerators",
    icon: Refrigerator,
    baseValue: 14000,
    image: "/featured/featured-1.webp",
  },
  {
    id: "washing-machine",
    label: "Washing Machines",
    icon: WashingMachine,
    baseValue: 9000,
    image: "/featured/featured-2.webp",
  },
  {
    id: "air-conditioner",
    label: "Air Conditioners",
    icon: AirVent,
    baseValue: 11000,
    image: "/featured/featured-3.webp",
  },
  {
    id: "microwave",
    label: "Microwaves",
    icon: Microwave,
    baseValue: 2500,
    image: "/featured/featured-4.webp",
  },
  {
    id: "dishwasher",
    label: "Dishwashers",
    icon: WashingMachine,
    baseValue: 7000,
    image: "/featured/featured-5.webp",
  },
  {
    id: "small-appliance",
    label: "Small Appliances",
    icon: Package,
    baseValue: 1800,
    image: "/featured/featured-2.webp",
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
  "Other",
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

export const WORKING_STATUS_OPTIONS = [
  "Fully working",
  "Partially working",
  "Not working",
] as const;

export const LOCATION_OPTIONS = [
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Mumbai",
  "Pune",
  "Other",
] as const;

export type LocationOption = (typeof LOCATION_OPTIONS)[number];
export type AgeOption = (typeof AGE_OPTIONS)[number];
export type ConditionOption = (typeof CONDITION_OPTIONS)[number];
export type WorkingStatusOption = (typeof WORKING_STATUS_OPTIONS)[number];

const BRAND_MULTIPLIER: Record<string, number> = {
  LG: 1.12,
  Samsung: 1.1,
  Whirlpool: 1.05,
  Bosch: 1.08,
  Haier: 0.98,
  Godrej: 1.02,
  IFB: 1.04,
  Other: 0.92,
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

const WORKING_MULTIPLIER: Record<WorkingStatusOption, number> = {
  "Fully working": 1,
  "Partially working": 0.72,
  "Not working": 0.38,
};

export type TradeInEstimateInput = {
  applianceType: ApplianceTypeId;
  brand: string;
  age: AgeOption;
  condition: ConditionOption;
  workingStatus?: WorkingStatusOption;
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
  const workMul = WORKING_MULTIPLIER[input.workingStatus ?? "Fully working"] ?? 1;

  const mid = Math.round(category.baseValue * brandMul * ageMul * condMul * workMul);
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
    description: "Share brand, model, age, and condition—takes under two minutes.",
  },
  {
    step: 2,
    title: "Receive Estimated Value",
    description: "Get an instant trade-in range online, then a detailed offer from our team.",
  },
  {
    step: 3,
    title: "Schedule Verification",
    description: "Book a convenient doorstep check—free, with no obligation.",
  },
  {
    step: 4,
    title: "Get Paid or Upgrade",
    description: "Accept cash value or apply credit toward a premium Protronics appliance.",
  },
] as const;

export const TRADE_IN_BENEFITS = [
  {
    icon: CircleDollarSign,
    title: "Fair Pricing",
    description: "Market-aligned valuations—not scrap-yard quotes.",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description: "Team replies within hours on WhatsApp and phone.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Process",
    description: "Transparent steps from estimate to pickup or upgrade.",
  },
  {
    icon: Sparkles,
    title: "Upgrade Options",
    description: "Apply trade-in credit toward certified refurbished stock.",
  },
  {
    icon: ClipboardCheck,
    title: "Easy Evaluation",
    description: "Upload photos online—no dealer visits required to start.",
  },
  {
    icon: Leaf,
    title: "Safe Handling",
    description: "Responsible recycling when units reach end of life.",
  },
  {
    icon: Truck,
    title: "Professional Pickup",
    description: "Doorstep collection handled carefully by our crew.",
  },
] as const;

/** @deprecated Use TRADE_IN_BENEFITS */
export const TRADE_IN_WHY = TRADE_IN_BENEFITS;

export const TRADE_IN_STORIES = [
  {
    appliance: "LG Refrigerator",
    soldFor: "₹7,500",
    outcome: "Upgraded to Double Door Model",
    name: "Priya M.",
    location: "Indiranagar, Bengaluru",
  },
  {
    appliance: "Samsung Refrigerator",
    soldFor: "₹5,000",
    outcome: "Used trade-in credit toward upgrade",
    name: "Rahul K.",
    location: "Whitefield, Bengaluru",
  },
  {
    appliance: "Whirlpool Single Door",
    soldFor: "₹4,200",
    outcome: "Non-working unit still received fair value after verification",
    name: "Anita S.",
    location: "Electronic City, Bengaluru",
  },
] as const;

export const TRADE_IN_FAQS = [
  {
    question: "How is value calculated?",
    answer:
      "We combine appliance type, brand, age, condition, and working status with current market demand. You see an instant range online; the final offer is confirmed after verification.",
  },
  {
    question: "Do you provide pickup?",
    answer:
      "Yes. Once you accept the offer, we schedule hassle-free pickup in serviceable areas. Our team handles safe removal.",
  },
  {
    question: "Can I sell without buying?",
    answer:
      "Yes. You can sell outright for cash value. Trade-in credit toward a Protronics upgrade is optional—not required.",
  },
  {
    question: "Can I trade non-working appliances?",
    answer:
      "Often yes. Non-working units may receive a lower offer, but many still hold recovery value. Share photos and we will advise honestly.",
  },
  {
    question: "How long does evaluation take?",
    answer:
      "Online estimates are instant. After you submit the form, our team typically responds within a few business hours.",
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
  "@graph": [
    {
      "@type": "WebPage",
      name: "Sell Old Appliances | Trade-In Program | Protronics",
      description:
        "Trade in or sell your old refrigerator and appliances. Get a fair valuation, upgrade affordably, and enjoy a hassle-free experience with Protronics.",
      url: "https://protronics.in/sell",
    },
    {
      "@type": "FAQPage",
      mainEntity: TRADE_IN_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};
