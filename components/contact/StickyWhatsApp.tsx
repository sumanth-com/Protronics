"use client";

import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

export default function StickyWhatsApp() {
  return (
    <a
      href={BUSINESS.whatsappMessage}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed bottom-5 right-4 z-40 md:bottom-6 md:right-6",
        "inline-flex items-center gap-2 rounded-full",
        "bg-white px-4 py-3.5 text-black",
        "text-[13px] font-semibold tracking-wide",
        "shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.15)]",
        "ring-2 ring-[#39ff88]/30",
        "transition-opacity hover:opacity-90 active:opacity-80",
        "min-h-[48px] min-w-[48px]",
      )}
    >
      <MessageCircle className="h-5 w-5 text-black/85" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
