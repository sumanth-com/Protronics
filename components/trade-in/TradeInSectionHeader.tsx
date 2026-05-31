"use client";

import { cn } from "@/lib/utils";

type TradeInSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function TradeInSectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: TradeInSectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[12px] font-medium tracking-[0.22em] text-theme-fg-faint">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-[26px] font-semibold tracking-tight text-theme-fg sm:text-[34px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-[14px] leading-7 text-theme-fg-muted sm:text-[15px]">
          {description}
        </p>
      ) : null}
      <div
        className={cn(
          "theme-accent-line mt-4 w-14",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  );
}

export function TradeInReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}
