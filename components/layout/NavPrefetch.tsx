"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PREFETCH_ROUTES } from "@/lib/navigation";

/** Prefetch key routes after idle so first paint is not blocked. */
export default function NavPrefetch() {
  const router = useRouter();

  useEffect(() => {
    const prefetch = () => {
      PREFETCH_ROUTES.forEach((route) => router.prefetch(route));
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(prefetch, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(prefetch, 1200);
    return () => window.clearTimeout(id);
  }, [router]);

  return null;
}
