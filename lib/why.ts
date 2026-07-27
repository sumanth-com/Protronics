import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  ClipboardCheck,
  Headset,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { BUSINESS } from "@/lib/contact";
import { absoluteUrl } from "@/lib/site";

export const whyGlass = [
  "rounded-3xl border border-white/12 bg-white/[0.05]",
  "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
  "shadow-[0_30px_100px_rgba(0,0,0,0.55)]",
].join(" ");

export const WHY_LINKS = {
  shop: "/shop",
  whatsapp: BUSINESS.whatsappMessage,
  contact: "/contact",
} as const;

export type ComparisonColumn = {
  id: string;
  label: string;
  highlight?: boolean;
};

export type ComparisonRow = {
  label: string;
  protronics: boolean;
  localDealers: boolean;
  olx: boolean;
  facebook: boolean;
  randomSellers: boolean;
};

export const COMPARISON_COLUMNS: ComparisonColumn[] = [
  { id: "protronics", label: "Protronics", highlight: true },
  { id: "local", label: "Local Dealers" },
  { id: "olx", label: "OLX" },
  { id: "facebook", label: "Facebook Marketplace" },
  { id: "random", label: "Random Sellers" },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "100+ Quality Checks",
    protronics: true,
    localDealers: false,
    olx: false,
    facebook: false,
    randomSellers: false,
  },
  {
    label: "Warranty Included",
    protronics: true,
    localDealers: false,
    olx: false,
    facebook: false,
    randomSellers: false,
  },
  {
    label: "Sanitized",
    protronics: true,
    localDealers: false,
    olx: false,
    facebook: false,
    randomSellers: false,
  },
  {
    label: "Professional Testing",
    protronics: true,
    localDealers: false,
    olx: false,
    facebook: false,
    randomSellers: false,
  },
  {
    label: "Support Available",
    protronics: true,
    localDealers: false,
    olx: false,
    facebook: false,
    randomSellers: false,
  },
  {
    label: "Delivery Available",
    protronics: true,
    localDealers: false,
    olx: false,
    facebook: false,
    randomSellers: false,
  },
  {
    label: "Installation Support",
    protronics: true,
    localDealers: false,
    olx: false,
    facebook: false,
    randomSellers: false,
  },
  {
    label: "Performance Certified",
    protronics: true,
    localDealers: false,
    olx: false,
    facebook: false,
    randomSellers: false,
  },
];

export type WhyPillar = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const WHY_PILLARS: WhyPillar[] = [
  {
    icon: ClipboardCheck,
    title: "100+ Point Inspection",
    description: "Every critical component verified before listing.",
  },
  {
    icon: Sparkles,
    title: "Deep Sanitization",
    description: "Professional cleaning inside and out.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty Protection",
    description: "1-year coverage with real support.",
  },
  {
    icon: BadgeCheck,
    title: "Certified Performance",
    description: "Signed off—not sold as-is.",
  },
  {
    icon: Truck,
    title: "Safe Delivery",
    description: "Handled with care to your door.",
  },
  {
    icon: Headset,
    title: "Expert Support",
    description: "Reach a human when you need help.",
  },
];

export type WhyMetric = {
  value: number;
  suffix?: string;
  display?: string;
  label: string;
  animate?: boolean;
};

export const WHY_METRICS: WhyMetric[] = [
  { value: 5000, suffix: "+", label: "Happy Customers", animate: true },
  { value: 1000, suffix: "+", label: "Appliances Delivered", animate: true },
  { value: 100, suffix: "+", label: "Quality Checks", animate: true },
  { value: 0, display: "1 Year", label: "Warranty Coverage", animate: false },
];

export const whyPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${absoluteUrl("/why-protronics")}#webpage`,
  name: "Why Protronics | Trust & Quality",
  description:
    "See why Protronics is safer than local dealers, OLX, and marketplace sellers—100+ checks, warranty, sanitization, and certified performance in Bangalore.",
  url: absoluteUrl("/why-protronics"),
  isPartOf: { "@id": `${absoluteUrl("/")}#website` },
  about: { "@id": `${absoluteUrl("/")}#organization` },
};
