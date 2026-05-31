import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  ClipboardCheck,
  Headset,
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { BUSINESS } from "@/lib/contact";
import { absoluteUrl } from "@/lib/site";

export type AboutPromiseItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type AboutWhyPoint = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type AboutProcessStep = {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export type AboutMetric = {
  value: number;
  suffix?: string;
  display?: string;
  label: string;
  animate?: boolean;
};

export type AboutFaq = {
  question: string;
  answer: string;
};

export const ABOUT_WHY_POINTS: AboutWhyPoint[] = [
  {
    icon: Recycle,
    title: "Built to last longer",
    description:
      "Quality appliances are often replaced long before their useful life ends—we change that.",
  },
  {
    icon: Sparkles,
    title: "Restored the right way",
    description:
      "Every unit is inspected, sanitized, restored, and certified—not sold as-is.",
  },
  {
    icon: Leaf,
    title: "Value without compromise",
    description:
      "Premium performance and finish at a smarter price, without cutting corners.",
  },
];

export const ABOUT_PROCESS: AboutProcessStep[] = [
  {
    step: "01",
    icon: ClipboardCheck,
    title: "Inspect & test",
    description:
      "100+ checks on cooling, seals, sensors, hygiene, and safety before any unit moves forward.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Restore & certify",
    description:
      "Deep sanitization, cosmetic refinement, and performance certification to Protronics standards.",
  },
  {
    step: "03",
    icon: Truck,
    title: "Deliver & support",
    description:
      "Careful delivery, setup guidance, and 1-year warranty with real human support when you need it.",
  },
];

/** Legacy export — kept for any remaining imports */
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

export const ABOUT_WARRANTY_FEATURES: AboutPromiseItem[] = [
  {
    icon: ShieldCheck,
    title: "1-Year Warranty",
    description: "Coverage starts on delivery—service-backed, no guesswork.",
  },
  {
    icon: Wrench,
    title: "Free Repairs",
    description: "Compressor, cooling, and electrical faults handled by our team.",
  },
  {
    icon: BadgeCheck,
    title: "100+ Quality Checks",
    description: "Safety, hygiene, and performance verified before dispatch.",
  },
  {
    icon: Headset,
    title: "Expert Support",
    description: "WhatsApp or phone—real advisors, claims in 24–48 hours.",
  },
];

export const ABOUT_WHY_CHOOSE: AboutPromiseItem[] = [
  {
    icon: ClipboardCheck,
    title: "100+ Point Testing",
    description: "Cooling, seals, sensors, and safety verified before dispatch.",
  },
  {
    icon: Sparkles,
    title: "Deep Sanitization",
    description: "Professional cleaning inside, outside, and through airflow paths.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Appliances",
    description: "Authentic models with documented inspection standards.",
  },
  {
    icon: Truck,
    title: "Delivery & Setup",
    description: "Careful handling with placement so it's ready the same day.",
  },
];

export const ABOUT_WARRANTY_HIGHLIGHTS = [
  "Certified testing",
  "Warranty included",
  "Expert support",
  "Safe delivery",
] as const;

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

export const ABOUT_FAQS: AboutFaq[] = [
  {
    question: "What does Protronics specialize in?",
    answer:
      "Protronics specializes in premium refurbished refrigerators and appliances. Every unit is restored, tested, sanitized, and certified for modern homes—so you get showroom-quality results at a smarter price.",
  },
  {
    question: "Is there a warranty on refurbished appliances?",
    answer:
      "Yes. Every Protronics appliance includes a 1-year warranty from your delivery date, covering functional defects identified during our restoration process. Claims are handled directly by our team via WhatsApp or phone.",
  },
  {
    question: "How is a refurbished appliance different from used?",
    answer:
      "Used appliances are sold as-is. Protronics units go through 100+ quality checks, deep sanitization, cosmetic restoration, and performance certification before they reach you—with warranty and support included.",
  },
  {
    question: "Do you deliver and help with setup?",
    answer:
      "Yes. We offer careful delivery with placement guidance so your appliance is ready to use the same day. Installation specifics depend on your location—contact us on WhatsApp for details in your area.",
  },
  {
    question: "Where can I get help after purchase?",
    answer:
      "Visit our Help Center for warranty, delivery, and returns answers, or reach us on WhatsApp for fast support. Most warranty claims are diagnosed within 24–48 hours in Bengaluru metro.",
  },
];

export const ABOUT_LINKS = {
  shop: "/shop",
  collection: "/shop",
  support: "/support",
  warranty: "/about#warranty",
  whatsapp: BUSINESS.whatsappMessage,
} as const;

export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: "Protronics",
      url: absoluteUrl("/"),
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
      "@id": `${absoluteUrl("/about")}#webpage`,
      url: absoluteUrl("/about"),
      name: "About Protronics | Premium Refurbished Appliances",
      description:
        "Protronics delivers premium refurbished refrigerators through rigorous testing, deep sanitization, performance certification, and 1-year warranty support.",
      isPartOf: { "@id": `${absoluteUrl("/")}#website` },
      about: { "@id": `${absoluteUrl("/")}#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl("/about")}#faq`,
      mainEntity: ABOUT_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};
