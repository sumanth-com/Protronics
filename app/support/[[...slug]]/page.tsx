import type { Metadata } from "next";
import SupportCenter from "@/components/support/SupportCenter";
import {
  buildArticleMetadata,
  buildSupportFaqJsonLd,
  getAllArticlePaths,
  getArticle,
  resolveSelection,
} from "@/lib/support";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  const paths = getAllArticlePaths();
  return [
    { slug: [] as string[] },
    ...paths.map(({ category }) => ({ slug: [category] })),
    ...paths.map(({ category, article }) => ({ slug: [category, article] })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [categorySlug, articleSlug] = slug ?? [];
  const { categoryId, articleId } = resolveSelection(categorySlug, articleSlug);
  const articleMeta = buildArticleMetadata(categoryId, articleId);

  if (!articleMeta) {
    return {
      title: "Support | Protronics Help Center",
      description:
        "Premium help center for refurbished refrigerators—warranty, delivery, returns, and expert support.",
    };
  }

  return {
    title: articleMeta.title,
    description: articleMeta.description,
    alternates: {
      canonical: articleMeta.path,
    },
    openGraph: {
      title: articleMeta.title,
      description: articleMeta.description,
      type: "article",
    },
    keywords: [
      "refurbished refrigerators support",
      "appliance warranty",
      "refurbished appliances help",
      articleMeta.categoryLabel,
      articleMeta.question,
    ],
  };
}

export default async function SupportPage({ params }: PageProps) {
  const { slug } = await params;
  const [categorySlug, articleSlug] = slug ?? [];
  const { categoryId, articleId } = resolveSelection(categorySlug, articleSlug);
  const faqJsonLd = buildSupportFaqJsonLd();
  const article = getArticle(categoryId, articleId);

  const articleJsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "QAPage",
        mainEntity: {
          "@type": "Question",
          name: article.question,
          text: article.question,
          answerCount: 1,
          acceptedAnswer: {
            "@type": "Answer",
            text: article.answer,
          },
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {articleJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      ) : null}
      <SupportCenter initialCategoryId={categoryId} initialArticleId={articleId} />
    </>
  );
}
