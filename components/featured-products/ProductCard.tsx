"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ProductBadge from "@/components/featured-products/ProductBadge";
import ProductCTA from "@/components/featured-products/ProductCTA";

const FALLBACK_IMAGE = "/featured/featured-1.webp";

/** Shorter pill copy so badges stay on one row inside narrow cards */
function badgeDisplayLabel(label: string): string {
  const short: Record<string, string> = {
    "1-Year Warranty Included": "1Y Warranty",
    "Warranty Included": "Warranty",
    "Certified Premium": "Cert. Premium",
  };
  return short[label] ?? label;
}

/** Readable short labels — full text on hover, no ellipsis clipping */
function specDisplayLabel(spec: string): string {
  const short: Record<string, string> = {
    "Stabilizer Free": "Stabilizer",
    "Space Optimized": "Space Save",
    "Energy Saver": "Energy Saver",
    "Commercial Grade": "Commercial",
    "Premium Finish": "Premium",
    "Smart Shelves": "Smart Shelf",
    "Display Ready": "Display",
    "Fast Recovery": "Fast Cool",
    "Door Cooling+": "Door Cool+",
    "Twin Cooling": "Twin Cool",
    "Power Cool": "Power Cool",
    "Heavy Duty": "Heavy Duty",
    "Low Noise": "Low Noise",
    "Quick Chill": "Quick Chill",
    "Low Power": "Low Power",
  };
  return short[spec] ?? spec;
}

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
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl",
        "premium-card border border-white/12 bg-black",
        "transition-transform duration-150 ease-out hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative flex h-full flex-col p-5 sm:p-6">
        {/* header badges — single row */}
        <div className="product-card-badges flex min-w-0 flex-nowrap items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(product.tags ?? []).slice(0, 1).map((t) => (
            <ProductBadge
              key={t}
              label={badgeDisplayLabel(t)}
              title={t}
              tone="premium"
              scheme="dark"
              compact
            />
          ))}
          <ProductBadge
            label={badgeDisplayLabel(product.warranty)}
            title={product.warranty}
            tone="warranty"
            scheme="dark"
            compact
          />
          <ProductBadge
            label={badgeDisplayLabel(product.condition)}
            title={product.condition}
            scheme="dark"
            compact
          />
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
          <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.03]">
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
          </div>
        </div>

        {/* content */}
        <div className="mt-5 flex flex-1 flex-col sm:mt-6">
          <div
            className={cn(
              "text-[16px] font-semibold leading-snug tracking-tight text-white sm:text-[17px]",
              "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
            )}
          >
            {product.name}
          </div>

          {/* pricing */}
          <div className="mt-2.5 flex items-end gap-2.5">
            <div className="text-[20px] font-semibold tracking-tight text-white sm:text-[22px]">
              ₹{product.price.toLocaleString("en-IN")}
            </div>
            {product.originalPrice ? (
              <div className="pb-0.5 text-[13px] font-medium text-white/45 line-through sm:text-[14px]">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </div>
            ) : null}
          </div>

          {/* specs — full labels, one row, spread across card */}
          <ul className="product-card-specs mt-4 flex w-full flex-wrap items-start gap-x-2 gap-y-1.5 sm:mt-4 sm:flex-nowrap sm:items-center sm:justify-between sm:gap-1.5">
            {product.specs.slice(0, 3).map((s) => (
              <li key={s} className="flex items-center gap-1">
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0 text-white/70"
                  strokeWidth={2}
                  aria-hidden
                />
                <span
                  className="whitespace-nowrap text-[12px] font-medium leading-none text-white/75"
                  title={s}
                >
                  {specDisplayLabel(s)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-5 sm:pt-6">
            <ProductCTA href={product.href} whatsappHref={product.whatsappHref} />
          </div>
        </div>
      </div>

      {/* premium micro-line */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.25),transparent)] opacity-70" />
    </motion.article>
  );
}

