"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ProductBadge from "@/components/featured-products/ProductBadge";
import ProductCTA from "@/components/featured-products/ProductCTA";

const FALLBACK_IMAGE = "/featured/featured-1.jpg";

export type FeaturedProduct = {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  condition: "Like New" | "Excellent" | "Certified Premium";
  warranty: "1-Year Warranty Included" | "Warranty Included";
  tags?: Array<"Best Seller" | "Most Popular" | "Certified Premium">;
  specs: string[];
  href?: string;
  whatsappHref?: string;
};

export type ProductCardProps = {
  product: FeaturedProduct;
  className?: string;
};

export default function ProductCard({ product, className }: ProductCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(product.image);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl",
        "border border-white/12 bg-white/[0.06]",
        "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
        "shadow-[0_26px_70px_rgba(0,0,0,0.55)]",
        "will-change-transform",
        className,
      )}
    >
      {/* ambient edge light */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(900px_360px_at_50%_0%,rgba(0,0,0,0.10),transparent_55%),radial-gradient(520px_240px_at_80%_20%,rgba(255,90,85,0.14),transparent_55%)]" />

      <div className="relative flex h-full flex-col p-5 sm:p-6">
        {/* header badges */}
        <div className="flex flex-wrap items-center gap-2">
          {(product.tags ?? []).slice(0, 1).map((t) => (
            <ProductBadge key={t} label={t} tone="premium" scheme="dark" />
          ))}
          <ProductBadge
            label={product.warranty}
            tone="warranty"
            scheme="dark"
          />
          <ProductBadge label={product.condition} scheme="dark" />
        </div>

        {/* image */}
        <div
          className={cn(
            "mt-4 relative overflow-hidden rounded-2xl",
            // studio-lit product stage (always clean)
            "bg-[radial-gradient(650px_280px_at_50%_35%,rgba(255,255,255,0.95),rgba(255,255,255,0.72)_55%,rgba(255,255,255,0.55)_72%,rgba(255,255,255,0.0)_100%)]",
            "border border-white/10 bg-white",
            "aspect-[4/3]",
          )}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={src}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 86vw, (max-width: 1200px) 45vw, 33vw"
              className={cn(
                "object-contain p-6",
                "transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                loaded ? "opacity-100" : "opacity-0",
              )}
              quality={92}
              onLoad={() => setLoaded(true)}
              onError={() => {
                setLoaded(true);
                if (src !== FALLBACK_IMAGE) setSrc(FALLBACK_IMAGE);
              }}
            />
          </motion.div>
        </div>

        {/* content */}
        <div className="mt-5 flex flex-1 flex-col">
          <div
            className={cn(
              "text-[15px] font-semibold leading-snug tracking-tight text-white sm:text-[16px]",
              "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
            )}
          >
            {product.name}
          </div>

          {/* pricing */}
          <div className="mt-2 flex items-end gap-2">
            <div className="text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
              ₹{product.price.toLocaleString("en-IN")}
            </div>
            {product.originalPrice ? (
              <div className="pb-[2px] text-[12px] font-medium text-white/45 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </div>
            ) : null}
          </div>

          {/* specs */}
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {product.specs.slice(0, 4).map((s) => (
              <li key={s} className="flex items-start gap-2">
                <CheckCircle2 className="mt-[2px] h-4 w-4 text-white/70" />
                <span className="text-[12px] leading-5 text-white/70">
                  {s}
                </span>
              </li>
            ))}
          </ul>

          <ProductCTA
            className="mt-auto"
            href={product.href}
            whatsappHref={product.whatsappHref}
          />
        </div>
      </div>

      {/* premium micro-line */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(255,90,85,0.30),transparent)] opacity-70" />
    </motion.article>
  );
}

