"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

export type FooterNewsletterProps = {
  className?: string;
};

export default function FooterNewsletter({ className }: FooterNewsletterProps) {
  return (
    <div className={cn("px-5 py-4 sm:px-6 sm:py-5", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0 max-w-xl">
          <div className="text-[11px] font-medium tracking-[0.2em] text-white/55">
            WHATSAPP CHANNEL
          </div>
          <div className="mt-2 text-[17px] font-semibold tracking-tight text-white sm:text-[18px]">
            Stay Updated with Premium Deals
          </div>
          <p className="mt-1.5 text-[13px] leading-6 text-white/65">
            Curated drops, restocks, and offers—only when it&apos;s worth your attention.
          </p>
        </div>

        <a
          href={BUSINESS.whatsappChannel}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "footer-whatsapp-btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full",
            "border border-white/25 bg-white/[0.06] px-5 py-3",
            "text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.1]",
          )}
        >
          Join WhatsApp Channel
          <WhatsAppIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
