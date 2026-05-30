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
  /** Compact icon-only trigger (mobile) */
  compact?: boolean;
};

export default function SearchTrigger({ className, compact }: SearchTriggerProps) {
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
          compact
            ? "inline-flex items-center justify-center rounded-xl border border-theme-border bg-theme-input-bg p-2.5 text-theme-muted transition-colors hover:border-theme-accent/30 hover:bg-theme-input-bg hover:text-theme-fg"
            : "nav-search-trigger",
          className,
        )}
        aria-label="Open search (⌘K)"
      >
        <Search className={compact ? "h-5 w-5" : undefined} strokeWidth={2} />
        {!compact ? (
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
