"use client";

import { useCallback, useEffect, useState } from "react";

const COMPARE_KEY = "protronics-compare";
const LAST_COMPARE_KEY = "protronics-compare-last";
const MAX_COMPARE = 3;

export const STORE_EVENT = "protronics-store-update";
export const COMPARE_TOAST_EVENT = "protronics-compare-toast";

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

function saveLastCompare(ids: string[]) {
  if (ids.length >= 1) {
    localStorage.setItem(LAST_COMPARE_KEY, JSON.stringify(ids));
  }
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
      saveLastCompare(next);
      return true;
    }
    if (current.length >= MAX_COMPARE) {
      window.dispatchEvent(new Event(COMPARE_TOAST_EVENT));
      return false;
    }
    const next = [...current, id];
    writeIds(COMPARE_KEY, next);
    setIds(next);
    saveLastCompare(next);
    return true;
  }, []);

  const remove = useCallback((id: string) => {
    const next = readIds(COMPARE_KEY).filter((x) => x !== id);
    writeIds(COMPARE_KEY, next);
    setIds(next);
    saveLastCompare(next);
  }, []);

  const isCompared = useCallback((id: string) => ids.includes(id), [ids]);

  const clear = useCallback(() => {
    writeIds(COMPARE_KEY, []);
    setIds([]);
  }, []);

  const restoreLastCompare = useCallback(() => {
    const last = readIds(LAST_COMPARE_KEY).slice(0, MAX_COMPARE);
    if (last.length === 0) return false;
    writeIds(COMPARE_KEY, last);
    setIds(last);
    return true;
  }, []);

  const hasLastCompare = useCallback(() => {
    const current = readIds(COMPARE_KEY);
    const last = readIds(LAST_COMPARE_KEY);
    return last.length > 0 && JSON.stringify(current) !== JSON.stringify(last);
  }, []);

  return {
    ids,
    count: ids.length,
    toggle,
    remove,
    isCompared,
    clear,
    max: MAX_COMPARE,
    restoreLastCompare,
    hasLastCompare,
  };
}
