import type { FAQ } from "@/components/faq/FAQItem";

export const HOMEPAGE_FAQS: FAQ[] = [
  {
    question: "Are refurbished appliances reliable?",
    answer:
      "Yes—when the process is engineered. Every unit is inspected, restored, and performance-checked with professional standards so it feels dependable, not uncertain.",
  },
  {
    question: "What warranty do I get?",
    answer:
      "A 1-year warranty is included on premium renewed units. You'll have clear coverage and support—built to remove fear after purchase.",
  },
  {
    question: "Do you provide installation?",
    answer:
      "Yes. Delivery + installation support is available so the appliance is set up correctly and ready to use—without stress.",
  },
  {
    question: "How is the appliance tested?",
    answer:
      "We run 100+ point checks covering cooling performance, seals, sensors, safety, and real-world reliability—then verify it meets our standards before delivery.",
  },
  {
    question: "Can I return the product?",
    answer:
      "If something isn't right, we'll help immediately. Return eligibility depends on the product category and condition—our goal is a smooth, fair resolution.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Typically 24–72 hours within the city depending on your location and scheduling. We confirm a time window and keep communication clear.",
  },
  {
    question: "Are the appliances sanitized?",
    answer:
      "Yes. Deep sanitization and deodorization are part of the process—inside, outside, and airflow paths—so it arrives clean and premium.",
  },
  {
    question: "What makes Protronics different?",
    answer:
      "It's a system: verified sourcing, rigorous testing, premium restoration, and warranty-backed support. Refurbished—without compromise.",
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
      item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://protronics.in"}${item.path}`,
    })),
  };
}
