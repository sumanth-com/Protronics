"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductCTAProps = {
  href?: string;
  whatsappHref?: string;
  className?: string;
};

export default function ProductCTA({
  href = "#shop",
  whatsappHref,
  className,
}: ProductCTAProps) {
  return (
    <div className={cn("mt-5 flex items-center gap-2", className)}>
      <motion.a
        href={href}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "group inline-flex flex-1 items-center justify-center gap-2 rounded-full",
          "bg-white text-black",
          "px-4 py-2.5 text-[12px] font-medium tracking-wide",
          "shadow-[0_14px_30px_rgba(0,0,0,0.45)]",
          "ring-1 ring-white/10",
        )}
      >
        View Details
        <ArrowUpRight className="h-4 w-4 opacity-85 transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
      </motion.a>

      {whatsappHref ? (
        <motion.a
          href={whatsappHref}
          aria-label="WhatsApp Inquiry"
          whileHover={{ y: -1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "inline-flex items-center justify-center rounded-full",
            "border border-white/12 bg-white/[0.06]",
            "px-3 py-2.5",
            "shadow-[0_10px_22px_rgba(0,0,0,0.45)]",
          )}
        >
          <MessageCircle className="h-4 w-4 text-white/80" />
        </motion.a>
      ) : null}
    </div>
  );
}

