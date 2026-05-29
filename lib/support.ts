import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  ClipboardList,
  CreditCard,
  MessageSquare,
  Package,
  Receipt,
  Shield,
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

export type SupportCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  articles: SupportArticle[];
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
          { label: "Warranty details on homepage", href: "/#warranty" },
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
  {
    id: "payment",
    label: "Payment & Billing",
    icon: CreditCard,
    description: "Methods, invoices, and EMI",
    articles: [
      {
        id: "payment-methods",
        question: "What payment methods do you accept?",
        answer:
          "We accept UPI, credit and debit cards, net banking, and select EMI options. Full payment confirms your delivery slot at booking.",
      },
      {
        id: "payment-emi",
        question: "Is EMI available?",
        answer:
          "EMI is available through eligible card programs at checkout. Your bank shows terms and interest before you confirm. Protronics does not add separate financing charges.",
      },
      {
        id: "payment-invoice",
        question: "Will I receive a tax invoice?",
        answer:
          "Yes. A GST invoice is emailed after delivery with serial number, warranty start date, and itemized pricing.",
      },
    ],
  },
  {
    id: "account",
    label: "Account & Orders",
    icon: Receipt,
    description: "Orders, updates, and changes",
    articles: [
      {
        id: "account-track-order",
        question: "How do I track my order?",
        answer:
          "Order updates go to your WhatsApp and SMS—no account login required. Share your order ID anytime for a live status check.",
      },
      {
        id: "account-change-address",
        question: "Can I change my delivery address?",
        answer:
          "Address changes are free before dispatch. After dispatch, changes may require a re-routing fee depending on distance—contact us as soon as possible.",
      },
      {
        id: "account-cancel",
        question: "Can I cancel my order?",
        answer:
          "Cancellation is free before the unit is prepared for dispatch. After dispatch, cancellation is handled under our returns policy.",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact Support",
    icon: MessageSquare,
    description: "Hours, channels, and visits",
    articles: [
      {
        id: "contact-hours",
        question: "What are support hours?",
        answer:
          "Live support is available Monday–Saturday, 10:00 AM to 7:00 PM IST. WhatsApp messages sent after hours are answered the next business morning, usually within two hours of opening.",
      },
      {
        id: "contact-fastest",
        question: "What is the fastest way to get help?",
        answer:
          "WhatsApp us with your order ID and a brief description of the issue. For urgent cooling failures, call directly rather than waiting on email.",
        links: [
          { label: "WhatsApp", href: BUSINESS.whatsappMessage, external: true },
          { label: "Call support", href: BUSINESS.phoneHref },
          { label: "Visit experience hub", href: "/contact" },
        ],
      },
      {
        id: "contact-visit",
        question: "Can I visit the experience hub?",
        answer:
          "Yes. Walk in during business hours at our Indiranagar hub. View units in person, compare models, and speak with an advisor on the floor.",
        links: [{ label: "Directions & map", href: "/contact" }],
      },
    ],
  },
];

export type SupportSearchResult = {
  categoryId: string;
  articleId: string;
  question: string;
  categoryLabel: string;
  snippet: string;
};

export function getCategoryById(id: string) {
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
  const fallback = getDefaultSelection();
  if (!categorySlug) return fallback;

  const category = getCategoryById(categorySlug);
  if (!category) return fallback;

  if (!articleSlug) {
    return { categoryId: category.id, articleId: category.articles[0]!.id };
  }

  const article = category.articles.find((a) => a.id === articleSlug);
  if (!article) {
    return { categoryId: category.id, articleId: category.articles[0]!.id };
  }

  return { categoryId: category.id, articleId: article.id };
}

export function buildSupportPath(categoryId: string, articleId: string) {
  return `/support/${categoryId}/${articleId}`;
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
