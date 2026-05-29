"use client";

import { PackageSearch } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

type ShopEmptyStateProps = {
  onClear: () => void;
};

export default function ShopEmptyState({ onClear }: ShopEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center",
        "border border-white/[0.08] bg-[#141816]/60",
      )}
    >
      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/[0.08] bg-[#39ff88]/[0.06]">
        <PackageSearch className="h-6 w-6 text-[#39ff88]/80" />
      </div>
      <h3 className="mt-5 text-[18px] font-semibold text-white">No appliances match your filters</h3>
      <p className="mt-2 max-w-sm text-[14px] leading-7 text-white/55">
        Try adjusting categories or filters—or browse our full collection.
      </p>
      <CtaButton onClick={onClear} size="md" className="mt-6">
        Clear Filters
      </CtaButton>
    </div>
  );
}
