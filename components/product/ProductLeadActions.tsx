"use client";

import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CompareButton from "@/components/compare/CompareButton";
import ProductShareButton from "@/components/product/ProductShareButton";
import { getWhatsAppInquiryLink, type ProductDetail } from "@/lib/product-detail";

type ProductLeadActionsProps = {
  product: ProductDetail;
  onReserve: () => void;
  onCallback: () => void;
};

const outlineBtnDesktop =
  "inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2.5 text-[11px] font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08] sm:gap-2 sm:px-4 sm:text-[12px]";

const mobileCtaBtn =
  "product-cta-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-theme-accent px-3 text-[12px] font-semibold text-theme-accent-fg touch-manipulation active:opacity-90";

export function ProductLeadActions({
  product,
  onReserve,
  onCallback,
}: ProductLeadActionsProps) {
  const whatsappHref = getWhatsAppInquiryLink(product.name, product.id);

  return (
    <>
      {/* Mobile — marketplace CTA: WhatsApp Inquiry | Reserve Product */}
      <div className="product-lead-actions-mobile grid grid-cols-2 gap-2 lg:hidden">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={mobileCtaBtn}
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          <span>WhatsApp Inquiry</span>
        </a>
        <button type="button" onClick={onReserve} className={mobileCtaBtn}>
          Reserve Product
        </button>
      </div>

      {/* Desktop — unchanged two-row layout with compare */}
      <div className="hidden flex-col gap-2 lg:flex">
        <button
          type="button"
          onClick={onReserve}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 text-[12px] font-semibold text-black sm:text-[13px]"
        >
          Reserve This Appliance
        </button>

        <div className="grid grid-cols-4 gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={outlineBtnDesktop}
          >
            <WhatsAppIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span className="hidden min-[380px]:inline">WhatsApp</span>
            <span className="min-[380px]:hidden">Chat</span>
          </a>

          <CompareButton
            productId={product.id}
            size="sm"
            className="min-w-0 px-2 text-[10px] sm:px-3 sm:text-[11px]"
          />

          <ProductShareButton
            productId={product.id}
            productName={product.name}
            size="sm"
            className="min-w-0 px-2 text-[10px] sm:px-3 sm:text-[11px]"
          />

          <button type="button" onClick={onCallback} className={outlineBtnDesktop}>
            <Phone className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span className="hidden min-[380px]:inline">Callback</span>
            <span className="min-[380px]:hidden">Call</span>
          </button>
        </div>
      </div>
    </>
  );
}
