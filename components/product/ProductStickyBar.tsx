"use client";

import type { ProductDetail } from "@/lib/product-detail";
import { ProductLeadActions } from "@/components/product/ProductLeadActions";

type ProductStickyBarProps = {
  product: ProductDetail;
  onReserve: () => void;
  onCallback: () => void;
};

export default function ProductStickyBar({
  product,
  onReserve,
  onCallback,
}: ProductStickyBarProps) {
  return (
    <div className="product-sticky-bar fixed inset-x-0 bottom-0 z-40 border-t border-theme-border bg-theme-bg/95 px-4 backdrop-blur-xl sm:px-6 lg:animate-[product-sticky-in_0.5s_ease-out_0.4s_both]">
      <div className="mx-auto w-full max-w-7xl lg:py-3">
        <ProductLeadActions
          product={product}
          onReserve={onReserve}
          onCallback={onCallback}
        />
      </div>
    </div>
  );
}
