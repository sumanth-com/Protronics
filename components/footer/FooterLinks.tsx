"use client";

import Link from "next/link";
import { FOOTER_NAV_GROUPS, type FooterLinkGroup } from "@/lib/footer";
import { cn } from "@/lib/utils";

export type FooterLinksProps = {
  groups?: FooterLinkGroup[];
  className?: string;
};

export default function FooterLinks({
  groups = FOOTER_NAV_GROUPS,
  className,
}: FooterLinksProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-8", className)}>
      {groups.map((g) => (
        <div key={g.title}>
          <div className="footer-col-title text-[11px] font-medium tracking-[0.2em] text-theme-fg-faint">
            {g.title}
          </div>
          <ul className="mt-2 space-y-0.5 sm:mt-3 sm:space-y-1">
            {g.links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  prefetch
                  className="footer-link inline-flex min-h-0 items-center py-1.5 text-[13px] sm:py-0.5 lg:min-h-0"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
