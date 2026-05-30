"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type CategoryCardProps = {
  title: string;
  image: StaticImageData | string;
  href?: string;
  objectPosition?: string;
  tone?: "light" | "dark";
};

export default function CategoryCard({
  title,
  image,
  href = "#shop",
  objectPosition = "center",
  tone = "light",
}: CategoryCardProps) {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const isStatic = typeof image !== "string";

  return (
    <a
      href={href}
      className={cn(
        "category-card group relative block cursor-pointer overflow-hidden rounded-2xl border p-3",
        "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5",
        tone === "dark"
          ? "border-white/12 bg-[#111111] hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
          : "border-black/10 bg-white hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]",
      )}
    >
      <div
        ref={imgRef}
        className={cn(
          "category-card-image relative overflow-hidden rounded-xl aspect-[4/3]",
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 70vw, (max-width: 1024px) 33vw, 20vw"
          placeholder={isStatic ? "blur" : "empty"}
          quality={92}
          className={cn(
            "object-cover",
            "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]",
            "transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition }}
          onLoad={() => setLoaded(true)}
        />
      </div>

      <div className="pt-3 text-center">
        <span
          className={cn(
            "text-[12px] font-medium tracking-wide",
            tone === "dark" ? "text-white" : "text-black",
          )}
        >
          {title}
        </span>
      </div>
    </a>
  );
}

