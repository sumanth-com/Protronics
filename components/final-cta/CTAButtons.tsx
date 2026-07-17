"use client";

import { ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

export type CTAButtonsProps = {
  primaryHref?: string;
  whatsappHref?: string;
  className?: string;
};

export default function CTAButtons({
  primaryHref = "/shop",
  whatsappHref = BUSINESS.whatsappMessage,
  className,
}: CTAButtonsProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-xl flex-row items-stretch justify-center gap-2.5 sm:max-w-none sm:gap-3",
        className,
      )}
    >
      <CtaButton
        href={primaryHref}
        size="lg"
        className="min-w-0 flex-1 px-3 sm:flex-none sm:px-5"
      >
        <span className="truncate">Explore Collection</span>
        <ArrowUpRight className="h-4 w-4 shrink-0" />
      </CtaButton>

      <CtaButton
        href={whatsappHref}
        size="lg"
        external
        className="min-w-0 flex-1 px-3 sm:flex-none sm:px-5"
      >
        <span className="truncate">WhatsApp Inquiry</span>
        <WhatsAppIcon className="h-4 w-4 shrink-0" />
      </CtaButton>
    </div>
  );
}
