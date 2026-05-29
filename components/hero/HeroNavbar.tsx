"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { RefreshCw, ShoppingBag } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo.png";

const CategoriesDropdown = dynamic(
  () => import("@/components/hero/CategoriesDropdown"),
  { ssr: false },
);

const navLinks = [
  { label: "Why Protronics", href: "/why-protronics" },
  { label: "Support", href: "/support" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const navLinkClass =
  "rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white";

export default function HeroNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative w-full",
          "border-b border-white/10",
          "bg-black",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0))]" />

        <div className="relative mx-auto flex w-full items-center gap-4 px-4 py-3 sm:px-6 lg:gap-6">
          {/* Brand */}
          <Link
            href="/"
            prefetch
            className="relative flex shrink-0 items-center gap-3"
            aria-label="Go to home"
          >
            <div className="relative h-10 w-10 shrink-0">
              <Image
                src={Logo}
                alt="Protronics"
                fill
                sizes="40px"
                className="object-contain"
                quality={IMAGE_QUALITY.logo}
                priority
              />
            </div>
            <div className="leading-none">
              <div className="text-[15px] font-semibold tracking-tight text-white">
                PROTRONICS
              </div>
              <div className="mt-1 hidden text-[11px] text-white/55 xl:block">
                Premium. Refurbished. Perfected.
              </div>
            </div>
          </Link>

          {/* Nav links — centered on large screens */}
          <nav
            className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
            aria-label="Main navigation"
          >
            <CategoriesDropdown />
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href} prefetch className={navLinkClass}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="ml-auto flex items-center gap-2.5 sm:gap-3 lg:ml-0">
            <CtaButton href="/trade-in" size="sm" className="shrink-0">
              <RefreshCw className="h-4 w-4 text-black/80" />
              <span className="hidden sm:inline">Trade-In & Upgrade</span>
              <span className="sm:hidden">Trade-In</span>
            </CtaButton>

            <CtaButton href="/shop" size="sm" className="shrink-0">
              <ShoppingBag className="h-4 w-4 text-black/80" />
              <span className="hidden sm:inline">Shop Now</span>
              <span className="sm:hidden">Shop</span>
            </CtaButton>
          </div>
        </div>
      </div>
    </header>
  );
}
