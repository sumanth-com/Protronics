"use client";

import { useSyncExternalStore } from "react";

/** True after hydration — avoids layout flash without setState in effects. */
export function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
