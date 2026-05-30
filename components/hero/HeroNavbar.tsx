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
          "navbar-shell relative w-full",
          "bg-theme-nav supports-[backdrop-filter]:backdrop-blur-xl",
        )}
      >
        <div className="navbar-glass-gradient pointer-events-none absolute inset-x-0 top-0 h-12" />

        <div
          className={cn(
            "relative mx-auto flex w-full max-w-[1520px] items-center",
            "gap-4 py-3 pl-3 pr-4",
            "sm:gap-5 sm:py-3.5 sm:pl-4 sm:pr-5",
            "lg:gap-7 lg:pl-5 lg:pr-7",
            "xl:gap-8 xl:pl-6 xl:pr-8",
          )}
        >
          {/* Brand — larger, anchored left */}
          <Link
            href="/"
            prefetch
            className="navbar-brand group relative flex shrink-0 items-center gap-3 sm:gap-3.5"
            aria-label="Go to home"
          >
            <div className="relative h-11 w-11 shrink-0 sm:h-12 sm:w-12 lg:h-[52px] lg:w-[52px]">
              <Image
                src={Logo}
                alt="Protronics"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                quality={IMAGE_QUALITY.logo}
                priority
              />
            </div>
            <div className="min-w-0 leading-none">
              <div className="navbar-brand-title">PROTRONICS</div>
              <div className="navbar-brand-tagline hidden sm:block lg:mt-1">
                Premium. Refurbished. Perfected.
              </div>
            </div>
          </Link>

          {/* Search + nav — centered, roomy */}
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
            aria-label="Main navigation"
          >
            <div className="navbar-center-cluster">
              <SearchTrigger />
              <div className="navbar-nav-group" role="list">
                {navLinks.map((l) => {
                  const active = isNavActive(pathname, l.href);
                  return (
                    <Link
                      key={l.label}
                      href={l.href}
                      prefetch
                      role="listitem"
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "navbar-nav-link",
                        active && "navbar-nav-link--active",
                      )}
                    >
                      {l.label}
                      {active ? (
                        <motion.span
                          layoutId="navbar-active-line"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-theme-accent"
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
              </div>
            </div>
          </nav>

          {/* CTAs + utilities */}
          <div className="navbar-actions ml-auto flex items-center lg:ml-0">
            <ThemeToggle className="hidden sm:inline-flex" />
            <SearchTrigger compact className="lg:hidden" />
            <CtaButton
              href="/trade-in"
              size="sm"
              className="nav-cta-btn nav-cta-btn-deals shrink-0"
            >
              <NavCtaIcon variant="deals">
                <Tags className="nav-cta-icon-glyph" strokeWidth={2.25} />
              </NavCtaIcon>
              <span className="nav-cta-label hidden sm:inline">Hot Deals</span>
              <span className="nav-cta-label sm:hidden">Deals</span>
            </CtaButton>

            <CtaButton href="/shop" size="sm" className="nav-cta-btn nav-cta-btn-shop shrink-0">
              <NavCtaIcon variant="shop">
                <ShoppingBag className="nav-cta-icon-glyph" strokeWidth={2.25} />
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
