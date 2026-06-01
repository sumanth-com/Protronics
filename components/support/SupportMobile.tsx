"use client";

import { useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import SupportProtectionTrustCard from "@/components/support/SupportProtectionTrustCard";
import { resetScrollToTop } from "@/hooks/useLenis";
import {
  SUPPORT_CATEGORIES_VISIBLE,
  SUPPORT_ICON_PROPS,
  buildSupportCategoryPath,
  buildSupportPath,
  getArticle,
  getCategoryById,
  getPopularSupportArticles,
  getRelatedArticles,
  getSupportScreenFromPath,
  type SupportCategory,
} from "@/lib/support";

type SupportMobileProps = {
  initialCategoryId: string;
  initialArticleId: string;
};

export default function SupportMobile({
  initialCategoryId,
  initialArticleId,
}: SupportMobileProps) {
  const router = useRouter();
  const pathname = usePathname();
  const screen = getSupportScreenFromPath(pathname);

  const pathParts = pathname.split("/").filter(Boolean);
  const categoryId = pathParts[1] ?? initialCategoryId;
  const articleId = pathParts[2] ?? initialArticleId;

  useEffect(() => {
    resetScrollToTop(null);
  }, [screen, articleId]);

  const category = useMemo(() => getCategoryById(categoryId), [categoryId]);
  const article = useMemo(
    () => getArticle(categoryId, articleId),
    [categoryId, articleId],
  );
  const popular = useMemo(() => getPopularSupportArticles(), []);

  const goHome = useCallback(() => {
    router.push("/support");
  }, [router]);

  const openCategory = useCallback(
    (nextCategoryId: string) => {
      router.push(buildSupportCategoryPath(nextCategoryId));
    },
    [router],
  );

  const openArticle = useCallback(
    (nextCategoryId: string, nextArticleId: string) => {
      router.push(buildSupportPath(nextCategoryId, nextArticleId));
    },
    [router],
  );

  const related = article ? getRelatedArticles(categoryId, article.id, 4) : [];

  return (
    <div className="support-mobile pb-24">
      {screen === "home" ? (
        <div className="support-mobile-home">
          <header className="support-mobile-header">
            <p className="support-mobile-eyebrow">Support</p>
            <h1 className="support-mobile-title">How can we help?</h1>
            <p className="support-mobile-subtitle">
              Warranty, delivery, returns, and product quality—answers for refurbished appliance buyers.
            </p>
          </header>

          <section className="support-mobile-section" aria-labelledby="support-topics-heading">
            <h2 id="support-topics-heading" className="support-mobile-section-title">
              Browse by topic
            </h2>
            <ul className="support-mobile-topic-grid">
              {SUPPORT_CATEGORIES_VISIBLE.map((cat, index) => {
                const Icon = cat.icon;
                const isSoloLast =
                  index === SUPPORT_CATEGORIES_VISIBLE.length - 1 &&
                  SUPPORT_CATEGORIES_VISIBLE.length % 2 === 1;
                return (
                  <li
                    key={cat.id}
                    className={isSoloLast ? "support-mobile-topic-grid__solo" : undefined}
                  >
                    <button
                      type="button"
                      onClick={() => openCategory(cat.id)}
                      className="support-mobile-topic-card"
                    >
                      <span className="support-mobile-topic-icon-wrap">
                        <Icon {...SUPPORT_ICON_PROPS} className="support-mobile-topic-icon" />
                      </span>
                      <span className="support-mobile-topic-label">{cat.label}</span>
                      <span className="support-mobile-topic-count">
                        {cat.articles.length} articles
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="support-mobile-section" aria-labelledby="support-popular-heading">
            <h2 id="support-popular-heading" className="support-mobile-section-title">
              Popular questions
            </h2>
            <ul className="support-mobile-list">
              {popular.map((item) => (
                <li key={`${item.categoryId}-${item.articleId}`}>
                  <button
                    type="button"
                    onClick={() => openArticle(item.categoryId, item.articleId)}
                    className="support-mobile-list-btn"
                  >
                    <span className="support-mobile-list-title">{item.article.question}</span>
                    <span className="support-mobile-list-meta">{item.categoryLabel}</span>
                    <ChevronRight className="support-mobile-list-chevron" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      {screen === "category" && category ? (
        <CategoryView category={category} onBack={goHome} onOpenArticle={openArticle} />
      ) : null}

      {screen === "article" && category && article ? (
        <div className="support-mobile-article">
          <button
            type="button"
            onClick={() => openCategory(category.id)}
            className="support-mobile-back"
          >
            <ChevronLeft className="h-4 w-4" />
            {category.label}
          </button>

          <article>
            <p className="support-mobile-article-topic">{category.label}</p>
            <h1 className="support-mobile-article-title">{article.question}</h1>
            <p className="support-mobile-article-body">{article.answer}</p>

            {article.links && article.links.length > 0 ? (
              <div className="support-mobile-article-links">
                <p className="support-mobile-links-label">Helpful links</p>
                <div className="support-mobile-links-row">
                  {article.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="support-mobile-link-pill"
                      >
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link key={link.label} href={link.href} className="support-mobile-link-pill">
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ) : null}

            {related.length > 0 ? (
              <div className="support-mobile-related">
                <p className="support-mobile-links-label">More in {category.label}</p>
                <ul className="support-mobile-list support-mobile-list--flush">
                  {related.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => openArticle(category.id, item.id)}
                        className="support-mobile-list-btn"
                      >
                        <span className="support-mobile-list-title">{item.question}</span>
                        <ChevronRight className="support-mobile-list-chevron" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        </div>
      ) : null}
    </div>
  );
}

function CategoryView({
  category,
  onBack,
  onOpenArticle,
}: {
  category: SupportCategory;
  onBack: () => void;
  onOpenArticle: (categoryId: string, articleId: string) => void;
}) {
  const Icon = category.icon;

  return (
    <div className="support-mobile-category">
      <button type="button" onClick={onBack} className="support-mobile-back">
        <ChevronLeft className="h-4 w-4" />
        Support
      </button>

      <header className="support-mobile-category-head">
        <div className="support-mobile-category-icon-wrap">
          <Icon {...SUPPORT_ICON_PROPS} className="support-mobile-category-icon" />
        </div>
        <h1 className="support-mobile-category-title">{category.label}</h1>
        <p className="support-mobile-category-desc">{category.description}</p>
      </header>

      {category.trustCard ? (
        <div className="support-mobile-trust-wrap">
          <SupportProtectionTrustCard trustCard={category.trustCard} />
        </div>
      ) : null}

      <ul className="support-mobile-list support-mobile-list--flush">
        {category.articles.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onOpenArticle(category.id, item.id)}
              className="support-mobile-list-btn"
            >
              <span className="support-mobile-list-title">{item.question}</span>
              <ChevronRight className="support-mobile-list-chevron" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
