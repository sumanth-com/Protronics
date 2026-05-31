"use client";

import { useEffect, useMemo, useState } from "react";
import { SHOP_PRODUCTS, type ShopProduct } from "@/lib/shop";

const RECENT_KEY = "protronics-recently-viewed";
const MAX_RECENT = 8;
export const RECENT_EVENT = "protronics-recent-update";

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeRecent(ids: string[]) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(RECENT_EVENT));
}

export function useTrackRecentlyViewed(productId: string) {
  useEffect(() => {
    const current = readRecent().filter((id) => id !== productId);
    writeRecent([productId, ...current].slice(0, MAX_RECENT));
  }, [productId]);
}

export function useRecentlyViewedProducts(excludeId: string, limit = 6): ShopProduct[] {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      const next = readRecent();
      setIds((prev) => {
        if (prev.length === next.length && prev.every((id, i) => id === next[i])) {
          return prev;
        }
        return next;
      });
    };

    sync();
    window.addEventListener(RECENT_EVENT, sync);
    return () => window.removeEventListener(RECENT_EVENT, sync);
  }, []);

  return useMemo(
    () =>
      ids
        .filter((id) => id !== excludeId)
        .slice(0, limit)
        .map((id) => SHOP_PRODUCTS.find((p) => p.id === id))
        .filter((p): p is ShopProduct => Boolean(p)),
    [ids, excludeId, limit],
  );
}
