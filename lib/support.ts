import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  ClipboardList,
  Package,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { BUSINESS } from "@/lib/contact";

export const supportGlass = [
  "border border-white/12 bg-white/[0.04]",
  "supports-[backdrop-filter]:bg-white/[0.045] supports-[backdrop-filter]:backdrop-blur-xl",
].join(" ");

export type SupportLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SupportArticle = {
  id: string;
  question: string;
  answer: string;
  links?: SupportLink[];
};

export type SupportTrustCard = {
  title: string;
  items: string[];
};

export type SupportCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  articles: SupportArticle[];
  trustCard?: SupportTrustCard;
  protectionCta?: boolean;
};

export const SUPPORT_ICON_PROPS = {
  strokeWidth: 1.75,
  size: 20,
} as const;

export const SUPPORT_CATEGORIES: SupportCategory[] = [
  {
    id: "warranty",
    label: "Warranty",
    icon: Shield,
    description: "Coverage, claims, and transfers",
    articles: [
      {
        id: "warranty-duration",
        question: "How long is the warranty?",
        answer:
          "Every Protronics refrigerator includes a 1-year warranty from your delivery date. It covers functional defects identified during our restoration process. Normal cosmetic wear after delivery is not covered.",
        links: [
          { label: "Warranty details on about page", href: "/about#warranty" },
          { label: "Contact support", href: "/contact" },
        ],
      },
      {
        id: "warranty-coverage",
        question: "What does the warranty cover?",
        answer:
          "Coverage includes compressor and cooling failures, thermostat and sensor faults, and electrical issues present at delivery. It excludes post-delivery physical damage, unprotected power surges, and repairs done outside Protronics service.",
      },
      {
        id: "warranty-claim",
        question: "How do I claim warranty?",
        answer:
          "WhatsApp or call us with your order ID and a short video of the issue. In Bengaluru metro we schedule diagnosis within 24–48 hours. Repair or replacement follows our service policy—handled directly by our team.",
        links: [
          { label: "WhatsApp support", href: BUSINESS.whatsappMessage, external: true },
          { label: "Call support", href: BUSINESS.phoneHref },
        ],
      },
      {
        id: "warranty-transfer",
        question: "Can warranty be transferred?",
        answer:
          "Warranty is registered to the original buyer and delivery address. If you resell the unit, contact us before transfer—we can re-register coverage in eligible cases for a one-time fee.",
      },
    ],
  },
  {
    id: "protronics-protection",
    label: "Protronics Protection",
    icon: ShieldCheck,
    description: "Warranty, coverage & peace of mind",
    trustCard: {
      title: "Protronics Protection Promise",
      items: [
        "100+ Point Tested",
        "Sanitized & Verified",
        "Safe Delivery",
        "Dedicated Assistance",
      ],
    },
    articles: [
      {
        id: "protection-included",
        question: "What protection comes with my appliance?",
        answer:
          "Every Protronics appliance undergoes 100+ quality checks, deep sanitization, performance testing, and is backed by warranty protection for additional peace of mind.",
      },
      {
        id: "protection-coverage",
        question: "What does the warranty cover?",
        answer:
          "The warranty covers manufacturing-related and performance-related issues that occur under normal usage conditions during the coverage period.",
      },
      {
        id: "protection-exclusions",
        question: "What is not covered under warranty?",
        answer:
          "Coverage does not include accidental physical damage after delivery, misuse, unauthorized repairs, power surge damage without protection, or normal cosmetic wear from everyday use. Our team explains exclusions clearly before you buy.",
      },
      {
        id: "protection-claim",
        question: "How do I make a warranty claim?",
        answer:
          "Contact Protronics through WhatsApp, phone, or the support center. Our team will verify the issue, review eligibility, and guide you through the next steps.",
        links: [
          { label: "WhatsApp support", href: BUSINESS.whatsappMessage, external: true },
          { label: "Call support", href: BUSINESS.phoneHref },
        ],
      },
      {
        id: "protection-installation",
        question: "Is installation support available?",
        answer:
          "Yes. Delivery includes placement, leveling, and basic setup guidance. If you need additional help after delivery, our team can walk you through operation and care over WhatsApp or phone at no extra charge.",
      },
    ],
  },
  {
    id: "delivery",
    label: "Delivery & Installation",
    icon: Package,
    description: "Timelines, cities, and setup",
    articles: [
      {
        id: "delivery-time",
        question: "How long is delivery?",
        answer:
          "Bengaluru metro orders usually arrive within 24–72 hours of confirmation. Tier-2 locations take 3–5 business days. You get a confirmed delivery slot—not an open-ended estimate.",
      },
      {
        id: "delivery-installation",
        question: "Do you provide installation?",
        answer:
          "Yes. Delivery includes placement, leveling, a basic electrical check, and a cooling test. The unit should be ready to use when our team completes setup.",
      },
      {
        id: "delivery-cities",
        question: "What cities do you cover?",
        answer:
          "We serve Bengaluru, Whitefield, Electronic City, and Mysore Road corridors. Selected tier-2 cities are available—confirm your pin code on WhatsApp before you order.",
        links: [{ label: "Service areas & contact", href: "/contact" }],
      },
      {
        id: "delivery-tracking",
        question: "Can I track my delivery?",
        answer:
          "Once dispatched, you receive WhatsApp updates with driver contact and ETA. To reschedule, reply in the same thread—no ticket number needed.",
      },
    ],
  },
  {
    id: "product-condition",
    label: "Product Condition",
    icon: ClipboardList,
    description: "Testing, sanitization, and grading",
    articles: [
      {
        id: "condition-refurbished",
        question: "What does refurbished mean at Protronics?",
        answer:
          "Refurbished at Protronics means fully restored and certified—not simply cleaned. Each unit passes 100+ checks, professional sanitization, cosmetic grading, and a performance sign-off before it is listed for sale.",
      },
      {
        id: "condition-testing",
        question: "How are appliances tested?",
        answer:
          "We test cooling performance, door seals, sensors, noise, and power draw under load. Any unit that fails a critical check is repaired or removed from inventory. We do not sell untested stock.",
      },
      {
        id: "condition-cosmetic",
        question: "Will there be visible wear?",
        answer:
          "Light marks on panels or handles can remain on some units. Every listing states the cosmetic grade clearly. Performance and hygiene meet our standards—we do not hide condition details.",
      },
      {
        id: "condition-sanitization",
        question: "Are units sanitized before delivery?",
        answer:
          "Yes. Interiors, gaskets, drip trays, and airflow paths are deep-cleaned and deodorized with professional equipment. The refrigerator is ready for food storage after setup.",
      },
    ],
  },
  {
    id: "returns",
    label: "Returns & Refunds",
    icon: ArrowLeftRight,
    description: "Policies and resolutions",
    articles: [
      {
        id: "returns-policy",
        question: "What is your return policy?",
        answer:
          "If the unit does not match the listed grade or has a verified functional issue within 7 days of delivery, we arrange return or replacement. Change-of-mind requests are reviewed individually.",
      },
      {
        id: "returns-process",
        question: "How do I start a return?",
        answer:
          "Contact support within 7 days with your order ID and photos or video. We schedule pickup in serviceable areas. Refunds are processed after inspection, typically within 5–7 business days.",
        links: [
          { label: "WhatsApp support", href: BUSINESS.whatsappMessage, external: true },
        ],
      },
      {
        id: "returns-refund-time",
        question: "How long do refunds take?",
        answer:
          "Approved refunds return to your original payment method within 5–7 business days. UPI is often faster; card timelines depend on your bank.",
      },
    ],
  },
];

/** Support sidebar — excludes legacy contact category (use /contact page instead). */
export const SUPPORT_CATEGORIES_VISIBLE = SUPPORT_CATEGORIES.filter(
  (c) => c.id !== "contact",
);

export type SupportSearchResult = {
  categoryId: string;
  articleId: string;
  question: string;
  categoryLabel: string;
  snippet: string;
};

export function getCategoryById(id: string) {
  if (id === "contact") return undefined;
  return SUPPORT_CATEGORIES.find((c) => c.id === id);
}

export function getArticle(categoryId: string, articleId: string) {
  const category = getCategoryById(categoryId);
  return category?.articles.find((a) => a.id === articleId);
}

export function getDefaultSelection() {
  const category = SUPPORT_CATEGORIES[0]!;
  const article = category.articles[0]!;
  return { categoryId: category.id, articleId: article.id };
}

export function resolveSelection(categorySlug?: string, articleSlug?: string) {
  if (!categorySlug) return getDefaultSelection();

  const category = getCategoryById(categorySlug);
  if (!category) return null;

  if (!articleSlug) {
    return { categoryId: category.id, articleId: category.articles[0]!.id };
  }

  const article = category.articles.find((a) => a.id === articleSlug);
  if (!article) return null;

  return { categoryId: category.id, articleId: article.id };
}

export function buildSupportPath(categoryId: string, articleId: string) {
  return `/support/${categoryId}/${articleId}`;
}

/** High-intent articles surfaced on mobile help home */
export const POPULAR_SUPPORT_ARTICLES = [
  { categoryId: "warranty", articleId: "warranty-duration" },
  { categoryId: "warranty", articleId: "warranty-claim" },
  { categoryId: "delivery", articleId: "delivery-time" },
  { categoryId: "returns", articleId: "returns-policy" },
  { categoryId: "product-condition", articleId: "condition-refurbished" },
  { categoryId: "protronics-protection", articleId: "protection-included" },
] as const;

export function getPopularSupportArticles() {
  return POPULAR_SUPPORT_ARTICLES.flatMap(({ categoryId, articleId }) => {
    const article = getArticle(categoryId, articleId);
    const category = getCategoryById(categoryId);
    if (!article || !category) return [];
    return [{ categoryId, articleId, article, categoryLabel: category.label }];
  });
}

export function getSupportScreenFromPath(pathname: string): "home" | "category" | "article" {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length >= 3) return "article";
  if (parts.length === 2) return "category";
  return "home";
}

export function buildSupportCategoryPath(categoryId: string) {
  return `/support/${categoryId}`;
}

export function searchSupportArticles(query: string, limit = 8): SupportSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SupportSearchResult[] = [];

  for (const category of SUPPORT_CATEGORIES) {
    for (const article of category.articles) {
      const haystack = `${article.question} ${article.answer} ${category.label}`.toLowerCase();
      if (!haystack.includes(q)) continue;

      const idx = article.answer.toLowerCase().indexOf(q);
      const snippet =
        idx >= 0
          ? article.answer.slice(Math.max(0, idx - 20), idx + 80).trim() + "…"
          : article.answer.slice(0, 100).trim() + "…";

      results.push({
        categoryId: category.id,
        articleId: article.id,
        question: article.question,
        categoryLabel: category.label,
        snippet,
      });
    }
  }

  return results.slice(0, limit);
}

export function getRelatedArticles(categoryId: string, articleId: string, limit = 3) {
  const category = getCategoryById(categoryId);
  if (!category) return [];
  return category.articles.filter((a) => a.id !== articleId).slice(0, limit);
}

export function getAllArticlePaths() {
  return SUPPORT_CATEGORIES.flatMap((category) =>
    category.articles.map((article) => ({
      category: category.id,
      article: article.id,
    })),
  );
}

export function buildSupportFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SUPPORT_CATEGORIES.flatMap((category) =>
      category.articles.map((article) => ({
        "@type": "Question",
        name: article.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: article.answer,
        },
      })),
    ),
  };
}

export function buildSupportHubMetadata() {
  return {
    title: "Help Center & FAQs | Protronics",
    description:
      "Find answers about refurbished appliances, warranties, delivery, trade-ins, quality testing, and support from Protronics in Bangalore.",
    path: "/support",
  };
}

const CATEGORY_META: Record<
  string,
  { title: string; description: string }
> = {
  warranty: {
    title: "Refrigerator Warranty FAQ | Protronics Support",
    description:
      "Answers on Protronics 1-year warranty coverage, claims, transfers, and what refurbished refrigerators include in Bangalore.",
  },
  delivery: {
    title: "Delivery & Installation FAQ | Protronics",
    description:
      "Delivery timelines, cities, installation, and tracking for refurbished appliances across Bengaluru.",
  },
  "product-condition": {
    title: "Refurbished Condition & Testing FAQ | Protronics",
    description:
      "How Protronics tests, grades, sanitizes, and certifies refurbished refrigerators and washing machines.",
  },
  returns: {
    title: "Returns & Refunds FAQ | Protronics",
    description:
      "Return policy, process, and refund timelines for Protronics refurbished appliances in Bangalore.",
  },
  "protronics-protection": {
    title: "Protronics Protection FAQ",
    description:
      "What’s included in Protronics Protection—coverage, exclusions, claims, and installation support.",
  },
};

export function buildCategorySupportMetadata(categoryId: string) {
  const category = getCategoryById(categoryId);
  if (!category) return null;
  const custom = CATEGORY_META[categoryId];
  return {
    title: custom?.title ?? `${category.label} FAQ | Protronics Support`,
    description:
      custom?.description ??
      `Help articles about ${category.label.toLowerCase()} for Protronics refurbished appliances in Bangalore.`,
    path: `/support/${categoryId}`,
  };
}

export function buildArticleMetadata(categoryId: string, articleId: string) {
  const category = getCategoryById(categoryId);
  const article = getArticle(categoryId, articleId);
  if (!category || !article) return null;

  return {
    title: `${article.question} | Protronics Support`,
    description: article.answer.slice(0, 155),
    path: buildSupportPath(categoryId, articleId),
    question: article.question,
    categoryLabel: category.label,
  };
}
