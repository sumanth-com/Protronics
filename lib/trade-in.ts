import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  CircleDollarSign,
  ClipboardCheck,
  Leaf,
  Microwave,
  Refrigerator,
  ShieldCheck,
  Truck,
  WashingMachine,
} from "lucide-react";
import { BUSINESS } from "@/lib/contact";

export const tradeInGlass = [
  "rounded-3xl border border-white/12 bg-black",
  "shadow-[0_30px_100px_rgba(0,0,0,0.55)]",
].join(" ");

export const TRADE_IN_LINKS = {
  valuation: "#trade-in-form",
  estimator: "#estimator",
  whatsapp: BUSINESS.whatsappMessage,
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
  image?: string;
};

export const APPLIANCE_CATEGORIES: ApplianceCategory[] = [
  {
    id: "refrigerator",
    label: "Refrigerators",
    icon: Refrigerator,
    baseValue: 14000,
    image: "/featured/featured-1.jpg",
  },
  {
    id: "washing-machine",
    label: "Washing Machines",
    icon: WashingMachine,
    baseValue: 9000,
    image: "/featured/featured-2.jpg",
  },
  {
    id: "air-conditioner",
    label: "Air Conditioners",
    icon: AirVent,
    baseValue: 11000,
    image: "/featured/featured-3.jpg",
  },
  {
    id: "microwave",
    label: "Microwaves",
    icon: Microwave,
    baseValue: 2500,
    image: "/featured/featured-4.jpg",
  },
  {
    id: "dishwasher",
    label: "Dishwashers",
    icon: WashingMachine,
    baseValue: 7000,
    image: "/featured/featured-5.jpg",
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
    title: "Share Appliance Details",
    description: "Tell us the brand, model, age, condition, and working status.",
  },
  {
    step: 2,
    title: "Get Estimated Value",
    description: "See an instant indicative range—final value confirmed after inspection.",
  },
  {
    step: 3,
    title: "Schedule Inspection",
    description: "We arrange a convenient doorstep evaluation at no extra hassle.",
  },
  {
    step: 4,
    title: "Upgrade & Save",
    description: "Apply trade-in credit toward a premium refurbished Protronics appliance.",
  },
] as const;

export const TRADE_IN_BENEFITS = [
  {
    icon: CircleDollarSign,
    title: "Get Better Value",
    description: "Fair market-aligned offers—not scrap-yard pricing.",
  },
  {
    icon: ClipboardCheck,
    title: "Free Evaluation",
    description: "Professional assessment with zero obligation to trade.",
  },
  {
    icon: Truck,
    title: "Hassle-Free Pickup",
    description: "Doorstep collection handled carefully by our team.",
  },
  {
    icon: ShieldCheck,
    title: "Upgrade Affordably",
    description: "Apply trade-in credit toward certified renewed appliances.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Disposal",
    description: "Responsible recycling when your old unit reaches end of life.",
  },
] as const;

/** @deprecated Use TRADE_IN_BENEFITS */
export const TRADE_IN_WHY = TRADE_IN_BENEFITS;

export const TRADE_IN_STORIES = [
  {
    name: "Priya M.",
    location: "Indiranagar, Bengaluru",
    traded: "Old LG single-door refrigerator",
    saved: "₹8,000",
    outcome: "Upgraded to a certified double-door Samsung—same-day guidance on WhatsApp.",
  },
  {
    name: "Rahul K.",
    location: "Whitefield",
    traded: "Samsung 280L fridge",
    saved: "₹6,500",
    outcome: "Traded in and picked up a premium LG unit with 1-year warranty included.",
  },
  {
    name: "Anita S.",
    location: "Electronic City",
    traded: "8-year Whirlpool refrigerator",
    saved: "₹4,200",
    outcome: "Non-working unit still received fair credit after inspection.",
  },
] as const;

export const TRADE_IN_FAQS = [
  {
    question: "How is trade-in value calculated?",
    answer:
      "We combine appliance category, brand, age, cosmetic condition, and working status with current market demand. You see an instant indicative range online; the final offer is confirmed after physical inspection.",
  },
  {
    question: "Do you collect old appliances?",
    answer:
      "Yes. Once you accept the offer, we schedule hassle-free pickup in serviceable areas. Our team handles safe removal so you do not need classified ads or scrap dealers.",
  },
  {
    question: "Can non-working appliances be traded?",
    answer:
      "Often yes. Non-working units may receive a lower offer, but many refrigerators and appliances still hold parts and recovery value. Share photos and details—we will advise honestly.",
  },
  {
    question: "How long does evaluation take?",
    answer:
      "Online estimates are instant. After you submit the form, our team typically responds within a few business hours. Doorstep inspection slots are usually available within 24–48 hours in Bengaluru metro.",
  },
  {
    question: "Can I trade without buying?",
    answer:
      "Trade-in credit is designed to offset your upgrade to a Protronics refurbished appliance. If you only want to sell outright, contact us on WhatsApp—we will suggest the best option.",
  },
  {
    question: "Do I need the original bill?",
    answer:
      "Original purchase proof helps but is not always required. Model label photos, age, and condition photos are usually enough for a fair preliminary valuation.",
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
      name: "Trade-In Old Appliances | Protronics",
      description:
        "Exchange your old refrigerator or appliance and upgrade to professionally restored premium appliances with Protronics Trade-In.",
      url: "https://protronics.in/trade-in",
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
