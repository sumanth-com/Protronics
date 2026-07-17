"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Package,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import ProductShareButton from "@/components/product/ProductShareButton";
import ProductMobileGallery from "@/components/product/mobile/ProductMobileGallery";
import {
  useRecentlyViewedProducts,
  useTrackRecentlyViewed,
} from "@/hooks/useRecentlyViewed";
import {
  buildProductPath,
  type ProductDetail,
} from "@/lib/product-detail";
import {
  getDiscountPercent,
  getHighlightChips,
  getMarketplaceOffers,
  getMonthlySavings,
  getProductRating,
  getProductReviewCount,
  getProductSpecGroups,
  getTradeInCategoryLabel,
  getVerifiedPurchaseCount,
} from "@/lib/product-marketplace";
import type { ShopCategory, ShopProduct } from "@/lib/shop";
import { cn } from "@/lib/utils";

import { DEFAULT_PRODUCT_IMAGE } from "@/lib/product-images";

const FALLBACK = DEFAULT_PRODUCT_IMAGE;

const pdpCard =
  "rounded-xl border border-theme-border bg-theme-surface-card";
const pdpSectionTitle =
  "text-[12px] font-semibold uppercase tracking-wide text-theme-fg-muted";

type ProductPageMobileProps = {
  product: ProductDetail;
  related: ShopProduct[];
  category: ShopCategory | undefined;
};

function OfferIcon({ type }: { type: "shield" | "truck" | "wrench" | "check" | "sparkle" }) {
  const cls = "h-3.5 w-3.5 shrink-0 text-emerald-700";
  if (type === "shield") return <ShieldCheck className={cls} />;
  if (type === "truck") return <Truck className={cls} />;
  if (type === "wrench") return <Wrench className={cls} />;
  if (type === "sparkle") return <Sparkles className={cls} />;
  return <Package className={cls} />;
}

function MarketplaceProductCard({ product: p }: { product: ShopProduct }) {
  const rating = getProductRating(p);
  const reviews = getProductReviewCount(p);

  return (
    <Link
      href={buildProductPath(p.id)}
      className={cn("block overflow-hidden", pdpCard)}
    >
      <div className="relative aspect-square bg-theme-bg-secondary">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="50vw"
          className="object-contain p-2"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK;
          }}
        />
      </div>
      <div className="space-y-1 p-2.5">
        <p className="line-clamp-2 text-[12px] font-medium leading-snug text-theme-fg">{p.name}</p>
        <div className="flex items-center gap-1 text-[10px] text-amber-700">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          <span className="font-semibold">{rating}</span>
          <span className="text-theme-fg-faint">({reviews})</span>
        </div>
        <p className="text-[14px] font-bold text-theme-fg">₹{p.price.toLocaleString("en-IN")}</p>
        <p className="text-[10px] text-theme-fg-muted">{p.warranty} Warranty</p>
      </div>
    </Link>
  );
}

function SpecAccordion({ groups }: { groups: ReturnType<typeof getProductSpecGroups> }) {
  const [open, setOpen] = useState<string | null>(groups[0]?.title ?? null);

  return (
    <div className={cn("divide-y divide-theme-border-subtle", pdpCard)}>
      {groups.map((group) => {
        const isOpen = open === group.title;
        return (
          <div key={group.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : group.title)}
              className="flex w-full items-center justify-between px-3.5 py-3 text-left touch-manipulation"
            >
              <span className="text-[13px] font-semibold text-theme-fg">{group.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-theme-fg-muted transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen ? (
              <dl className="space-y-2 border-t border-theme-border-subtle px-3.5 pb-3 pt-2">
                {group.items.map((item, idx) => (
                  <div key={`${item.label}-${idx}`} className="flex justify-between gap-3 text-[12px]">
                    <dt className="text-theme-fg-muted">{item.label}</dt>
                    <dd className="text-right font-medium text-theme-fg-secondary">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function ProductGrid({
  title,
  products,
}: {
  title: string;
  products: ShopProduct[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="pdp-mobile-section">
      <h2 className="pdp-mobile-section-title">{title}</h2>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        {products.map((p) => (
          <MarketplaceProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default function ProductPageMobile({
  product,
  related,
  category,
}: ProductPageMobileProps) {
  useTrackRecentlyViewed(product.id);
  const recentlyViewed = useRecentlyViewedProducts(product.id, 6);

  const rating = getProductRating(product);
  const reviewCount = getProductReviewCount(product);
  const verifiedCount = getVerifiedPurchaseCount(product);
  const discount = getDiscountPercent(product);
  const monthlySavings = getMonthlySavings(product);
  const offers = getMarketplaceOffers(product);
  const highlightChips = getHighlightChips(product);
  const specGroups = getProductSpecGroups(product);
  const tradeInLabel = getTradeInCategoryLabel(product);

  return (
    <div className="pdp-mobile bg-theme-bg pb-6 text-theme-fg">
      <nav className="flex items-center gap-0.5 overflow-hidden px-3 py-2 text-[10px] text-theme-fg-faint">
        <Link href="/" className="shrink-0 hover:text-theme-fg">
          Home
        </Link>
        <ChevronRight className="h-2.5 w-2.5 shrink-0" />
        <Link href="/shop" className="shrink-0 hover:text-theme-fg">
          Shop
        </Link>
        {category ? (
          <>
            <ChevronRight className="h-2.5 w-2.5 shrink-0" />
            <Link href={`/shop/${category.slug}`} className="shrink-0 hover:text-theme-fg">
              {category.label}
            </Link>
          </>
        ) : null}
        <ChevronRight className="h-2.5 w-2.5 shrink-0" />
        <span className="truncate text-theme-fg-muted">{product.brand}</span>
      </nav>

      <ProductMobileGallery images={product.images} alt={product.name} />

      <div className="space-y-3 px-3 pt-3">
        {product.tag ? (
          <span className="inline-block rounded bg-theme-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-theme-accent">
            {product.tag}
          </span>
        ) : null}

        <div className="flex items-start justify-between gap-2">
          <h1 className="min-w-0 flex-1 text-[17px] font-semibold leading-snug text-theme-fg">
            {product.name}
          </h1>
          <ProductShareButton
            productId={product.id}
            productName={product.name}
            variant="icon"
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1">
            <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[13px] font-bold text-emerald-700">
              {rating}
            </span>
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          </div>
          <Link href="#pdp-reviews" className="text-[12px] text-sky-700">
            {reviewCount} Reviews
          </Link>
          <span className="text-[11px] text-theme-fg-faint">
            {verifiedCount} verified purchases
          </span>
        </div>

        <section className={cn(pdpCard, "p-3")}>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[26px] font-bold leading-none text-theme-fg">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {discount > 0 ? (
              <>
                <span className="text-[13px] text-theme-fg-faint line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-[11px] font-bold text-red-700">
                  {discount}% off
                </span>
              </>
            ) : null}
          </div>
          {monthlySavings > 0 ? (
            <p className="mt-1.5 text-[11px] text-emerald-700">
              Save ₹{monthlySavings.toLocaleString("en-IN")}/month vs new price
            </p>
          ) : null}
          <p className="mt-2 inline-flex rounded-md bg-theme-input-bg px-2 py-1 text-[11px] font-medium text-theme-fg-secondary">
            Condition: {product.condition}
          </p>
        </section>

        <section>
          <h2 className={cn("mb-2", pdpSectionTitle)}>Offers & Trust</h2>
          <div className="grid grid-cols-2 gap-2">
            {offers.map((offer) => (
              <div
                key={offer.label}
                className={cn(
                  "flex items-center gap-2 rounded-lg border border-theme-border-subtle bg-theme-surface-card px-2.5 py-2",
                )}
              >
                <OfferIcon type={offer.icon} />
                <span className="text-[11px] font-medium leading-tight text-theme-fg-secondary">
                  {offer.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={cn("mb-2", pdpSectionTitle)}>Key Highlights</h2>
          <div className="flex flex-wrap gap-1.5" data-lenis-prevent>
            {highlightChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-theme-border bg-theme-input-bg px-2.5 py-1 text-[11px] font-medium text-theme-fg-secondary"
              >
                {chip}
              </span>
            ))}
          </div>
        </section>

        <section
          className={cn(
            pdpCard,
            "bg-gradient-to-br from-theme-accent/8 to-transparent p-3",
          )}
        >
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-theme-accent/15">
              <RefreshCw className="h-5 w-5 text-theme-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-theme-fg">
                Have an old {tradeInLabel}?
              </p>
              <p className="mt-0.5 text-[11px] text-theme-fg-muted">Get an instant sell estimate</p>
              <Link
                href="/sell"
                className="mt-2 inline-flex rounded-lg bg-theme-accent px-3 py-2 text-[11px] font-semibold text-theme-accent-fg touch-manipulation active:opacity-90"
              >
                Check Sell Value
              </Link>
            </div>
          </div>
        </section>

        <section className={cn(pdpCard, "p-3")}>
          <h2 className={pdpSectionTitle}>Delivery & Support</h2>
          <ul className="mt-2.5 space-y-2">
            <li className="flex items-start gap-2 text-[12px] text-theme-fg-secondary">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-theme-fg-muted" />
              <span>
                <strong className="font-semibold text-theme-fg">
                  {product.deliveryAvailable ? "Delivery Available" : "Delivery on Enquiry"}
                </strong>
                <br />
                {product.deliveryTimeline}
              </span>
            </li>
            <li className="flex items-start gap-2 text-[12px] text-theme-fg-secondary">
              <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-theme-fg-muted" />
              <span>{product.installationSupport}</span>
            </li>
            <li className="flex items-start gap-2 text-[12px] text-theme-fg-secondary">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-theme-fg-muted" />
              <span>{product.warranty} warranty · WhatsApp & phone support</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className={cn("mb-1.5", pdpSectionTitle)}>About this product</h2>
          <p className="text-[13px] leading-relaxed text-theme-fg-muted">{product.description}</p>
        </section>

        <section>
          <h2 className={cn("mb-2", pdpSectionTitle)}>Specifications</h2>
          <SpecAccordion groups={specGroups} />
        </section>

        <section id="pdp-reviews" className={cn(pdpCard, "p-3")}>
          <h2 className={pdpSectionTitle}>Customer Reviews</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[22px] font-bold text-theme-fg">{rating}</span>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < Math.floor(rating)
                        ? "fill-amber-500 text-amber-500"
                        : "text-theme-border",
                    )}
                  />
                ))}
              </div>
              <p className="text-[11px] text-theme-fg-muted">
                {reviewCount} reviews · {verifiedCount} verified
              </p>
            </div>
          </div>
        </section>

        <ProductGrid title="Related Products" products={related} />
        <ProductGrid title="Recently Viewed" products={recentlyViewed} />
      </div>
    </div>
  );
}
