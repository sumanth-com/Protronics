"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, Tags } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import NavCtaIcon from "@/components/ui/NavCtaIcon";
import SearchTrigger from "@/components/search/SearchTrigger";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo.png";

const navLinks = [
  { label: "Support", href: "/support" },
  { label: "Warranty", href: "/warranty" },
  { label: "About", href: "/about" },
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
          "border-b border-theme-border/80",
          "bg-theme-nav supports-[backdrop-filter]:backdrop-blur-xl",
        )}
      >
        <div className="navbar-glass-gradient pointer-events-none absolute inset-x-0 top-0 h-10" />

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
              <div className="text-[15px] font-semibold tracking-tight text-theme-fg">
                PROTRONICS
              </div>
              <div className="mt-1 hidden text-[11px] text-theme-muted xl:block">
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
                    "relative rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300",
                    active
                      ? "text-theme-fg"
                      : "text-theme-secondary hover:bg-theme-input-bg hover:text-theme-fg",
                  )}
                >
                  {l.label}
                  {active ? (
                    <motion.span
                      layoutId="navbar-active-line"
                      className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-theme-accent"
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
          <div className="navbar-actions ml-auto flex items-center gap-1.5 sm:gap-2 lg:ml-0">
            <ThemeToggle className="hidden sm:inline-flex" />
            <SearchTrigger className="lg:hidden" />
            <CtaButton
              href="/trade-in"
              size="sm"
              className="nav-cta-btn nav-cta-btn-deals shrink-0"
            >
              <NavCtaIcon variant="deals">
                <Tags className="nav-cta-icon-glyph" strokeWidth={2} />
              </NavCtaIcon>
              <span className="nav-cta-label hidden sm:inline">Hot Deals</span>
              <span className="nav-cta-label sm:hidden">Deals</span>
            </CtaButton>

            <CtaButton href="/shop" size="sm" className="nav-cta-btn nav-cta-btn-shop shrink-0">
              <NavCtaIcon variant="shop">
                <ShoppingBag className="nav-cta-icon-glyph" strokeWidth={2} />
              </NavCtaIcon>
              <span className="nav-cta-label hidden sm:inline">Shop Now</span>
              <span className="nav-cta-label sm:hidden">Shop</span>
            </CtaButton>
            <ThemeToggle className="sm:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}
