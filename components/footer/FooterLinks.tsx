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
  const [shopGroup, ...rightGroups] = groups;

  return (
    <div
      className={cn(
        "footer-links-grid grid w-full grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-3 md:gap-8",
        className,
      )}
    >
      {shopGroup ? (
        <div className="footer-links-shop min-w-0">
          <div className="footer-col-title text-[11px] font-semibold tracking-[0.2em] text-theme-accent">
            {shopGroup.title}
          </div>
          <ul className="mt-2 space-y-0.5 sm:mt-3 sm:space-y-1">
            {shopGroup.links.map((l) => (
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
      ) : null}

      <div className="footer-links-right flex min-w-0 flex-col gap-y-4 md:contents">
        {rightGroups.map((g) => (
          <div key={g.title} className="footer-links-right-col">
            <div className="footer-col-title text-[11px] font-semibold tracking-[0.2em] text-theme-accent">
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
    </div>
  );
}
