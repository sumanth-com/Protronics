"use client";

import { cn } from "@/lib/utils";

export type FooterLinksGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

export type FooterLinksProps = {
  groups?: FooterLinksGroup[];
  className?: string;
};

export default function FooterLinks({
  groups = [
    {
      title: "Shop",
      links: [
        { label: "Refrigerators", href: "/shop" },
        { label: "Premium Collection", href: "/shop/premium-hubs" },
        { label: "Best Sellers", href: "/shop" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Warranty", href: "#warranty" },
        { label: "Help Center", href: "/support" },
        { label: "Delivery Support", href: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Why Protronics", href: "/why-protronics" },
        { label: "Trade-In & Upgrade", href: "/trade-in" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "How It Works", href: "#how" },
      ],
    },
  ],
  className,
}: FooterLinksProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-8 sm:grid-cols-3", className)}>
      {groups.map((g) => (
        <div key={g.title}>
          <div className="text-[12px] font-medium tracking-[0.22em] text-white/55">
            {g.title}
          </div>
          <div className="mt-4 space-y-3">
            {g.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={cn(
                  "group block text-[13px] text-white/70",
                  "transition-colors duration-300 hover:text-white",
                )}
              >
                <span className="relative">
                  {l.label}
                  <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white/50 transition-transform duration-300 group-hover:scale-x-100" />
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

