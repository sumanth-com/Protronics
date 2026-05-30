"use client";

import { ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

export type ProductCTAProps = {
  href?: string;
  whatsappHref?: string;
  className?: string;
};

export default function ProductCTA({
  href = "#shop",
  whatsappHref,
  className,
}: ProductCTAProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <CtaButton
        href={href}
        size="sm"
        className="product-card-cta min-h-[38px] flex-1 gap-2 px-4 py-2.5 text-[13px] sm:min-h-[40px] sm:text-[14px]"
      >
        View Details
        <ArrowUpRight className="h-4 w-4" />
      </CtaButton>

      {whatsappHref ? (
        <CtaButton
          href={whatsappHref}
          size="sm"
          external
          aria-label="WhatsApp Inquiry"
          className="product-card-cta min-h-[38px] shrink-0 px-3 sm:min-h-[40px]"
        >
          <WhatsAppIcon className="h-4 w-4" />
        </CtaButton>
      ) : null}
    </div>
  );
}
