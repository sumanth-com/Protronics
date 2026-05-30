"use client";

import { PhoneCall } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

export type SupportCTAProps = {
  whatsappHref?: string;
  expertHref?: string;
  className?: string;
};

export default function SupportCTA({
  whatsappHref = "https://wa.me/",
  expertHref = "/contact",
  className,
}: SupportCTAProps) {
  return (
    <div
      className={cn(
        "mt-10 rounded-3xl border border-white/12 bg-white/[0.05]",
        "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
        "shadow-[0_26px_70px_rgba(0,0,0,0.55)]",
        "px-6 py-6",
        className,
      )}
    >
      <div className="text-[12px] font-medium tracking-[0.22em] text-white/55">
        STILL HAVE QUESTIONS?
      </div>
      <div className="mt-3 text-[18px] font-semibold tracking-tight text-white">
        We’ll help you choose confidently.
      </div>
      <div className="mt-3 h-[2px] w-10 rounded-full bg-white/40" />
      <div className="mt-4 text-[13px] leading-7 text-white/70">
        Talk to a Protronics expert—no pressure, just clarity.
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <CtaButton href={whatsappHref} fullWidth external className="sm:w-auto">
          WhatsApp Support
          <WhatsAppIcon className="h-4 w-4" />
        </CtaButton>

        <CtaButton href={expertHref} fullWidth className="sm:w-auto">
          Talk to an Expert
          <PhoneCall className="h-4 w-4" />
        </CtaButton>
      </div>
    </div>
  );
}
