"use client";

import { ArrowUpRight, MessageCircle, Video } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

export type CTAButtonsProps = {
  primaryHref?: string;
  whatsappHref?: string;
  videoDemoHref?: string;
  showVideoDemo?: boolean;
  className?: string;
};

export default function CTAButtons({
  primaryHref = "#shop",
  whatsappHref = "https://wa.me/",
  videoDemoHref = "#demo",
  showVideoDemo = true,
  className,
}: CTAButtonsProps) {
  return (
    <div
      className={cn(
        "mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center",
        className,
      )}
    >
      <CtaButton href={primaryHref} size="lg" fullWidth className="sm:w-auto">
        Explore Collection
        <ArrowUpRight className="h-4 w-4 text-black/80" />
      </CtaButton>

      <CtaButton href={whatsappHref} size="lg" fullWidth external className="sm:w-auto">
        WhatsApp Inquiry
        <MessageCircle className="h-4 w-4 text-black/80" />
      </CtaButton>

      {showVideoDemo ? (
        <CtaButton href={videoDemoHref} size="lg" fullWidth className="sm:w-auto">
          Book Video Demo
          <Video className="h-4 w-4 text-black/80" />
        </CtaButton>
      ) : null}
    </div>
  );
}
