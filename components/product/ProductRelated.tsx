"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { buildProductPath } from "@/lib/product-detail";
import type { ShopProduct } from "@/lib/shop";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";

const FALLBACK = "/featured/featured-1.webp";

type ProductRelatedProps = {
  products: ShopProduct[];
};

export default function ProductRelated({ products }: ProductRelatedProps) {
  if (products.length === 0) return null;

  return (
    <section className="overflow-hidden">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium tracking-[0.2em] text-white/55">RELATED</p>
          <h2 className="mt-2 text-[22px] font-semibold text-white sm:text-[26px]">
            Similar appliances
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden items-center gap-1 text-[13px] text-white/55 hover:text-white sm:flex"
        >
          View all
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative mt-6">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.15}
          navigation
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
          className="!overflow-visible [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white"
        >
          {products.map((p) => (
            <SwiperSlide key={p.id}>
              <Link
                href={buildProductPath(p.id)}
                className={cn(
                  "group block overflow-hidden rounded-2xl border border-white/[0.08] bg-black",
                  "transition-transform duration-300 hover:-translate-y-1",
                )}
              >
                <div className="relative aspect-[4/3] bg-black">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 80vw, 25vw"
                    className="object-contain p-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK;
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-[11px] text-white/45">
                    {p.brand} · {p.capacity}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-[14px] font-semibold text-white">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[16px] font-semibold text-white">
                    ₹{p.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
