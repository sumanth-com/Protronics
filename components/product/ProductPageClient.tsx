"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import ProductGallery, { TrustBadgeRow } from "@/components/product/ProductGallery";
import CallbackModal from "@/components/product/CallbackModal";
import CompareModal from "@/components/product/CompareModal";
import ReserveModal from "@/components/product/ReserveModal";
import ProductRelated from "@/components/product/ProductRelated";
import {
  ProductHighlights,
  ProductInspectionReport,
  ProductWarrantyDelivery,
} from "@/components/product/ProductSections";
import ProductStickyBar from "@/components/product/ProductStickyBar";
import { useCompare } from "@/hooks/useProductStore";
import {
  TRUST_BADGES,
  getProductById,
  type ProductDetail,
} from "@/lib/product-detail";
import type { ShopProduct } from "@/lib/shop";
import { getCategoryBySlug } from "@/lib/shop";

type ProductPageClientProps = {
  product: ProductDetail;
  related: ShopProduct[];
};

export default function ProductPageClient({ product, related }: ProductPageClientProps) {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const { ids: compareIds } = useCompare();

  const compareProducts = useMemo(
    () =>
      compareIds
        .map((id) => getProductById(id))
        .filter((p): p is ProductDetail => p !== null),
    [compareIds],
  );

  const category = getCategoryBySlug(product.categoryId);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const openCompare = () => {
    if (compareProducts.length > 0) setCompareOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0c0a] pb-32 text-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">
        {/* Breadcrumb */}
        <nav className="mb-3 flex items-center gap-1 overflow-hidden text-[11px] text-white/45 sm:mb-4 sm:text-[12px]">
          <Link href="/" className="shrink-0 hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href="/shop" className="shrink-0 hover:text-white">
            Shop
          </Link>
          {category ? (
            <>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <Link href={`/shop/${category.slug}`} className="shrink-0 hover:text-white">
                {category.label}
              </Link>
            </>
          ) : null}
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="truncate text-white/70">{product.name}</span>
        </nav>

        {/* Hero — fits first viewport on desktop */}
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8 lg:h-[calc(100dvh-64px-120px-52px)]">
          <ProductGallery images={product.images} alt={product.name} className="h-full lg:min-h-0" />

          <div className="flex h-full items-center lg:py-1">
            <div className="w-full space-y-3 lg:space-y-2.5">
              {product.tag ? (
                <span className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-white/70">
                  {product.tag}
                </span>
              ) : null}
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wide text-white/45">
                  {product.brand} · {product.capacity}
                </p>
                <h1 className="mt-1 text-[22px] font-semibold leading-tight text-white sm:text-[26px] lg:text-[28px]">
                  {product.name}
                </h1>
                <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-white/55">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/70">
                  {product.condition}
                </span>
                <span className="rounded-full border border-[#39ff88]/25 bg-[#39ff88]/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-[#39ff88]/90">
                  {product.warranty} Warranty
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/70">
                  {product.availability}
                </span>
              </div>

              <div className="flex flex-wrap items-end gap-2">
                <span className="text-[28px] font-semibold tracking-tight text-white sm:text-[30px]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {discount > 0 ? (
                  <>
                    <span className="pb-0.5 text-[13px] text-white/40 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="mb-0.5 rounded-full bg-[#39ff88]/15 px-2 py-0.5 text-[11px] font-semibold text-[#39ff88]">
                      {discount}% off
                    </span>
                  </>
                ) : null}
              </div>

              <TrustBadgeRow badges={TRUST_BADGES} />

              <ul className="flex flex-wrap gap-x-3 gap-y-0.5">
                {product.specs.map((spec) => (
                  <li key={spec} className="text-[12px] text-white/55">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-12 space-y-14 sm:mt-14 sm:space-y-16">
          <ProductInspectionReport inspection={product.inspection} />
          <ProductHighlights highlights={product.highlights} idealFor={product.idealFor} />
          <ProductWarrantyDelivery
            warranty={product.warranty}
            coverage={product.warrantyCoverage}
            deliveryTimeline={product.deliveryTimeline}
            installationSupport={product.installationSupport}
          />
          <ProductRelated products={related} />
        </div>
      </div>

      <ProductStickyBar
        product={product}
        onReserve={() => setReserveOpen(true)}
        onCallback={() => setCallbackOpen(true)}
        onCompare={openCompare}
      />
      <ReserveModal
        product={product}
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
      />
      <CallbackModal
        product={product}
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
      />
      <CompareModal open={compareOpen} onClose={() => setCompareOpen(false)} products={compareProducts} />
    </main>
  );
}
