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
        "footer-bottom flex w-full flex-col items-center gap-3 py-4 text-center",
        "lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-5 lg:text-left",
        className,
      )}
    >
      <p className="footer-bottom-copy order-2 text-[12px] text-theme-fg-muted lg:order-1">
        © {new Date().getFullYear()} Protronics. All rights reserved.
      </p>

      <nav
        className="footer-legal-row order-1 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-1 lg:order-2 lg:w-auto lg:justify-end"
        aria-label="Legal"
      >
        {FOOTER_LEGAL_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            prefetch
            className="footer-link footer-legal-link inline-flex min-h-[44px] items-center text-[12px] font-medium lg:min-h-0"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
