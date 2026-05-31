"use client";

import { ChevronRight } from "lucide-react";
import SupportProtectionTrustCard from "@/components/support/SupportProtectionTrustCard";
import type { SupportArticle, SupportTrustCard } from "@/lib/support";
import { cn } from "@/lib/utils";

type SupportQuestionsProps = {
  categoryLabel: string;
  articles: SupportArticle[];
  activeArticleId: string;
  onSelect: (articleId: string) => void;
  trustCard?: SupportTrustCard;
  compact?: boolean;
};

export default function SupportQuestions({
  categoryLabel,
  articles,
  activeArticleId,
  onSelect,
  trustCard,
  compact = false,
}: SupportQuestionsProps) {
  return (
    <div className={cn("flex h-full min-h-0 flex-col", compact && "support-questions-compact")}>
      <div className="shrink-0 px-5 py-4">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/45">
          {categoryLabel}
        </p>
        <p className="mt-1 text-[15px] text-white/60">{articles.length} articles</p>
      </div>

      {trustCard && !compact ? (
        <div className="shrink-0 px-4 pb-3">
          <SupportProtectionTrustCard trustCard={trustCard} />
        </div>
      ) : null}

      <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3">
        {articles.map((article) => {
          const active = article.id === activeArticleId;
          return (
            <li key={article.id}>
              <button
                type="button"
                onClick={() => onSelect(article.id)}
                className={cn(
                  "support-article-item group flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left",
                  "transition-[background-color,color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "active:scale-[0.99]",
                  active
                    ? "support-article-item-active bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "text-white/80 hover:translate-x-0.5 hover:bg-white/[0.05] hover:text-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
                )}
              >
                <span className="text-[15px] font-medium leading-snug sm:text-[16px]">
                  {article.question}
                </span>
                <ChevronRight
                  strokeWidth={1.75}
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-200",
                    active ? "text-white" : "text-white/25 group-hover:translate-x-0.5",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
