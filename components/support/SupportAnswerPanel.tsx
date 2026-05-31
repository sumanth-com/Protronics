"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import SupportCallbackModal from "@/components/support/SupportCallbackModal";
import type { SupportArticle, SupportCategory } from "@/lib/support";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

type SupportAnswerPanelProps = {
  category: SupportCategory;
  article: SupportArticle;
  className?: string;
};

export default function SupportAnswerPanel({
  category,
  article,
  className,
}: SupportAnswerPanelProps) {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <div className={cn("support-answer-panel flex h-full min-h-0 flex-col", className)}>
      <div className="support-answer-head shrink-0 border-b border-white/8 px-4 py-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
          {category.label}
        </p>
        <h2 className="mt-1 text-[17px] font-semibold leading-snug tracking-tight text-white">
          {article.question}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="support-answer-body min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3"
        >
          <p className="text-[14px] leading-6 text-white/78">{article.answer}</p>
        </motion.div>
      </AnimatePresence>

      <div className="support-answer-foot shrink-0 border-t border-white/10 px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-[13px] font-semibold text-white">Still need help?</p>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={BUSINESS.whatsappMessage}
              target="_blank"
              rel="noreferrer"
              className="support-whatsapp-cta inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </a>
            <CtaButton href="/contact" size="sm" className="!px-3.5 !py-2 !text-[12px]">
              Contact
              <ArrowUpRight className="h-3.5 w-3.5" />
            </CtaButton>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-full",
                "border border-white/15 bg-white/[0.04] px-3.5 py-2",
                "text-[12px] font-semibold text-white transition-colors",
                "hover:border-white/30 hover:bg-white/[0.08]",
              )}
            >
              <Phone className="h-3.5 w-3.5" />
              Callback
            </button>
          </div>
        </div>
        <p className="support-contact-note mt-2 text-[12px] leading-5">
          Email{" "}
          <a href={BUSINESS.emailHref} className="support-contact-email">
            {BUSINESS.email}
          </a>
        </p>

        <SupportCallbackModal
          open={callbackOpen}
          onClose={() => setCallbackOpen(false)}
          context={category.label}
        />
      </div>
    </div>
  );
}
