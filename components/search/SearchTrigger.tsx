"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchDialog = dynamic(
  () => import("@/components/search/SearchDialog"),
  { ssr: false },
);

type SearchTriggerProps = {
  className?: string;
  /** Compact icon-only trigger (mobile/tablet navbar) */
  compact?: boolean;
  /** Circular 44px icon button — pairs with theme toggle */
  iconButton?: boolean;
};

export default function SearchTrigger({ className, compact, iconButton }: SearchTriggerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          iconButton || compact
            ? "nav-icon-btn"
            : "nav-search-trigger",
          className,
        )}
        aria-label="Open search (⌘K)"
      >
        <Search className={iconButton || compact ? "h-[18px] w-[18px]" : undefined} strokeWidth={2.25} />
        {!compact && !iconButton ? (
          <>
            <span className="nav-search-label hidden lg:inline">Search</span>
            <kbd className="nav-search-kbd">⌘K</kbd>
          </>
        ) : null}
      </button>
      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
