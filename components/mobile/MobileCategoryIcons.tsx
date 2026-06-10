"use client";

import Link from "next/link";
import { Box, DoorClosed, DoorOpen, WashingMachine } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { label: "Mini Fridges", href: "/shop/mini-fridges", icon: Box },
  { label: "Single Door", href: "/shop/single-door", icon: DoorClosed },
  { label: "Double Door", href: "/shop/double-door", icon: DoorOpen },
  { label: "Washing Machines", href: "/shop/washing-machines", icon: WashingMachine },
] as const;

export default function MobileCategoryIcons({ className }: { className?: string }) {
  return (
    <section
      className={cn("mobile-category-strip lg:hidden", className)}
      aria-label="Browse categories"
    >
      <ul className="mobile-category-grid">
        {categories.map(({ label, href, icon: Icon }) => (
          <li key={label} className="mobile-category-item">
            <Link href={href} prefetch className="mobile-category-chip group">
              <span className="mobile-category-icon" aria-hidden>
                <Icon className="mobile-category-icon-svg" strokeWidth={1.75} />
              </span>
              <span className="mobile-category-label">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
