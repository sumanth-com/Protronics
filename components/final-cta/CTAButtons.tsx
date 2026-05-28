"use client";

import { ArrowUpRight, MessageCircle, Video } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
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
    <div className={cn("mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center", className)}>
      <a href={primaryHref} className="w-full sm:w-auto">
        <MagneticButton
          className={cn(
            "w-full rounded-full px-6 py-3.5",
            "bg-white text-black",
            "text-[12px] font-medium tracking-wide",
            "shadow-[0_22px_70px_rgba(0,0,0,0.65)]",
            "ring-1 ring-white/10",
          )}
        >
          Explore Collection
          <ArrowUpRight className="ml-2 h-4 w-4 opacity-85" />
        </MagneticButton>
      </a>

      <a href={whatsappHref} className="w-full sm:w-auto">
        <MagneticButton
          className={cn(
            "w-full rounded-full px-6 py-3.5",
            "border border-white/12 bg-white/[0.06] text-white",
            "text-[12px] font-medium tracking-wide",
            "shadow-[0_22px_70px_rgba(0,0,0,0.65)]",
          )}
        >
          WhatsApp Inquiry
          <MessageCircle className="ml-2 h-4 w-4 opacity-80" />
        </MagneticButton>
      </a>

      {showVideoDemo ? (
        <a href={videoDemoHref} className="w-full sm:w-auto">
          <MagneticButton
            className={cn(
              "w-full rounded-full px-6 py-3.5",
              "border border-white/12 bg-white/[0.04] text-white/90",
              "text-[12px] font-medium tracking-wide",
              "shadow-[0_22px_70px_rgba(0,0,0,0.65)]",
            )}
          >
            Book Video Demo
            <Video className="ml-2 h-4 w-4 opacity-80" />
          </MagneticButton>
        </a>
      ) : null}
    </div>
  );
}

