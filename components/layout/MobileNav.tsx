"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { Menu, ShoppingBag, X } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { useIsClient } from "@/hooks/useIsClient";
import { useLenis } from "@/hooks/useLenis";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

const SearchDialog = dynamic(
  () => import("@/components/search/SearchDialog"),
  { ssr: false },
);

const DRAWER_SPRING = { type: "spring" as const, stiffness: 400, damping: 34, mass: 0.85 };
const OVERLAY_TRANSITION = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

const drawerLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Warranty", href: "/warranty" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/#faq" },
] as const;

function isDrawerLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/#faq") return pathname === "/" || pathname.startsWith("/faq");
  if (href === "/shop") {
    return pathname === "/shop" || pathname.startsWith("/shop/");
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
            className="mobile-nav-backdrop fixed inset-0 z-[110] bg-black/65 backdrop-blur-sm lg:hidden"
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
              "mobile-nav-drawer fixed inset-y-0 right-0 z-[111] flex h-[100dvh] w-[min(340px,100vw)] flex-col",
              "border-l border-theme-border bg-theme-bg shadow-[-24px_0_64px_rgba(0,0,0,0.45)]",
              "lg:hidden",
            )}
            data-lenis-prevent
          >
            <div className="mobile-nav-drawer-top shrink-0 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-semibold tracking-tight text-theme-fg">Menu</p>
                <button
                  type="button"
                  className="nav-icon-btn mobile-nav-close"
                  aria-label="Close menu"
                  onClick={close}
                >
                  <X className="h-[18px] w-[18px] text-theme-fg" strokeWidth={2.25} />
                </button>
              </div>
            </div>

            <div className="mobile-nav-drawer-main min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
              <nav aria-label="Mobile navigation">
                <ul className="mobile-nav-drawer-list">
                  {drawerLinks.map((link) => {
                    const active = isDrawerLinkActive(pathname, link.href);
                    return (
                      <li key={link.label}>
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
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="mobile-nav-drawer-footer shrink-0 border-t border-theme-border px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Link
                href={BUSINESS.whatsappMessage}
                className="mobile-nav-whatsapp"
                onClick={close}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-[18px] w-[18px] shrink-0" />
                WhatsApp Inquiry
              </Link>
              <CtaButton href="/shop" fullWidth size="md" className="mt-3" onClick={close}>
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
        {open ? (
          <X className="h-[18px] w-[18px] text-theme-fg" strokeWidth={2.25} />
        ) : (
          <Menu className="h-[18px] w-[18px] text-theme-fg" strokeWidth={2.25} />
        )}
      </button>

      {mounted && typeof document !== "undefined"
        ? createPortal(drawer, document.body)
        : null}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
