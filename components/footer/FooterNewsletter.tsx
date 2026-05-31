"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

export type FooterNewsletterProps = {
  className?: string;
};

export default function FooterNewsletter({ className }: FooterNewsletterProps) {
  return (
    <div className={cn("px-4 py-4 sm:px-6 sm:py-5", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0 max-w-xl">
          <div className="text-[11px] font-medium tracking-[0.2em] text-theme-fg-faint">
            WHATSAPP CHANNEL
          </div>
          <div className="mt-1.5 text-[16px] font-semibold tracking-tight text-theme-fg sm:text-[18px]">
            Stay Updated with Premium Deals
          </div>
          <p className="mt-1 text-[13px] leading-6 text-theme-fg-muted">
            Curated drops, restocks, and offers—only when it&apos;s worth your attention.
          </p>
        </div>

        <a
          href={BUSINESS.whatsappChannel}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "footer-whatsapp-btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full",
            "border border-theme-border bg-theme-input-bg px-5 py-2.5",
            "text-[13px] font-semibold text-theme-fg transition-colors hover:bg-theme-accent/10",
          )}
        >
          Join WhatsApp Channel
          <WhatsAppIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
