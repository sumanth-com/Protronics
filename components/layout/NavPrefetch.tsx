"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NAV_ROUTES = [
  "/",
  "/shop",
  "/support",
  "/warranty",
  "/about",
  "/faq",
  "/contact",
  "/trade-in",
] as const;

/** Prefetch all main nav routes so clicks feel instant. */
export default function NavPrefetch() {
  const router = useRouter();

  useEffect(() => {
    NAV_ROUTES.forEach((route) => router.prefetch(route));
  }, [router]);

  return null;
}
