"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Scale, X } from "lucide-react";
import type { ProductDetail } from "@/lib/product-detail";

type CompareModalProps = {
  open: boolean;
  onClose: () => void;
  products: ProductDetail[];
};

export default function CompareModal({ open, onClose, products }: CompareModalProps) {
  return (
    <AnimatePresence>
      {open && products.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed inset-x-4 bottom-4 top-auto z-[91] max-h-[80vh] overflow-auto rounded-2xl border border-white/[0.08] bg-[#121412] p-5 sm:inset-x-auto sm:left-1/2 sm:w-[min(900px,94vw)] sm:-translate-x-1/2"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-[18px] font-semibold text-white">
                <Scale className="h-5 w-5 text-[#39ff88]/90" />
                Compare Appliances
              </h3>
              <button type="button" onClick={onClose}>
                <X className="h-5 w-5 text-white/50" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 text-white/45">Spec</th>
                    {products.map((p) => (
                      <th key={p.id} className="py-2 pr-4 font-medium text-white">
                        {p.brand}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Product", key: (p: ProductDetail) => p.name },
                    { label: "Capacity", key: (p: ProductDetail) => p.capacity },
                    { label: "Brand", key: (p: ProductDetail) => p.brand },
                    { label: "Warranty", key: (p: ProductDetail) => p.warranty },
                    {
                      label: "Price",
                      key: (p: ProductDetail) => `₹${p.price.toLocaleString("en-IN")}`,
                    },
                    { label: "Features", key: (p: ProductDetail) => p.specs.join(", ") },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-white/[0.06]">
                      <td className="py-3 pr-4 text-white/45">{row.label}</td>
                      {products.map((p) => (
                        <td key={p.id} className="py-3 pr-4 text-white/80">
                          {row.key(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
