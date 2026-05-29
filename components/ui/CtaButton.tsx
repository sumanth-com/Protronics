"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const ctaButtonClass = cn(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide",
  "bg-white text-black ring-1 ring-white/20",
  "transition-opacity hover:opacity-90 active:opacity-80",
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
  const classes = cn(
    ctaButtonClass,
    sizeClass[size],
    fullWidth && "w-full",
    className,
  );

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
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
