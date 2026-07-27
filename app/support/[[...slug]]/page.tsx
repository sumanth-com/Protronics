import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
import SupportCenter from "@/components/support/SupportCenter";
import { safeJsonLdStringify } from "@/lib/safeJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import {
  buildArticleMetadata,
  buildCategorySupportMetadata,
  buildSupportFaqJsonLd,
  buildSupportHubMetadata,
  getAllArticlePaths,
  getArticle,
  resolveSelection,
} from "@/lib/support";

const StickyWhatsApp = dynamic(
  () => import("@/components/contact/StickyWhatsApp"),
);

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
  const selection = resolveSelection(categorySlug, articleSlug);
  if (!selection) {
    return buildPageMetadata({
      absoluteTitle: "Support Page Not Found | Protronics",
      description: "The requested help article could not be found.",
      path: "/support",
      noIndex: true,
    });
  }

  const { categoryId, articleId } = selection;
  const hubMeta = buildSupportHubMetadata();

  if (!slug?.length) {
    return buildPageMetadata({
      absoluteTitle: hubMeta.title,
      description: hubMeta.description,
      path: hubMeta.path,
    });
  }

  if (slug.length === 1) {
    const categoryMeta = buildCategorySupportMetadata(categoryId);
    if (!categoryMeta) {
      return buildPageMetadata({
        absoluteTitle: "Support Page Not Found | Protronics",
        description: "The requested help category could not be found.",
        path: "/support",
        noIndex: true,
      });
    }
    return buildPageMetadata({
      absoluteTitle: categoryMeta.title,
      description: categoryMeta.description,
      path: categoryMeta.path,
    });
  }

  const articleMeta = buildArticleMetadata(categoryId, articleId);
  if (!articleMeta) {
    return buildPageMetadata({
      absoluteTitle: "Support Page Not Found | Protronics",
      description: "The requested help article could not be found.",
      path: "/support",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    absoluteTitle: articleMeta.title,
    description: articleMeta.description,
    path: articleMeta.path,
    ogType: "article",
  });
}

export default async function SupportPage({ params }: PageProps) {
  const { slug } = await params;
  const [categorySlug, articleSlug] = slug ?? [];

  if (categorySlug === "contact" || categorySlug === "contact-support") {
    redirect("/support");
  }

  const selection = resolveSelection(categorySlug, articleSlug);
  if (!selection) {
    notFound();
  }
  const { categoryId, articleId } = selection;
  const isHub = !slug?.length;
  const faqJsonLd = isHub ? buildSupportFaqJsonLd() : null;
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
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(breadcrumbJsonLd) }}
      />
      {articleJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(articleJsonLd) }}
        />
      ) : null}
      <SupportCenter initialCategoryId={categoryId} initialArticleId={articleId} />
      <StickyWhatsApp />
    </>
  );
}
