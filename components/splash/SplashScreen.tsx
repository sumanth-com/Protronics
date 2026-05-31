"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  SPLASH_EXIT_AT_MS,
  SPLASH_HIDE_AT_MS,
  SPLASH_SESSION_KEY,
  SPLASH_TAGLINE,
} from "@/lib/splash";
import { IMAGE_QUALITY } from "@/lib/images";
import Logo from "@/assets/Logo.webp";

const EASE = [0.22, 1, 0.36, 1] as const;

type SplashPhase = "show" | "exit" | "hidden";

function clearSplashActive() {
  document.documentElement.classList.remove("splash-active");
  document.documentElement.style.removeProperty("background-color");
}

function resolveInitialPhase(): SplashPhase {
  if (sessionStorage.getItem(SPLASH_SESSION_KEY) === "1") {
    return "hidden";
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    return "hidden";
  }

  return "show";
}

export default function SplashScreen() {
  const [phase, setPhase] = useState<SplashPhase>(resolveInitialPhase);

  useEffect(() => {
    if (phase === "hidden") {
      clearSplashActive();
      return;
    }

    const exitTimer = window.setTimeout(() => setPhase("exit"), SPLASH_EXIT_AT_MS);
    const hideTimer = window.setTimeout(() => {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
      clearSplashActive();
      setPhase("hidden");
    }, SPLASH_HIDE_AT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
    // Timers only on first mount — initial phase is resolved once from sessionStorage.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only splash sequence
  }, []);

  if (phase === "hidden") {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="splash"
        className="splash-screen"
        role="presentation"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: phase === "exit" ? 0.4 : 0.35,
          ease: EASE,
        }}
      >
        <motion.div
          className="splash-screen-ambient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        />

        <div className="splash-screen-content">
          <div className="splash-logo-stage">
            <motion.div
              className="splash-logo-glow"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.28 }}
            />

            <motion.div
              className="splash-logo-wrap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            >
              <div className="splash-logo-sweep" aria-hidden />
              <Image
                src={Logo}
                alt=""
                width={72}
                height={72}
                priority
                quality={IMAGE_QUALITY.logo}
                className="splash-logo-image"
              />
            </motion.div>
          </div>

          <motion.p
            className="splash-tagline"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.52 }}
          >
            {SPLASH_TAGLINE}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
