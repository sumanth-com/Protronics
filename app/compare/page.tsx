import type { Metadata } from "next";
import ComparePageClient from "@/components/compare/ComparePageClient";

export const metadata: Metadata = {
  title: "Compare Appliances | Protronics",
  description:
    "Compare up to 3 premium refurbished refrigerators side-by-side. Capacity, value, warranty, and expert guidance — decide faster with Protronics.",
  openGraph: {
    title: "Compare Appliances | Protronics",
    description:
      "Side-by-side appliance comparison with expert WhatsApp support.",
    type: "website",
  },
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ComparePageClient />
    </div>
  );
}
