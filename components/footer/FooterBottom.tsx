"use client";

import Link from "next/link";
import { FOOTER_LEGAL_LINKS } from "@/lib/footer";
import { cn } from "@/lib/utils";

export type FooterBottomProps = {
  className?: string;
};

export default function FooterBottom({ className }: FooterBottomProps) {
  return (
    <div
      className={cn(
        "mt-0 flex flex-col gap-3 pt-0",
        "sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="footer-bottom-copy text-[12px] text-white/55">
        © {new Date().getFullYear()} Protronics. All rights reserved.
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px]">
        {FOOTER_LEGAL_LINKS.map((l) => (
          <Link key={l.label} href={l.href} prefetch className="footer-link text-[12px]">
            {l.label}
          </Link>
        ))}
        <span className="footer-bottom-copy text-white/35">Designed by Protronics</span>
      </div>
    </div>
  );
}
