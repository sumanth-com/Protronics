import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageClient from "@/components/product/ProductPageClient";
import {
  buildProductMetadata,
  getAllProductIds,
  getProductById,
  getProductJsonLd,
  getRelatedProducts,
} from "@/lib/product-detail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllProductIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found | Protronics" };

  const meta = buildProductMetadata(product);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/shop/product/${id}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(id);
  const jsonLd = getProductJsonLd(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageClient product={product} related={related} />
    </>
  );
}
