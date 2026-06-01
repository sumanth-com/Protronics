import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ContactForm from "@/components/contact/ContactForm";
import { buildPageMetadata, PAGE_SEO } from "@/lib/seo";

const ContactOptions = dynamic(
  () => import("@/components/contact/ContactOptions"),
);
const ContactFAQ = dynamic(() => import("@/components/contact/ContactFAQ"));

export const metadata: Metadata = buildPageMetadata({
  absoluteTitle: PAGE_SEO.contact.absoluteTitle,
  description: PAGE_SEO.contact.description,
  path: PAGE_SEO.contact.path,
  keywords: [...PAGE_SEO.contact.keywords],
});

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <ContactForm />
        <ContactOptions />
        <ContactFAQ />
      </main>
    </div>
  );
}
