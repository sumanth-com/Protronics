"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE = "/featured/featured-1.webp";

export type MarketplaceProduct = {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  condition?: string;
  warranty?: string;
  href?: string;
  rating?: number;
  discountPercent?: number;
};

type Props = {
  product: MarketplaceProduct;
  className?: string;
};

export default function MarketplaceProductCard({ product, className }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(product.image);

  const discount =
    product.discountPercent ??
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100,
        )
      : 0);

  return (
    <article className={cn("marketplace-product-card", className)}>
      <Link href={product.href ?? "/shop"} prefetch className="block h-full">
        <div className="marketplace-product-media">
          {discount > 0 ? (
            <span className="marketplace-product-badge">{discount}% off</span>
          ) : null}
          <Image
            src={src}
            alt={product.name}
            fill
            sizes="(max-width: 1023px) 46vw, 280px"
            className={cn(
              "object-contain p-3 transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            quality={85}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setLoaded(true);
              if (src !== FALLBACK_IMAGE) setSrc(FALLBACK_IMAGE);
            }}
          />
        </div>

        <div className="marketplace-product-body">
          <h3 className="marketplace-product-name">{product.name}</h3>

          {product.rating != null ? (
            <div className="marketplace-product-rating">
              <span className="marketplace-product-rating-val">
                {product.rating.toFixed(1)}
              </span>
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
            </div>
          ) : null}

          <div className="marketplace-product-price-row">
            <span className="marketplace-product-price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice ? (
              <span className="marketplace-product-mrp">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            ) : null}
          </div>

          {product.warranty ? (
            <p className="marketplace-product-meta">{product.warranty}</p>
          ) : null}

          <span className="marketplace-product-cta">
            <ShoppingCart className="marketplace-product-cta-icon" aria-hidden />
            View Product
          </span>
        </div>
      </Link>
    </article>
  );
}
