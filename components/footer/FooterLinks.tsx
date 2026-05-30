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
    <div className={cn("grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8", className)}>
      {groups.map((g) => (
        <div key={g.title}>
          <div className="footer-col-title text-[11px] font-medium tracking-[0.2em] text-white/55">
            {g.title}
          </div>
          <ul className="mt-3 space-y-2">
            {g.links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} prefetch className="footer-link text-[13px]">
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
