"use client";

import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

export type FooterNewsletterProps = {
  className?: string;
};

export default function FooterNewsletter({ className }: FooterNewsletterProps) {
  return (
    <div className={cn("px-6 py-6 sm:px-7 sm:py-7", className)}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="text-[12px] font-medium tracking-[0.22em] text-[#39ff88]/80">
            WHATSAPP CHANNEL
          </div>
          <div className="mt-3 text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
            Stay Updated with Premium Deals
          </div>
          <div className="mt-2 text-[13px] leading-7 text-white/65 sm:text-[14px]">
            Join our WhatsApp channel for curated drops, restocks, and offers—only
            when it&apos;s worth your attention.
          </div>
        </div>

        <a
          href={BUSINESS.whatsappChannel}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-full",
            "border border-[#39ff88]/40 bg-[#39ff88]/[0.08] px-6 py-3.5",
            "text-[13px] font-semibold text-[#39ff88]",
            "transition-colors hover:bg-[#39ff88]/12",
          )}
        >
          Join WhatsApp Channel
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
        </a>
      </div>

      <p className="mt-4 text-[12px] text-white/40">
        No spam. Leave the channel anytime from WhatsApp.
      </p>
    </div>
  );
}
