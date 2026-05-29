import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Protronics",
  description:
    "Connect with Protronics experts for premium refurbished refrigerators—WhatsApp, phone, video demo, and personalized guidance.",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ContactPage />
    </div>
  );
}
