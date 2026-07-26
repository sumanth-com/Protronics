"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BadgeCheck, HandCoins, ShoppingBag } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import NavCtaIcon from "@/components/ui/NavCtaIcon";
import SearchTrigger from "@/components/search/SearchTrigger";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo.webp";

const navLinks = [
  { label: "Support", href: "/support" },
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
  const isShop = pathname.startsWith("/shop");
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        isShop && "shop-route-header",
        isHome && "navbar-marketplace-home",
      )}
    >
      <div
        className={cn(
          "navbar-shell relative w-full",
          isShop ? "bg-theme-bg" : "bg-theme-nav supports-[backdrop-filter]:backdrop-blur-xl",
        )}
      >
        {!isShop ? (
          <div className="navbar-glass-gradient pointer-events-none absolute inset-x-0 top-0 h-12" />
        ) : null}

        {/* Row 1 — logo, theme, about (mobile) / full desktop bar */}
        <div
          className={cn(
            "navbar-inner relative mx-auto flex w-full max-w-[1520px] items-center",
            "h-14 gap-2 pl-2 pr-3",
            "min-[375px]:gap-2.5 min-[480px]:h-[4.25rem] min-[480px]:gap-3 min-[480px]:pl-2.5",
            "lg:h-auto lg:gap-7 lg:py-3.5 lg:pl-5 lg:pr-7",
            "xl:gap-8 xl:pl-6 xl:pr-8",
          )}
        >
          <Link
            href="/"
            prefetch
            className="navbar-brand group relative flex min-w-0 flex-1 items-center gap-2.5 min-[375px]:gap-3 lg:flex-none lg:gap-3"
            aria-label="Protronics — home"
          >
            <div
              className={cn(
                "navbar-logo-pill",
                "h-10 w-10 min-[375px]:h-11 min-[375px]:w-11",
                "lg:h-[3.75rem] lg:w-[3.75rem]",
              )}
            >
              <div
                className={cn(
                  "navbar-logo-mark relative h-full w-full",
                  "min-h-8 min-w-8 min-[375px]:min-h-9 min-[375px]:min-w-9",
                  "lg:min-h-[3.25rem] lg:min-w-[3.25rem]",
                )}
              >
                <Image
                  src={Logo}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 40px, 56px"
                  className="object-contain object-center"
                  quality={IMAGE_QUALITY.logo}
                  priority
                  aria-hidden
                />
              </div>
            </div>
            <div className="navbar-brand-copy min-w-0 leading-none">
              <div className="navbar-brand-title truncate">Protronics</div>
              <div className="navbar-brand-tagline hidden lg:mt-1 lg:block">
                Premium. Refurbished. Perfected.
              </div>
            </div>
          </Link>

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

          <div className="mobile-nav-actions ml-auto flex shrink-0 items-center min-[375px]:gap-2 lg:hidden">
            <ThemeToggle />
            <Link
              href="/about"
              prefetch
              className={cn(
                "nav-icon-btn mobile-nav-about",
                isNavActive(pathname, "/about") && "mobile-nav-about--active",
              )}
              aria-label="About Protronics"
              aria-current={isNavActive(pathname, "/about") ? "page" : undefined}
            >
              <BadgeCheck className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
            </Link>
          </div>

          <div className="navbar-actions hidden items-center lg:ml-0 lg:flex">
            <ThemeToggle />
            <CtaButton href="/sell" size="sm" className="nav-cta-btn nav-cta-btn-deals shrink-0">
              <NavCtaIcon variant="deals">
                <HandCoins className="nav-cta-icon-glyph" strokeWidth={2.25} />
              </NavCtaIcon>
              <span className="nav-cta-label">Sell</span>
            </CtaButton>

            <CtaButton href="/shop" size="sm" className="nav-cta-btn nav-cta-btn-shop shrink-0">
              <NavCtaIcon variant="shop">
                <ShoppingBag className="nav-cta-icon-glyph" strokeWidth={2.25} />
              </NavCtaIcon>
              <span className="nav-cta-label">Shop</span>
            </CtaButton>
          </div>
        </div>

        {/* Row 2 — search only (categories scroll in page content on home) */}
        {!isShop ? (
          <div className="mobile-marketplace-head lg:hidden">
            <div className="mobile-navbar-search-row">
              <SearchTrigger bar className="w-full" />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
