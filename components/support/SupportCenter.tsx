"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import SupportAnswerPanel from "@/components/support/SupportAnswerPanel";
import SupportCategories from "@/components/support/SupportCategories";
import SupportHero from "@/components/support/SupportHero";
import SupportMobile from "@/components/support/SupportMobile";
import SupportQuestions from "@/components/support/SupportQuestions";
import {
  SUPPORT_CATEGORIES_VISIBLE,
  buildSupportPath,
  getArticle,
  getCategoryById,
} from "@/lib/support";
import { cn } from "@/lib/utils";

type SupportCenterProps = {
  initialCategoryId: string;
  initialArticleId: string;
};

export default function SupportCenter({
  initialCategoryId,
  initialArticleId,
}: SupportCenterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const categoryId = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    return parts[1] ?? initialCategoryId;
  }, [pathname, initialCategoryId]);

  const articleId = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    return parts[2] ?? initialArticleId;
  }, [pathname, initialArticleId]);

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
      syncUrl(nextCategoryId, firstArticle.id);
    },
    [syncUrl],
  );

  const selectArticle = useCallback(
    (nextCategoryId: string, nextArticleId: string) => {
      syncUrl(nextCategoryId, nextArticleId);
    },
    [syncUrl],
  );

  const selectArticleInCategory = useCallback(
    (nextArticleId: string) => {
      selectArticle(categoryId, nextArticleId);
    },
    [categoryId, selectArticle],
  );

  if (!category || !article) {
    return null;
  }

  return (
    <>
      {/* Mobile — dedicated full-screen flow */}
      <div className="theme-section-a bg-black lg:hidden">
        <SupportMobile
          initialCategoryId={initialCategoryId}
          initialArticleId={initialArticleId}
        />
      </div>

      {/* Desktop — three-pane help center, fits one viewport */}
      <div className="support-desktop theme-section-a hidden h-[calc(100dvh-var(--navbar-offset))] flex-col overflow-hidden bg-black lg:flex">
        <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col px-6 py-3">
          <SupportHero />

          <div
            className={cn(
              "support-center-shell mt-2 flex min-h-0 flex-1 flex-row overflow-hidden",
              "rounded-2xl border border-white/10 bg-white/[0.02]",
            )}
          >
            <aside className="flex w-[240px] shrink-0 flex-col border-r border-white/10 xl:w-[260px]">
              <div className="shrink-0 px-3 py-2.5">
                <h2 className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                  Topics
                </h2>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 pb-3">
                <SupportCategories
                  categories={SUPPORT_CATEGORIES_VISIBLE}
                  activeCategoryId={categoryId}
                  onSelect={selectCategory}
                />
              </div>
            </aside>

            <div className="flex min-h-0 min-w-0 max-w-[320px] flex-1 flex-col border-r border-white/10 xl:max-w-[340px]">
              <SupportQuestions
                categoryLabel={category.label}
                articles={category.articles}
                activeArticleId={articleId}
                onSelect={selectArticleInCategory}
                trustCard={category.trustCard}
                compact
              />
            </div>

            <div className="flex min-h-0 min-w-0 flex-[1.2] flex-col">
              <SupportAnswerPanel category={category} article={article} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
