"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"button"> & {
  strength?: number;
};

export default function MagneticButton({
  className,
  children,
  strength = 18,
  ...props
}: Props) {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <motion.button
      ref={ref}
      className={cn("relative inline-flex items-center justify-center", className)}
      whileTap={{ scale: 0.98 }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const mx = Math.max(-strength, Math.min(strength, x * 0.18));
        const my = Math.max(-strength, Math.min(strength, y * 0.18));
        el.style.setProperty("--mx", `${mx}px`);
        el.style.setProperty("--my", `${my}px`);
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--mx", `0px`);
        el.style.setProperty("--my", `0px`);
      }}
      style={{
        transform: "translate3d(var(--mx, 0px), var(--my, 0px), 0)",
        transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

