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
};

export default function SearchTrigger({ className }: SearchTriggerProps) {
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
          "inline-flex items-center gap-2 rounded-lg px-3 py-2",
          "text-[13px] font-medium text-white/75",
          "transition-colors hover:bg-white/[0.06] hover:text-white",
          className,
        )}
        aria-label="Open search"
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/35 xl:inline">
          ⌘K
        </kbd>
      </button>
      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
