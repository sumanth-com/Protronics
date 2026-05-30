"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Search, X } from "lucide-react";
import {
  POPULAR_SEARCHES,
  getDefaultSuggestions,
  searchSite,
  type SearchResult,
} from "@/lib/search";
import { cn } from "@/lib/utils";
import { useLenis } from "@/hooks/useLenis";

const RECENT_KEY = "protronics-recent-searches";

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function saveRecent(query: string) {
  const recent = loadRecent().filter((q) => q !== query);
  recent.unshift(query);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 5)));
}

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const lenis = useLenis();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const results = query.trim() ? searchSite(query) : [];
  const suggestions = getDefaultSuggestions();

  useEffect(() => {
    if (!open) return;
    queueMicrotask(() => {
      setQuery("");
      setRecent(loadRecent());
    });
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSelect = useCallback(
    (item: SearchResult | string) => {
      if (typeof item === "string") {
        saveRecent(item);
        setQuery(item);
        return;
      }
      saveRecent(item.title);
      onClose();
    },
    [onClose],
  );

  const renderResult = (item: SearchResult) => (
    <Link
      key={`${item.type}-${item.id}`}
      href={item.href}
      prefetch
      onClick={() => handleSelect(item)}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5",
        "transition-colors hover:bg-white/[0.06]",
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-white/35" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-white/90">
          {item.title}
        </span>
        {item.subtitle ? (
          <span className="block truncate text-[11px] text-white/45">
            {item.subtitle}
          </span>
        ) : null}
      </span>
      <span className="shrink-0 rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/40">
        {item.type}
      </span>
    </Link>
  );

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-label="Search"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed left-1/2 top-[12vh] z-[101] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2",
              "overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]",
              "shadow-[0_24px_80px_rgba(0,0,0,0.85)]",
            )}
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-white/40" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, pages…"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/35"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[min(420px,60vh)] overflow-y-auto p-3">
              {query.trim() ? (
                results.length > 0 ? (
                  <div className="space-y-0.5">{results.map(renderResult)}</div>
                ) : (
                  <p className="px-3 py-6 text-center text-[13px] text-white/45">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )
              ) : (
                <>
                  {recent.length > 0 ? (
                    <div className="mb-4">
                      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                        Recent
                      </p>
                      <div className="space-y-0.5">
                        {recent.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setQuery(term)}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/[0.06]"
                          >
                            <Clock className="h-4 w-4 text-white/35" />
                            <span className="text-[13px] text-white/80">
                              {term}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                      Popular
                    </p>
                    <div className="flex flex-wrap gap-2 px-3">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setQuery(term)}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-white/65 transition-colors hover:border-white/20 hover:text-white"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                      Suggestions
                    </p>
                    <div className="space-y-0.5">
                      {suggestions.map(renderResult)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
