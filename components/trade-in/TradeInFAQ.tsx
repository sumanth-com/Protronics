"use client";

import { TRADE_IN_FAQS, tradeInSection } from "@/lib/trade-in";
import FAQAccordion from "@/components/faq/FAQAccordion";
import { cn } from "@/lib/utils";

export default function TradeInFAQ() {
  return (
    <section id="trade-in-faq" className={cn("border-t border-theme-border py-8 sm:py-10", tradeInSection)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-[20px] font-semibold text-theme-fg sm:text-[22px]">FAQ</h2>
        <div className="mt-4">
          <FAQAccordion faqs={[...TRADE_IN_FAQS]} defaultOpenIndex={-1} />
        </div>
      </div>
    </section>
  );
}
