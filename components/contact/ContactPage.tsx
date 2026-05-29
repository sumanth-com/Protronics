"use client";

import dynamic from "next/dynamic";
import ContactForm from "@/components/contact/ContactForm";
import DeferredMount from "@/components/layout/DeferredMount";

const ContactOptions = dynamic(
  () => import("@/components/contact/ContactOptions"),
);
const BusinessInfo = dynamic(
  () => import("@/components/contact/BusinessInfo"),
);
const ContactFAQ = dynamic(() => import("@/components/contact/ContactFAQ"));
const StickyWhatsApp = dynamic(
  () => import("@/components/contact/StickyWhatsApp"),
  { ssr: false },
);

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
      <DeferredMount minHeight="480px">
        <ContactOptions />
      </DeferredMount>
      <DeferredMount minHeight="420px">
        <BusinessInfo />
      </DeferredMount>
      <DeferredMount minHeight="400px">
        <ContactFAQ />
      </DeferredMount>
      <StickyWhatsApp />
    </main>
  );
}
