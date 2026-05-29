"use client";

import BusinessInfo from "@/components/contact/BusinessInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactForm from "@/components/contact/ContactForm";
import ContactOptions from "@/components/contact/ContactOptions";
import StickyWhatsApp from "@/components/contact/StickyWhatsApp";

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
      <ContactOptions />
      <BusinessInfo />
      <ContactFAQ />
      <StickyWhatsApp />
    </main>
  );
}
