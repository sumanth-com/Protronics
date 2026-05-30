"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { LenisContext } from "@/hooks/useLenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      queueMicrotask(() => setLenis(null));
      return;
    }

    let instance: Lenis | null = null;
    let cancelled = false;
    let refreshListener: (() => void) | null = null;

    const init = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const mobileScroll =
        window.matchMedia("(max-width: 1023px)").matches ||
        window.matchMedia("(pointer: coarse)").matches;

      instance = new Lenis({
        lerp: mobileScroll ? 1 : 0.12,
        wheelMultiplier: 0.9,
        touchMultiplier: mobileScroll ? 1.2 : 1,
        smoothWheel: !mobileScroll,
        syncTouch: false,
        autoRaf: true,
      });

      document.documentElement.classList.add("lenis");
      setLenis(instance);

      instance.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (typeof value === "number") {
            instance?.scrollTo(value, { immediate: true });
          }
          return instance?.scroll ?? 0;
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

      refreshListener = () => instance?.resize();
      ScrollTrigger.addEventListener("refresh", refreshListener);
      ScrollTrigger.refresh();
    };

    void init();

    return () => {
      cancelled = true;
      queueMicrotask(() => setLenis(null));
      document.documentElement.classList.remove("lenis");

      void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        if (refreshListener) {
          ScrollTrigger.removeEventListener("refresh", refreshListener);
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        ScrollTrigger.clearScrollMemory?.();
      });

      instance?.destroy();
      instance = null;
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
