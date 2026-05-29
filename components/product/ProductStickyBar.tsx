"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 px-4 py-3 backdrop-blur-xl sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <ProductLeadActions
          product={product}
          onReserve={onReserve}
          onCallback={onCallback}
        />
      </div>
    </motion.div>
  );
}
