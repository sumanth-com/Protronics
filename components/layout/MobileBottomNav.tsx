"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Headset,
  Home,
  Phone,
  ShoppingBag,
  Tags,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", label: "Home", href: "/", icon: Home, match: (p: string) => p === "/" },
  {
    id: "shop",
    label: "Shop",
    href: "/shop",
    icon: ShoppingBag,
    match: (p: string) => p.startsWith("/shop"),
  },
  {
    id: "deals",
    label: "Deals",
    href: "/best-deals",
    icon: Tags,
    match: (p: string) => p === "/best-deals" || p.startsWith("/best-deals/"),
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    icon: Headset,
    match: (p: string) => p === "/support" || p.startsWith("/support/"),
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    icon: Phone,
    match: (p: string) => p === "/contact" || p.startsWith("/contact/"),
  },
] as const;

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="mobile-bottom-nav lg:hidden"
      aria-label="Primary mobile navigation"
    >
      <ul className="mobile-bottom-nav-list">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.match(pathname);

          return (
            <li key={tab.id}>
              <Link
                href={tab.href}
                prefetch
                className={cn("mobile-bottom-nav-item", active && "is-active")}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="mobile-bottom-nav-icon" strokeWidth={2} />
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
