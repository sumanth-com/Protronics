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
        "footer-bottom flex w-full flex-col items-center gap-2 py-3 text-center",
        "max-lg:pb-1",
        "lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-4 lg:text-left",
        className,
      )}
    >
      <nav
        className={cn(
          "footer-legal-row flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-0",
          "max-lg:border-t max-lg:border-theme-border-subtle max-lg:pt-3",
          "lg:order-2 lg:w-auto lg:justify-end lg:border-0 lg:pt-0",
        )}
        aria-label="Legal"
      >
        {FOOTER_LEGAL_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            prefetch
            className="footer-link footer-legal-link inline-flex min-h-[44px] items-center text-[12px] font-medium lg:min-h-0 lg:py-0"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <p className="footer-bottom-copy text-[12px] leading-snug text-theme-fg-muted lg:order-1 lg:shrink-0">
        © {new Date().getFullYear()} Protronics. All rights reserved.
      </p>
    </div>
  );
}
