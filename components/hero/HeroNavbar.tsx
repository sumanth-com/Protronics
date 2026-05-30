"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { HandCoins, ShoppingBag } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import SearchTrigger from "@/components/search/SearchTrigger";
import { IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo.png";

const navLinks = [
  { label: "Support", href: "/support" },
  { label: "Warranty", href: "/warranty" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

function isNavActive(pathname: string, href: string) {
  if (href === "/support") {
    return pathname === "/support" || pathname.startsWith("/support/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function HeroNavbar() {
  const pathname = usePathname();

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
            <SearchTrigger />
            {navLinks.map((l) => {
              const active = isNavActive(pathname, l.href);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  prefetch
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200",
                    active
                      ? "text-white"
                      : "text-white/75 hover:bg-white/[0.06] hover:text-white",
                  )}
                >
                  {l.label}
                  {active ? (
                    <motion.span
                      layoutId="navbar-active-line"
                      className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-white"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="ml-auto flex items-center gap-2.5 sm:gap-3 lg:ml-0">
            <SearchTrigger className="lg:hidden" />
            <CtaButton href="/trade-in" size="sm" className="shrink-0">
              <HandCoins className="h-4 w-4 text-black/80" />
              <span className="hidden sm:inline">Trade-In</span>
              <span className="sm:hidden">Sell</span>
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
