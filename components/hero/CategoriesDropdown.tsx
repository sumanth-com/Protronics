"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Refrigerator } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

type FridgeType = {
  label: string;
  description: string;
  href: string;
};

const fridgeTypes: FridgeType[] = [
  { label: "Single Door", description: "Compact & efficient", href: "/shop/single-door" },
  { label: "Double Door", description: "Frost-free family size", href: "/shop/double-door" },
  { label: "Washing Machines", description: "Front & top load renewals", href: "/shop/washing-machines" },
];

const triggerClass =
  "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white";

export default function CategoriesDropdown() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(triggerClass, open && "bg-white/[0.06] text-white")}
      >
        Category
        <ChevronDown
          className={cn(
            "h-4 w-4 text-white/45 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          className={cn(
            "absolute left-1/2 top-[calc(100%+10px)] z-50 w-[min(340px,calc(100vw-2rem))] -translate-x-1/2",
            "rounded-2xl border border-white/10 bg-black",
            "shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset]",
            "p-4 sm:left-0 sm:translate-x-0",
          )}
          role="menu"
        >
<div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Shop refrigerators
            </p>
            <p className="mt-1 text-[12px] text-white/50">
              Premium refurbished fridges only
            </p>

            <div className="mt-3 flex flex-col gap-0.5">
              {fridgeTypes.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5",
                    "transition-colors hover:bg-white/[0.06]",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                      "border border-white/10 bg-white/[0.04]",
                      "transition-colors group-hover:border-white/25 group-hover:bg-white/10",
                    )}
                  >
                    <Refrigerator className="h-4 w-4 text-white/55 group-hover:text-white" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-white/90">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-white/45">
                      {item.description}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <CtaButton
              href="/shop"
              size="sm"
              className="mt-3"
              onClick={() => setOpen(false)}
            >
              View all refrigerators
              <ArrowRight className="h-4 w-4 text-black/80" />
            </CtaButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
