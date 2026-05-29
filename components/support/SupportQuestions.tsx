"use client";

import { ChevronRight } from "lucide-react";
import type { SupportArticle } from "@/lib/support";
import { cn } from "@/lib/utils";

type SupportQuestionsProps = {
  categoryLabel: string;
  articles: SupportArticle[];
  activeArticleId: string;
  onSelect: (articleId: string) => void;
};

export default function SupportQuestions({
  categoryLabel,
  articles,
  activeArticleId,
  onSelect,
}: SupportQuestionsProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-5 py-4">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/45">
          {categoryLabel}
        </p>
        <p className="mt-1 text-[15px] text-white/60">{articles.length} articles</p>
      </div>

      <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3">
        {articles.map((article) => {
          const active = article.id === activeArticleId;
          return (
            <li key={article.id}>
              <button
                type="button"
                onClick={() => onSelect(article.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left transition-colors",
                  active
                    ? "bg-[#39ff88]/10 text-white"
                    : "text-white/80 hover:bg-white/[0.04] hover:text-white",
                )}
              >
                <span className="text-[15px] font-medium leading-snug sm:text-[16px]">
                  {article.question}
                </span>
                <ChevronRight
                  strokeWidth={1.75}
                  className={cn(
                    "h-5 w-5 shrink-0",
                    active ? "text-[#39ff88]" : "text-white/25",
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
