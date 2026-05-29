"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let lenis: Lenis | null = null;
    let cancelled = false;

    const init = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
        smoothWheel: true,
        autoRaf: true,
      });

      document.documentElement.classList.add("lenis");

      lenis.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (typeof value === "number") {
            lenis?.scrollTo(value, { immediate: true });
          }
          return lenis?.scroll ?? 0;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      ScrollTrigger.addEventListener("refresh", () => lenis?.resize());
      ScrollTrigger.refresh();
    };

    void init();

    return () => {
      cancelled = true;
      document.documentElement.classList.remove("lenis");
      lenis?.destroy();
    };
  }, [reducedMotion]);

  return children;
}
