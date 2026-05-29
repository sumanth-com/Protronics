"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import BlurContainer from "@/components/ui/BlurContainer";
import CtaButton from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Shop", href: "#shop" },
  { label: "How It Works", href: "#how" },
  { label: "Warranty", href: "#warranty" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 10;
    setCompact((prev) => (prev === next ? prev : next));
    if (v > 30 && open) setOpen(false);
  });

  const containerClass = useMemo(
    () =>
      cn(
        "sticky top-0 z-50 w-full px-3 sm:px-5",
        "pt-3 sm:pt-4",
      ),
    [],
  );

  return (
    <div className={containerClass}>
      <BlurContainer
        className={cn(
          "mx-auto max-w-7xl rounded-2xl",
          "transition-[border-radius] duration-300",
          compact ? "rounded-xl" : "rounded-2xl",
        )}
      >
        <motion.div
          className={cn(
            "flex items-center justify-between",
            "px-4 sm:px-6",
          )}
          animate={{
            height: compact ? 56 : 68,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight text-black"
          >
            Protronics
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] font-medium text-black md:flex">
            {nav.map((it) => (
              <a
                key={it.label}
                href={it.href}
                className="transition-opacity hover:opacity-80"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <CtaButton href="https://wa.me/" external size="sm">
              <WhatsAppIcon className="h-4 w-4 text-black/80" />
              WhatsApp Inquiry
            </CtaButton>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/80 transition-colors hover:bg-black/[0.03] md:hidden"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden md:hidden"
        >
          <div className="px-4 pb-4 pt-0">
            <div className="mt-1 rounded-2xl border border-black/5 bg-white/60 px-3 py-3">
              <div className="flex flex-col gap-1">
                {nav.map((it) => (
                  <a
                    key={it.label}
                    href={it.href}
                    className="rounded-xl px-3 py-2 text-[14px] font-medium text-black transition-colors hover:bg-black/[0.03]"
                    onClick={() => setOpen(false)}
                  >
                    {it.label}
                  </a>
                ))}
              </div>
              <CtaButton
                href="https://wa.me/"
                external
                fullWidth
                className="mt-3"
                onClick={() => setOpen(false)}
              >
                <WhatsAppIcon className="h-4 w-4 text-black/80" />
                WhatsApp Inquiry
              </CtaButton>
            </div>
          </div>
        </motion.div>
      </BlurContainer>
    </div>
  );
}

