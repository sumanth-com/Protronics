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
        "footer-bottom flex flex-col items-center gap-3 pt-0 text-center",
        "sm:flex-row sm:items-center sm:justify-between sm:text-left",
        className,
      )}
    >
      <div className="footer-bottom-copy text-[12px] text-theme-fg-muted">
        © {new Date().getFullYear()} Protronics. All rights reserved.
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] sm:justify-end">
        {FOOTER_LEGAL_LINKS.map((l) => (
          <Link key={l.label} href={l.href} prefetch className="footer-link text-[12px]">
            {l.label}
          </Link>
        ))}
        <span className="footer-bottom-copy text-theme-fg-faint">Designed by Protronics</span>
      </div>
    </div>
  );
}
