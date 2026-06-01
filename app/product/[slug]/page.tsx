import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageClient from "@/components/product/ProductPageClient";
import { buildBreadcrumbJsonLd } from "@/lib/faq";
import {
  buildProductMetadata,
  getAllProductSlugs,
  getProductBySlug,
  getProductJsonLd,
  getRelatedProducts,
} from "@/lib/product-detail";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found | Protronics" };

  const meta = buildProductMetadata(product);
  const ogImage = product.images[0]
    ? product.images[0].startsWith("http")
      ? product.images[0]
      : absoluteUrl(product.images[0])
    : undefined;

  return buildPageMetadata({
    absoluteTitle: meta.title,
    description: meta.description,
    path: `/product/${slug}`,
    ogImage,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const productJsonLd = getProductJsonLd(product);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: product.name, path: `/product/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductPageClient product={product} related={related} />
    </>
  );
}
