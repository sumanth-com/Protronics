"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { ctaButtonClass } from "@/components/ui/CtaButton";
import { useEffect, useState } from "react";
import { buildProductPath } from "@/lib/product-detail";
import { getCategoryBySlug, type ShopProduct } from "@/lib/shop";
import { cn } from "@/lib/utils";

import { DEFAULT_PRODUCT_IMAGE } from "@/lib/product-images";

const FALLBACK = DEFAULT_PRODUCT_IMAGE;

function ratingForProduct(product: ShopProduct) {
  return Math.min(4.9, 4.2 + (product.popularity % 8) * 0.1);
}

function reviewLabel(product: ShopProduct) {
  const n = Math.round(product.popularity * 17 + product.salesRank * 120);
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

type ShopProductCardProps = {
  product: ShopProduct;
};

export default function ShopProductCard({ product }: ShopProductCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(product.image);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
  const category = getCategoryBySlug(product.categoryId);
  const rating = ratingForProduct(product);
  const reviews = reviewLabel(product);

  useEffect(() => {
    setSrc(product.image);
    setLoaded(false);
  }, [product.image]);

  return (
    <article className="shop-list-card">
      <Link href={buildProductPath(product.id)} prefetch className="shop-list-card-link">
        <div className="shop-list-card-media">
          {product.tag ? (
            <span className="shop-list-card-badge">{product.tag}</span>
          ) : null}
          <Image
            key={product.image}
            src={src}
            alt={product.name}
            fill
            sizes="120px"
            className={cn(
              "object-contain p-2 transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            quality={85}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setLoaded(true);
              if (src !== FALLBACK) setSrc(FALLBACK);
            }}
          />
        </div>

        <div className="shop-list-card-body">
          <h3 className="shop-list-card-title">{product.name}</h3>

          {category ? (
            <span className="shop-list-card-pill">{category.label}</span>
          ) : null}

          <div className="shop-list-card-rating" aria-label={`${rating.toFixed(1)} out of 5`}>
            <span className="shop-list-card-rating-val">{rating.toFixed(1)}</span>
            <div className="shop-list-card-stars" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.round(rating)
                      ? "shop-list-card-star shop-list-card-star--filled"
                      : "shop-list-card-star shop-list-card-star--empty",
                  )}
                />
              ))}
            </div>
            <span className="shop-list-card-reviews">({reviews})</span>
          </div>

          <p className="shop-list-card-social">
            {product.tag === "Best Seller" ? "500+ bought in past month" : "Certified renewed · In stock"}
          </p>

          <div className="shop-list-card-price-block">
            <span className="shop-list-card-price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="shop-list-card-mrp">
              M.R.P.:{" "}
              <span className="line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
              {discount > 0 ? ` (${discount}% off)` : null}
            </span>
          </div>

          {product.deliveryAvailable ? (
            <p className="shop-list-card-delivery">
              <span className="shop-list-card-delivery-free">FREE delivery</span>
              {" · Bengaluru metro"}
            </p>
          ) : null}

          <p className="shop-list-card-service">
            Service: {product.warranty} warranty · {product.condition}
          </p>

          <span className={cn("shop-list-card-cta", ctaButtonClass, "text-[13px]")}>
            View Product
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}
