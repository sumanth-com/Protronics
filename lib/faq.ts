import type { FAQ } from "@/components/faq/FAQItem";
import { absoluteUrl } from "@/lib/site";

export const HOMEPAGE_FAQS: FAQ[] = [
  {
    question: "Are refurbished appliances reliable?",
    answer:
      "Yes. Every unit goes through 100+ quality checks—cooling, seals, safety, and performance—before it reaches you.",
  },
  {
    question: "What warranty do I get?",
    answer:
      "1-year warranty on premium renewed units, with clear coverage and support if anything goes wrong.",
  },
  {
    question: "How is the appliance tested?",
    answer:
      "We run 100+ point checks on cooling, sensors, seals, and safety—then verify real-world performance before delivery.",
  },
  {
    question: "Do you provide installation?",
    answer:
      "Yes. Delivery includes placement and basic setup so your fridge is ready to use the same day.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Usually 24–72 hours in the city. We confirm your slot and keep you updated until it arrives.",
  },
];

export function buildFaqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
