import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ShopPageClient from "@/components/shop/ShopPageClient";
import {
  SHOP_CATEGORIES,
  buildCategoryMetadata,
  getCategoryBySlug,
  getShopJsonLd,
} from "@/lib/shop";

type PageProps = {
  params: Promise<{ category?: string[] }>;
  searchParams: Promise<{ brand?: string }>;
};

export async function generateStaticParams() {
  return [
    { category: [] as string[] },
    ...SHOP_CATEGORIES.map((c) => ({ category: [c.slug] })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const slug = category?.[0];
  const meta = buildCategoryMetadata(slug);

  return {
    title: meta.title,
    description: meta.description,
    alternates: slug ? { canonical: `/shop/${slug}` } : { canonical: "/shop" },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function ShopPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const { brand } = await searchParams;
  const slug = category?.[0];

  if (slug && !getCategoryBySlug(slug)) {
    redirect("/shop");
  }

  const validCategory = slug && getCategoryBySlug(slug) ? slug : undefined;
  const jsonLd = getShopJsonLd(validCategory);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ShopPageClient initialCategory={validCategory} initialBrand={brand} />
    </>
  );
}
