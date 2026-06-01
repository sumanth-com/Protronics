"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  ContactRound,
  HandCoins,
  Home,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", label: "Home", href: "/", icon: Home, match: (p: string) => p === "/" },
  {
    id: "shop",
    label: "Shop",
    href: "/shop",
    icon: Store,
    match: (p: string) => p.startsWith("/shop"),
  },
  {
    id: "sell",
    label: "Sell",
    href: "/sell",
    icon: HandCoins,
    match: (p: string) => p === "/sell" || p.startsWith("/sell/"),
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    icon: ClipboardList,
    match: (p: string) => p === "/support" || p.startsWith("/support/"),
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    icon: ContactRound,
    match: (p: string) => p === "/contact" || p.startsWith("/contact/"),
  },
] as const;

export default function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/product/")) return null;

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
                aria-label={tab.label}
              >
                <Icon className="mobile-bottom-nav-icon" strokeWidth={1.75} />
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
