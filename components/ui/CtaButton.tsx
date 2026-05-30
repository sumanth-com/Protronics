"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { scrollToTarget, useLenis } from "@/hooks/useLenis";
import { NAVBAR_OFFSET } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export const ctaButtonClass = cn(
  "cta-button inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide",
  "bg-theme-accent text-theme-accent-fg ring-1 ring-theme-accent/25",
  "shadow-theme-sm transition-[background-color,box-shadow,transform,opacity] duration-150",
  "hover:bg-theme-accent-hover hover:shadow-theme active:scale-[0.98] active:opacity-95",
);

export const ctaButtonSecondaryClass = cn(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide",
  "btn-secondary-outline border bg-transparent text-theme-accent",
  "transition-[background-color,border-color,color,transform] duration-150",
  "hover:border-theme-gold hover:text-theme-bronze active:scale-[0.98]",
);

type CtaButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  external?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick">;

const sizeClass = {
  sm: "px-3.5 py-2 text-[13px]",
  md: "px-5 py-3 text-[13px]",
  lg: "px-6 py-3.5 text-[13px]",
} as const;

function getHashTarget(href: string): string | null {
  if (href.startsWith("#")) return href.slice(1);
  const hashIndex = href.indexOf("#");
  if (hashIndex >= 0) return href.slice(hashIndex + 1);
  return null;
}

export default function CtaButton({
  href,
  children,
  className,
  fullWidth = false,
  size = "md",
  external = false,
  onClick,
  "aria-label": ariaLabel,
  type = "button",
  ...buttonProps
}: CtaButtonProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const classes = cn(
    ctaButtonClass,
    sizeClass[size],
    fullWidth && "w-full",
    className,
  );

  const handleHashScroll = (e: MouseEvent<HTMLAnchorElement>, linkHref: string) => {
    onClick?.();
    const targetId = getHashTarget(linkHref);
    if (!targetId) return;

    const pathOnly = linkHref.split("#")[0];
    const samePage =
      linkHref.startsWith("#") ||
      pathOnly === "" ||
      pathOnly === pathname ||
      (pathOnly === "/" && pathname === "/");

    if (!samePage) return;

    const el = document.getElementById(targetId);
    if (!el) return;

    e.preventDefault();
    scrollToTarget(lenis, el, { offset: -NAVBAR_OFFSET });
  };

  if (href) {
    const isExternal = external || href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          aria-label={ariaLabel}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        prefetch={!href.includes("#")}
        className={classes}
        onClick={(e) => handleHashScroll(e, href)}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel} {...buttonProps}>
      {children}
    </button>
  );
}
