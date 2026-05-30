"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterDropdownOption = {
  value: string;
  label: string;
};

type ShopFilterDropdownProps = {
  label: string;
  options: FilterDropdownOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  single?: boolean;
  className?: string;
};

export default function ShopFilterDropdown({
  label,
  options,
  selected,
  onChange,
  single = false,
  className,
}: ShopFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const toggle = (value: string) => {
    if (single) {
      onChange(selected.includes(value) ? [] : [value]);
      setOpen(false);
      return;
    }
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  const active = selected.length > 0;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "shop-filter-trigger inline-flex items-center gap-1.5 rounded-full px-3.5 py-2",
          "border text-[13px] font-medium transition-colors",
          active
            ? "shop-filter-trigger-active border-white/35 bg-white/[0.06] text-white"
            : "border-white/[0.08] bg-black text-white/75 hover:border-white/15 hover:text-white",
        )}
      >
        {label}
        {active ? (
          <span className="shop-filter-badge grid h-4 min-w-4 place-items-center rounded-full bg-white/15 px-1 text-[10px] font-semibold text-white">
            {selected.length}
          </span>
        ) : null}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          className={cn(
            "shop-filter-menu absolute right-0 top-[calc(100%+8px)] z-50 min-w-[200px]",
            "rounded-xl border border-white/[0.08] bg-black/95 p-2",
            "shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl",
          )}
        >
          {options.map((opt) => {
            const checked = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                className={cn(
                  "shop-filter-menu-item flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition-colors",
                  checked
                    ? "bg-white/[0.06] text-white"
                    : "text-white/75 hover:bg-white/[0.04] hover:text-white",
                )}
              >
                <span
                  className={cn(
                    "grid h-4 w-4 shrink-0 place-items-center rounded border",
                    checked ? "border-white/50 bg-white/15" : "border-white/20",
                  )}
                >
                  {checked ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
