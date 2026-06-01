"use client";

import { TRADE_IN_FAQS, tradeInSection } from "@/lib/trade-in";
import FAQAccordion from "@/components/faq/FAQAccordion";
import { cn } from "@/lib/utils";

export default function TradeInFAQ() {
  return (
    <section id="sell-faq" className={cn("border-t border-theme-border py-8 sm:py-10", tradeInSection)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <header className="text-center">
          <h2 className="text-[20px] font-semibold text-theme-fg sm:text-[22px]">FAQ</h2>
          <p className="mx-auto mt-1 max-w-sm text-[14px] leading-relaxed text-theme-fg-muted">
            Answers about selling, valuations, and pickup with Protronics.
          </p>
        </header>
        <div className="mt-4">
          <FAQAccordion faqs={[...TRADE_IN_FAQS]} defaultOpenIndex={-1} />
        </div>
      </div>
    </section>
  );
}
