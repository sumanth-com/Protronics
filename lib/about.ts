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

export const aboutGlass = [
  "rounded-3xl border border-white/12 bg-white/[0.05]",
  "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
  "shadow-[0_30px_100px_rgba(0,0,0,0.55)]",
].join(" ");

export const aboutGreenGlow =
  "bg-[radial-gradient(700px_280px_at_20%_0%,rgba(57,255,136,0.14),transparent_58%)]";

export type AboutPromiseItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const ABOUT_PROMISE: AboutPromiseItem[] = [
  {
    icon: ClipboardCheck,
    title: "100+ Quality Checks",
    description:
      "Cooling, seals, sensors, and real-world performance verified before delivery.",
  },
  {
    icon: Sparkles,
    title: "Deep Sanitization",
    description:
      "Professional-grade cleaning inside, outside, and through airflow paths.",
  },
  {
    icon: BadgeCheck,
    title: "Performance Certified",
    description:
      "Every unit meets Protronics restoration standards—not sold as-is.",
  },
  {
    icon: ShieldCheck,
    title: "1-Year Warranty",
    description:
      "Coverage backed by service support so you buy with confidence.",
  },
  {
    icon: Headset,
    title: "Expert Support",
    description:
      "Human guidance before and after purchase—clear answers, no runaround.",
  },
  {
    icon: Truck,
    title: "Safe Delivery",
    description:
      "Careful handling and setup so your appliance arrives ready to use.",
  },
];

export const ABOUT_WHY_POINTS = [
  {
    title: "Built to last longer",
    description:
      "Quality appliances are often discarded long before their useful life ends.",
  },
  {
    title: "Restored the right way",
    description:
      "We restore, test, sanitize, and certify every unit to premium standards.",
  },
  {
    title: "Value without compromise",
    description:
      "Enjoy premium performance and finish—without premium showroom pricing.",
  },
] as const;

export type AboutMetric = {
  value: number;
  suffix?: string;
  display?: string;
  label: string;
  animate?: boolean;
};

export const ABOUT_METRICS: AboutMetric[] = [
  { value: 5000, suffix: "+", label: "Happy Customers", animate: true },
  { value: 1000, suffix: "+", label: "Appliances Delivered", animate: true },
  { value: 100, suffix: "+", label: "Quality Checks", animate: true },
  {
    value: 0,
    display: "1 Year",
    label: "Warranty Included",
    animate: false,
  },
];

export const ABOUT_LINKS = {
  shop: "/#shop",
  collection: "/#shop",
  whatsapp: BUSINESS.whatsappMessage,
} as const;

export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://protronics.in/#organization",
      name: "Protronics",
      url: "https://protronics.in",
      description:
        "Premium refurbished refrigerators and appliances—professionally restored, quality certified, and warranty backed.",
      areaServed: "IN",
      knowsAbout: [
        "refurbished refrigerators",
        "refurbished appliances",
        "premium refurbished appliances",
        "appliance warranty",
        "appliance restoration",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://protronics.in/about#webpage",
      url: "https://protronics.in/about",
      name: "About Protronics | Premium Refurbished Appliances",
      description:
        "Protronics delivers premium refurbished refrigerators through rigorous testing, deep sanitization, performance certification, and 1-year warranty support.",
      isPartOf: { "@id": "https://protronics.in/#website" },
      about: { "@id": "https://protronics.in/#organization" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://protronics.in/og-about.jpg",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Protronics specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Protronics specializes in premium refurbished refrigerators and appliances—restored, tested, sanitized, and certified for modern homes.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a warranty on refurbished appliances?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Protronics includes a 1-year warranty on refurbished appliances, backed by expert support.",
          },
        },
      ],
    },
  ],
};
