"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
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
        "contact-whatsapp-fab fixed z-[89] grid place-items-center",
        "h-14 w-14 rounded-full",
        "bg-theme-accent text-theme-accent-fg",
        "shadow-[0_8px_28px_color-mix(in_srgb,var(--theme-accent)_42%,transparent)]",
        "touch-manipulation",
        /* Sit above mobile bottom nav; flush corner on desktop */
        "right-4 bottom-[calc(var(--mobile-bottom-nav-height,0px)+1rem+env(safe-area-inset-bottom,0px))]",
        "lg:right-8 lg:bottom-8",
      )}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
