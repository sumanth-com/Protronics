import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ContactForm from "@/components/contact/ContactForm";
import { buildFaqJsonLd } from "@/lib/faq";
import { buildPageMetadata, PAGE_SEO } from "@/lib/seo";

const ContactOptions = dynamic(
  () => import("@/components/contact/ContactOptions"),
);
const ContactFAQ = dynamic(() => import("@/components/contact/ContactFAQ"));
const StickyWhatsApp = dynamic(
  () => import("@/components/contact/StickyWhatsApp"),
);

const CONTACT_FAQS = [
  {
    question: "Do you provide installation?",
    answer:
      "Yes. White-glove delivery includes placement, leveling, and basic setup. Our team walks you through operation and care before they leave.",
  },
  {
    question: "How long is warranty?",
    answer:
      "Every Protronics refrigerator includes a 1-year comprehensive warranty covering parts and service, with optional extended coverage on select models.",
  },
  {
    question: "Can I visit before buying?",
    answer:
      "Absolutely. Book a visit or video demo to inspect finish, hear compressor performance, and review our 100+ point test report in person.",
  },
  {
    question: "Do you deliver to my city?",
    answer:
      "We deliver across metro Bengaluru and select surrounding districts. Share your pin code on WhatsApp—we'll confirm coverage and timelines instantly.",
  },
  {
    question: "How are products tested?",
    answer:
      "Each unit passes 100+ quality checks: cooling performance, electrical safety, sanitization, cosmetic refinishing, and final certification before listing.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  absoluteTitle: PAGE_SEO.contact.absoluteTitle,
  description: PAGE_SEO.contact.description,
  path: PAGE_SEO.contact.path,
  keywords: [...PAGE_SEO.contact.keywords],
});

export default function Contact() {
  const faqJsonLd = buildFaqJsonLd([...CONTACT_FAQS]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <main>
          <ContactForm />
          <ContactOptions />
          <ContactFAQ />
        </main>
        <StickyWhatsApp />
      </div>
    </>
  );
}
