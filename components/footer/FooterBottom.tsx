"use client";

import { cn } from "@/lib/utils";

export type FooterBottomProps = {
  className?: string;
};

export default function FooterBottom({ className }: FooterBottomProps) {
  return (
    <div
      className={cn(
        "mt-10 flex flex-col gap-4 border-t border-white/10 pt-6",
        "sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="text-[12px] text-white/55">
        © {new Date().getFullYear()} Protronics. All rights reserved.
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/55">
        <a href="#privacy" className="transition-colors hover:text-white/80">
          Privacy Policy
        </a>
        <a href="#terms" className="transition-colors hover:text-white/80">
          Terms
        </a>
        <span className="text-white/35">Designed by Protronics</span>
      </div>
    </div>
  );
}

