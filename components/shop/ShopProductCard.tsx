"use client";

import { ArrowUpRight, Check } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import CompareButton from "@/components/compare/CompareButton";
import CtaButton from "@/components/ui/CtaButton";
import { buildProductPath } from "@/lib/product-detail";
import type { ShopProduct } from "@/lib/shop";
import { getWhatsAppProductLink } from "@/lib/shop";
import { cn } from "@/lib/utils";

const FALLBACK = "/featured/featured-1.jpg";
const TRUST_BADGES = ["Tested", "Sanitized", "Warranty Included"] as const;

type ShopProductCardProps = {
  product: ShopProduct;
};

export default function ShopProductCard({ product }: ShopProductCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(product.image);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-white/[0.08] bg-black",
        "supports-[backdrop-filter]:backdrop-blur-xl",
        "shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
      )}
    >
<div className="relative p-4 sm:p-5">
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl bg-black aspect-[4/3]">
          {product.tag ? (
            <span className="absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              {product.tag}
            </span>
          ) : null}
          {discount > 0 ? (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">
              {discount}% off
            </span>
          ) : null}
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={src}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={cn(
                "object-contain p-5 transition-opacity duration-500",
                loaded ? "opacity-100" : "opacity-0",
              )}
              quality={90}
              onLoad={() => setLoaded(true)}
              onError={() => {
                setLoaded(true);
                if (src !== FALLBACK) setSrc(FALLBACK);
              }}
            />
          </motion.div>
        </div>

        {/* Trust badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white"
            >
              <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
              {badge}
            </span>
          ))}
        </div>

        {/* Info */}
        <div className="mt-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-white/45">
            {product.brand} · {product.capacity}
          </p>
          <h3 className="mt-1 text-[15px] font-semibold leading-snug text-white sm:text-[16px]">
            {product.name}
          </h3>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/55">
            {product.condition}
          </span>
          <span className="rounded-full border border-white/25 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white">
            {product.warranty} Warranty
          </span>
        </div>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-[20px] font-semibold tracking-tight text-white">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="pb-0.5 text-[12px] text-white/40 line-through">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
          {product.specs.slice(0, 3).map((spec) => (
            <li key={spec} className="text-[12px] text-white/55">
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-3">
          <CompareButton productId={product.id} size="sm" className="w-full" />
        </div>

        <div className="mt-3 flex gap-2">
          <CtaButton href={buildProductPath(product.id)} size="sm" className="flex-1">
            View Details
            <ArrowUpRight className="h-3.5 w-3.5 text-black/80" />
          </CtaButton>
          <CtaButton
            href={getWhatsAppProductLink(product.name, product.id)}
            size="sm"
            external
            aria-label="WhatsApp inquiry"
            className="shrink-0 px-3"
          >
            <WhatsAppIcon className="h-4 w-4 text-black/80" />
          </CtaButton>
        </div>
      </div>
    </motion.article>
  );
}
