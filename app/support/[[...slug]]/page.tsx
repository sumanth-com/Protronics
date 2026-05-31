import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SupportCenter from "@/components/support/SupportCenter";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/site";
import {
  buildArticleMetadata,
  buildSupportFaqJsonLd,
  buildSupportHubMetadata,
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
  const hubMeta = buildSupportHubMetadata();

  const meta = !slug?.length ? hubMeta : articleMeta ?? hubMeta;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.path,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: slug?.length === 2 ? "article" : "website",
      url: absoluteUrl(meta.path),
      images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function SupportPage({ params }: PageProps) {
  const { slug } = await params;
  const [categorySlug, articleSlug] = slug ?? [];

  if (categorySlug === "contact" || categorySlug === "contact-support") {
    redirect("/support");
  }

  const { categoryId, articleId } = resolveSelection(categorySlug, articleSlug);
  const faqJsonLd = buildSupportFaqJsonLd();
  const article = getArticle(categoryId, articleId);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Support",
        item: absoluteUrl("/support"),
      },
      ...(article
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: article.question,
              item: absoluteUrl(`/support/${categoryId}/${articleId}`),
            },
          ]
        : []),
    ],
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
