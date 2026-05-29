"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import SupportAnswerPanel from "@/components/support/SupportAnswerPanel";
import SupportCategories from "@/components/support/SupportCategories";
import SupportQuestions from "@/components/support/SupportQuestions";
import {
  SUPPORT_CATEGORIES,
  buildSupportPath,
  getArticle,
  getCategoryById,
} from "@/lib/support";
import { cn } from "@/lib/utils";

type MobilePane = "categories" | "questions" | "answer";

type SupportCenterProps = {
  initialCategoryId: string;
  initialArticleId: string;
};

export default function SupportCenter({
  initialCategoryId,
  initialArticleId,
}: SupportCenterProps) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [articleId, setArticleId] = useState(initialArticleId);
  const [mobilePane, setMobilePane] = useState<MobilePane>("answer");

  const category = useMemo(() => getCategoryById(categoryId), [categoryId]);
  const article = useMemo(
    () => getArticle(categoryId, articleId),
    [categoryId, articleId],
  );

  const syncUrl = useCallback(
    (nextCategoryId: string, nextArticleId: string) => {
      router.replace(buildSupportPath(nextCategoryId, nextArticleId), { scroll: false });
    },
    [router],
  );

  const selectCategory = useCallback(
    (nextCategoryId: string) => {
      const nextCategory = getCategoryById(nextCategoryId);
      if (!nextCategory) return;
      const firstArticle = nextCategory.articles[0]!;
      setCategoryId(nextCategoryId);
      setArticleId(firstArticle.id);
      syncUrl(nextCategoryId, firstArticle.id);
      setMobilePane("questions");
    },
    [syncUrl],
  );

  const selectArticle = useCallback(
    (nextArticleId: string) => {
      setArticleId(nextArticleId);
      syncUrl(categoryId, nextArticleId);
      setMobilePane("answer");
    },
    [categoryId, syncUrl],
  );

  if (!category || !article) {
    return null;
  }

  return (
    <div className="flex min-h-[calc(100dvh-60px)] flex-col bg-black sm:min-h-[calc(100dvh-64px)]">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-4 py-4 sm:px-6 sm:py-5">
        <p className="mb-5 shrink-0 text-[13px] font-medium tracking-[0.16em] text-white/50">
          PROTRONICS HELP CENTER
        </p>

        {/* Mobile step indicator */}
        <div className="mb-4 flex shrink-0 items-center gap-2 lg:hidden">
          {(["categories", "questions", "answer"] as const).map((pane, idx) => (
            <button
              key={pane}
              type="button"
              onClick={() => setMobilePane(pane)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12px] font-medium capitalize transition-colors",
                mobilePane === pane
                  ? "bg-white/10 text-white"
                  : "text-white/45 hover:text-white/70",
              )}
            >
              {idx + 1}. {pane}
            </button>
          ))}
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden border-t border-white/10">
          {/* Categories */}
          <aside
            className={cn(
              "w-full shrink-0 border-white/10 lg:w-[280px] lg:border-r",
              mobilePane === "categories"
                ? "flex min-h-0 flex-col"
                : "hidden lg:flex lg:min-h-0 lg:flex-col",
            )}
          >
            <div className="shrink-0 px-4 py-4">
              <h2 className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/45">
                Categories
              </h2>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 pb-3">
              <SupportCategories
                categories={SUPPORT_CATEGORIES}
                activeCategoryId={categoryId}
                onSelect={selectCategory}
              />
            </div>
          </aside>

          {/* Questions */}
          <div
            className={cn(
              "min-h-0 min-w-0 flex-1 border-white/10 lg:max-w-[380px] lg:border-r",
              mobilePane === "questions" ? "flex flex-col" : "hidden lg:flex lg:flex-col",
            )}
          >
            <SupportQuestions
              categoryLabel={category.label}
              articles={category.articles}
              activeArticleId={articleId}
              onSelect={selectArticle}
              trustCard={category.trustCard}
            />
          </div>

          {/* Answer */}
          <div
            className={cn(
              "min-h-0 min-w-0 flex-[1.15] flex-col",
              mobilePane === "answer" ? "flex" : "hidden lg:flex",
            )}
          >
            {mobilePane === "answer" ? (
              <div className="flex shrink-0 items-center px-3 py-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobilePane("questions")}
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-white/55"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Questions
                </button>
              </div>
            ) : null}
            <SupportAnswerPanel
              category={category}
              article={article}
              onSelectArticle={selectArticle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
