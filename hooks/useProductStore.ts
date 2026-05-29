"use client";

import { useCallback, useEffect, useState } from "react";

const COMPARE_KEY = "protronics-compare";
const MAX_COMPARE = 3;

export const STORE_EVENT = "protronics-store-update";

function readIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  localStorage.setItem(key, JSON.stringify(ids));
  window.dispatchEvent(new Event(STORE_EVENT));
}

export function useCompare() {
  const [ids, setIds] = useState<string[]>([]);

  const sync = useCallback(() => setIds(readIds(COMPARE_KEY)), []);

  useEffect(() => {
    sync();
    window.addEventListener(STORE_EVENT, sync);
    return () => window.removeEventListener(STORE_EVENT, sync);
  }, [sync]);

  const toggle = useCallback((id: string) => {
    const current = readIds(COMPARE_KEY);
    if (current.includes(id)) {
      const next = current.filter((x) => x !== id);
      writeIds(COMPARE_KEY, next);
      setIds(next);
      return false;
    }
    if (current.length >= MAX_COMPARE) return false;
    const next = [...current, id];
    writeIds(COMPARE_KEY, next);
    setIds(next);
    return true;
  }, []);

  const isCompared = useCallback((id: string) => ids.includes(id), [ids]);

  const clear = useCallback(() => {
    writeIds(COMPARE_KEY, []);
    setIds([]);
  }, []);

  return { ids, count: ids.length, toggle, isCompared, clear, max: MAX_COMPARE };
}
