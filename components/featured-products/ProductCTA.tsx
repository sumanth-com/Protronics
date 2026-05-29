"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
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
    <div className={cn("mt-5 flex items-center gap-2", className)}>
      <CtaButton href={href} size="sm" className="flex-1">
        View Details
        <ArrowUpRight className="h-4 w-4 text-black/80" />
      </CtaButton>

      {whatsappHref ? (
        <CtaButton
          href={whatsappHref}
          size="sm"
          external
          aria-label="WhatsApp Inquiry"
          className="shrink-0 px-3"
        >
          <MessageCircle className="h-4 w-4 text-black/80" />
        </CtaButton>
      ) : null}
    </div>
  );
}
