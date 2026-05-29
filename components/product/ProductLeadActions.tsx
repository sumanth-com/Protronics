"use client";

import { Phone, Star } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CompareButton from "@/components/compare/CompareButton";
import { getWhatsAppInquiryLink, type ProductDetail } from "@/lib/product-detail";

type ProductLeadActionsProps = {
  product: ProductDetail;
  onReserve: () => void;
  onCallback: () => void;
};

export function ProductLeadActions({
  product,
  onReserve,
  onCallback,
}: ProductLeadActionsProps) {
  const outlineBtn =
    "inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2.5 text-[11px] font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08] sm:gap-2 sm:px-4 sm:text-[12px]";

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onReserve}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 text-[12px] font-semibold text-black sm:text-[13px]"
      >
        <Star className="h-4 w-4" />
        Reserve This Appliance
      </button>

      <div className="grid grid-cols-3 gap-2">
        <a
          href={getWhatsAppInquiryLink(product.name, product.id)}
          target="_blank"
          rel="noreferrer"
          className={outlineBtn}
        >
          <WhatsAppIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          <span className="hidden min-[380px]:inline">WhatsApp</span>
          <span className="min-[380px]:hidden">Chat</span>
        </a>

        <CompareButton productId={product.id} size="sm" className="min-w-0 px-2 text-[10px] sm:px-3 sm:text-[11px]" />

        <button type="button" onClick={onCallback} className={outlineBtn}>
          <Phone className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          <span className="hidden min-[380px]:inline">Callback</span>
          <span className="min-[380px]:hidden">Call</span>
        </button>
      </div>
    </div>
  );
}
