"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, Tags } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import NavCtaIcon from "@/components/ui/NavCtaIcon";
import SearchTrigger from "@/components/search/SearchTrigger";
import MobileNav from "@/components/layout/MobileNav";
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
            "navbar-inner relative mx-auto flex w-full max-w-[1520px] items-center",
            /* Mobile & tablet — clean icon bar, tighter left inset */
            "h-16 gap-2 pl-2 pr-4",
            "min-[375px]:gap-2.5 min-[480px]:h-[4.5rem] min-[480px]:gap-3 min-[480px]:pl-2.5",
            /* Desktop — unchanged */
            "lg:h-auto lg:gap-7 lg:py-3.5 lg:pl-5 lg:pr-7",
            "xl:gap-8 xl:pl-6 xl:pr-8",
          )}
        >
          {/* Brand */}
          <Link
            href="/"
            prefetch
            className="navbar-brand group relative flex min-w-0 flex-1 items-center gap-2 min-[375px]:gap-2.5 sm:gap-3.5 lg:flex-none"
            aria-label="Go to home"
          >
            <div
              className={cn(
                "navbar-logo-pill relative flex shrink-0 items-center justify-center overflow-hidden",
                "h-9 w-9 rounded-full border border-theme-border bg-theme-elevated shadow-theme-sm",
                "min-[375px]:h-10 min-[375px]:w-10",
                "lg:h-[52px] lg:w-[52px] lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none",
              )}
            >
              <div className="relative h-[58%] w-[58%] lg:h-full lg:w-full">
                <Image
                  src={Logo}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 36px, 56px"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  quality={IMAGE_QUALITY.logo}
                  priority
                  aria-hidden
                />
              </div>
            </div>
            <div className="min-w-0 leading-none">
              <div className="navbar-brand-title truncate">PROTRONICS</div>
              <div className="navbar-brand-tagline hidden lg:mt-1 lg:block">
                Premium. Refurbished. Perfected.
              </div>
            </div>
          </Link>

          {/* Desktop — search + nav links (unchanged) */}
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

          {/* Mobile & tablet — theme + menu (search lives in drawer) */}
          <div className="mobile-nav-actions ml-auto flex shrink-0 items-center gap-2 min-[375px]:gap-2.5 lg:hidden">
            <ThemeToggle className="theme-rocker--nav-compact" />
            <MobileNav />
          </div>

          {/* Desktop — theme + CTAs (unchanged) */}
          <div className="navbar-actions hidden items-center lg:ml-0 lg:flex">
            <ThemeToggle />
            <CtaButton
              href="/best-deals"
              size="sm"
              className="nav-cta-btn nav-cta-btn-deals shrink-0"
            >
              <NavCtaIcon variant="deals">
                <Tags className="nav-cta-icon-glyph" strokeWidth={2.25} />
              </NavCtaIcon>
              <span className="nav-cta-label">Best Deals</span>
            </CtaButton>

            <CtaButton href="/shop" size="sm" className="nav-cta-btn nav-cta-btn-shop shrink-0">
              <NavCtaIcon variant="shop">
                <ShoppingBag className="nav-cta-icon-glyph" strokeWidth={2.25} />
              </NavCtaIcon>
              <span className="nav-cta-label">Shop Now</span>
            </CtaButton>
          </div>
        </div>
      </div>
    </header>
  );
}
