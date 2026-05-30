import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ContactForm from "@/components/contact/ContactForm";

const ContactOptions = dynamic(
  () => import("@/components/contact/ContactOptions"),
);
const ContactFAQ = dynamic(() => import("@/components/contact/ContactFAQ"));
const StickyWhatsApp = dynamic(
  () => import("@/components/contact/StickyWhatsApp"),
);

export const metadata: Metadata = {
  title: "Contact | Protronics",
  description:
    "Connect with Protronics experts for premium refurbished refrigerators—WhatsApp, phone, video demo, and personalized guidance.",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <ContactForm />
        <ContactOptions />
        <ContactFAQ />
        <StickyWhatsApp />
      </main>
    </div>
  );
}
