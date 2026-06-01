"use client";

import { Share2 } from "lucide-react";
import { useCallback, useState } from "react";
import { buildProductPath } from "@/lib/product-detail";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProductShareButtonProps = {
  productId: string;
  productName: string;
  size?: "sm" | "md";
  className?: string;
  variant?: "outline" | "ghost" | "icon";
};

export default function ProductShareButton({
  productId,
  productName,
  size = "md",
  className,
  variant = "outline",
}: ProductShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async () => {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : absoluteUrl(buildProductPath(productId));

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${productName} | Protronics`,
          text: `Check out ${productName} on Protronics`,
          url,
        });
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }, [productId, productName]);

  const label = copied ? "Copied!" : "Share";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={share}
        aria-label={copied ? "Link copied to clipboard" : "Share this product"}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full border border-theme-border bg-theme-surface-card p-2 text-theme-fg transition-colors touch-manipulation hover:bg-theme-elevated active:scale-[0.98]",
          className,
        )}
      >
        <Share2 className={iconSize} aria-hidden />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={copied ? "Link copied to clipboard" : "Share this product"}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-colors touch-manipulation active:scale-[0.98]",
        size === "sm" ? "px-3 py-2 text-[11px]" : "px-4 py-2.5 text-[12px]",
        variant === "outline" && "compare-toggle",
        variant === "ghost" && "text-white/70 hover:border-white/20 hover:bg-white/[0.06] hover:text-white border border-transparent",
        className,
      )}
    >
      <Share2 className={cn("shrink-0", iconSize)} aria-hidden />
      <span>{label}</span>
    </button>
  );
}
