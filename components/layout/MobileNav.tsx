"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { Menu, Search, ShoppingBag, Tags, X } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { useIsClient } from "@/hooks/useIsClient";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

const SearchDialog = dynamic(
  () => import("@/components/search/SearchDialog"),
  { ssr: false },
);

const DRAWER_SPRING = { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.9 };
const OVERLAY_TRANSITION = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };
const LINK_STAGGER = 0.04;

const drawerLinks = [
  { label: "Support", href: "/support" },
  { label: "Warranty", href: "/warranty" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: LINK_STAGGER, delayChildren: 0.06 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 420, damping: 32 },
  },
};

function isDrawerLinkActive(pathname: string, href: string) {
  if (href === "/support") {
    return pathname === "/support" || pathname.startsWith("/support/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function lockBodyScroll() {
  const scrollY = window.scrollY;
  document.documentElement.classList.add("mobile-nav-scroll-lock");
  document.body.classList.add("mobile-nav-scroll-lock");
  document.body.style.top = `-${scrollY}px`;
  return scrollY;
}

function unlockBodyScroll(scrollY: number) {
  document.documentElement.classList.remove("mobile-nav-scroll-lock");
  document.body.classList.remove("mobile-nav-scroll-lock");
  document.body.style.top = "";
  window.scrollTo(0, scrollY);
}

export default function MobileNav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const mounted = useIsClient();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onPopState = () => close();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [close]);

  useEffect(() => {
    if (!open) return;

    const scrollY = lockBodyScroll();
    lenis?.stop();

    return () => {
      lenis?.start();
      unlockBodyScroll(scrollY);
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const drawer = (
    <AnimatePresence mode="wait">
      {open ? (
        <>
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={OVERLAY_TRANSITION}
            className="mobile-nav-backdrop fixed inset-0 z-[110] bg-black/70 backdrop-blur-[12px] lg:hidden"
            onClick={close}
            aria-hidden
          />
          <motion.aside
            key="mobile-nav-panel"
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={DRAWER_SPRING}
            className={cn(
              "mobile-nav-drawer fixed inset-y-0 right-0 z-[111] flex h-[100dvh] w-[min(380px,100vw)] flex-col",
              "border-l border-theme-border bg-theme-bg shadow-[-32px_0_96px_rgba(0,0,0,0.55)]",
              "supports-[backdrop-filter]:bg-theme-bg/98 supports-[backdrop-filter]:backdrop-blur-2xl",
              "lg:hidden",
            )}
            data-lenis-prevent
          >
            {/* Close + search */}
            <div className="mobile-nav-drawer-top shrink-0 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="nav-icon-btn mobile-nav-close"
                  aria-label="Close menu"
                  onClick={close}
                >
                  <X className="h-[18px] w-[18px] text-theme-fg" strokeWidth={2.25} />
                </button>
              </div>
              <button
                type="button"
                className="mobile-nav-search mt-4 w-full"
                onClick={() => {
                  close();
                  setSearchOpen(true);
                }}
              >
                <Search className="h-[18px] w-[18px] shrink-0 text-theme-muted" strokeWidth={2.25} />
                <span>Search products</span>
                <kbd className="mobile-nav-search-kbd">⌘K</kbd>
              </button>
            </div>

            {/* Navigation — links visible immediately */}
            <div className="mobile-nav-drawer-main min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4">
              <p className="mobile-nav-drawer-label">Navigation</p>

              <motion.nav
                aria-label="Mobile navigation"
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                <ul className="mobile-nav-drawer-list">
                  {drawerLinks.map((link) => {
                    const active = isDrawerLinkActive(pathname, link.href);
                    return (
                      <motion.li key={link.href} variants={linkVariants}>
                        <Link
                          href={link.href}
                          prefetch
                          className={cn(
                            "mobile-nav-link",
                            active && "mobile-nav-link--active",
                          )}
                          aria-current={active ? "page" : undefined}
                          onClick={close}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.nav>
            </div>

            {/* Actions — only after navigation */}
            <div className="mobile-nav-drawer-footer shrink-0 border-t border-theme-border px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <Link href="/best-deals" className="mobile-nav-whatsapp" onClick={close}>
                <Tags className="h-[18px] w-[18px] shrink-0 text-theme-accent" strokeWidth={2.25} />
                Best Deals
              </Link>
              <CtaButton href="/shop" fullWidth size="lg" className="mt-3" onClick={close}>
                <ShoppingBag className="h-4 w-4" strokeWidth={2.25} />
                Shop Now
              </CtaButton>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        className={cn(
          "nav-icon-btn mobile-nav-toggle lg:hidden",
          open && "mobile-nav-toggle--open",
        )}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <motion.span
          className="mobile-nav-toggle-icon inline-flex"
          animate={{ rotate: open ? 90 : 0 }}
          transition={
            open ? DRAWER_SPRING : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {open ? (
            <X className="h-[18px] w-[18px] text-theme-fg" strokeWidth={2.25} />
          ) : (
            <Menu className="h-[18px] w-[18px] text-theme-fg" strokeWidth={2.25} />
          )}
        </motion.span>
      </button>

      {mounted && typeof document !== "undefined"
        ? createPortal(drawer, document.body)
        : null}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
