"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Link from "next/link";
import { Phone } from "lucide-react";
import SupportCallbackModal from "@/components/support/SupportCallbackModal";
import SupportProtectionTrustCard from "@/components/support/SupportProtectionTrustCard";
import type { SupportArticle, SupportCategory } from "@/lib/support";
import { getRelatedArticles } from "@/lib/support";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

type SupportAnswerPanelProps = {
  category: SupportCategory;
  article: SupportArticle;
  onSelectArticle: (articleId: string) => void;
  className?: string;
};

export default function SupportAnswerPanel({
  category,
  article,
  onSelectArticle,
  className,
}: SupportAnswerPanelProps) {
  const related = getRelatedArticles(category.id, article.id, 3);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      <div className="shrink-0 px-5 py-4 sm:px-6">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/55">
          {category.label}
        </p>
        <h1 className="mt-2 text-[22px] font-semibold leading-snug tracking-tight text-white sm:text-[26px]">
          {article.question}
        </h1>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8 sm:px-6"
        >
          {category.trustCard ? (
            <div className="mb-6 lg:hidden">
              <SupportProtectionTrustCard trustCard={category.trustCard} />
            </div>
          ) : null}

          <p className="max-w-2xl text-[16px] leading-8 text-white/78 sm:text-[17px]">
            {article.answer}
          </p>

          {article.links && article.links.length > 0 ? (
            <div className="mt-8 max-w-2xl">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/45">
                Useful links
              </p>
              <ul className="mt-3 space-y-2.5">
                {article.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="inline-flex text-[15px] font-medium text-white transition-opacity hover:opacity-80"
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="mt-10 max-w-2xl">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/45">
                Related questions
              </p>
              <ul className="mt-3 space-y-1">
                {related.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSelectArticle(item.id)}
                      className="w-full rounded-lg px-2 py-2.5 text-left text-[15px] text-white/75 transition-colors hover:bg-white/[0.04] hover:text-white"
                    >
                      {item.question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="shrink-0 border-t border-white/10 px-5 py-5 sm:px-6">
        {category.protectionCta ? (
          <>
            <p className="text-[16px] font-semibold text-white sm:text-[17px]">
              Still Need Help?
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={BUSINESS.whatsappMessage}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-full",
                  "bg-white px-5 py-2.5 text-[14px] font-semibold text-black",
                  "transition-opacity hover:opacity-90",
                )}
              >
                <WhatsAppIcon className="h-4 w-4 text-black/85" />
                WhatsApp Support
              </a>
              <button
                type="button"
                onClick={() => setCallbackOpen(true)}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-full",
                  "border border-white/15 bg-white/[0.04] px-5 py-2.5",
                  "text-[14px] font-semibold text-white transition-colors",
                  "hover:border-white/30 hover:bg-white/[0.08]",
                )}
              >
                <Phone className="h-4 w-4" />
                Request Callback
              </button>
            </div>
            <SupportCallbackModal
              open={callbackOpen}
              onClose={() => setCallbackOpen(false)}
              context="Protronics Protection"
            />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[16px] font-semibold text-white sm:text-[17px]">
                Still have questions?
              </p>
              <a
                href={BUSINESS.whatsappMessage}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full",
                  "border border-white/45 bg-transparent px-5 py-2.5",
                  "text-[15px] font-semibold text-white",
                  "transition-colors hover:bg-white/[0.06]",
                )}
              >
                Chat with us
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-3 text-[14px] leading-6 text-white/55 sm:text-[15px]">
              For detailed inquiries, send us an email at{" "}
              <a
                href={BUSINESS.emailHref}
                className="font-medium text-white transition-opacity hover:opacity-80"
              >
                {BUSINESS.email}
              </a>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
}
