"use client";

import Link from "next/link";
import {
  AirVent,
  Box,
  Building2,
  DoorClosed,
  DoorOpen,
  Refrigerator,
  Shirt,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { label: "Refrigerators", href: "/shop", icon: Refrigerator },
  { label: "Double Door", href: "/shop/double-door", icon: DoorOpen },
  { label: "Single Door", href: "/shop/single-door", icon: DoorClosed },
  { label: "Mini Fridges", href: "/shop/mini-fridges", icon: Box },
  { label: "Commercial", href: "/shop/commercial", icon: Building2 },
  { label: "Washing", href: "/shop", icon: Shirt },
  { label: "ACs", href: "/shop", icon: AirVent },
  { label: "Appliances", href: "/shop", icon: Sparkles },
] as const;

export default function MobileCategoryIcons({ className }: { className?: string }) {
  return (
    <section
      className={cn("mobile-category-strip lg:hidden", className)}
      aria-label="Browse categories"
    >
      <div
        className="-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        data-lenis-prevent
      >
        <ul className="flex w-max min-w-full gap-3 px-2">
          {categories.map(({ label, href, icon: Icon }) => (
            <li key={label} className="shrink-0">
              <Link href={href} prefetch className="mobile-category-chip group">
                <span className="mobile-category-icon" aria-hidden>
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <span className="mobile-category-label">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
