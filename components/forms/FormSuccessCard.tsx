"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

export type FormSuccessCardProps = {
  title?: string;
  description?: string;
  submitAnotherLabel?: string;
  onSubmitAnother: () => void;
  className?: string;
  /** Dark card (contact page) vs light */
  variant?: "dark" | "light";
};

const cardSpring = { type: "spring" as const, stiffness: 380, damping: 28 };

export default function FormSuccessCard({
  title = "Request received",
  description = "Our team will contact you shortly with curated options, pricing, and delivery timelines.",
  submitAnotherLabel = "Submit another form",
  onSubmitAnother,
  className,
  variant = "dark",
}: FormSuccessCardProps) {
  const reduceMotion = useReducedMotion();
  const isDark = variant === "dark";

  return (
    <motion.div
      className={cn(
        "form-success-card flex min-h-[min(420px,70vh)] flex-col items-center justify-center px-4 py-10 text-center sm:px-6",
        className,
      )}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
      transition={reduceMotion ? { duration: 0.2 } : cardSpring}
    >
      <motion.div
        className="form-success-card__badge relative"
        initial={reduceMotion ? false : { scale: 0, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : { ...cardSpring, delay: 0.05 }
        }
      >
        {!reduceMotion ? (
          <motion.span
            className={cn(
              "pointer-events-none absolute inset-0 rounded-full",
              isDark ? "bg-white/20" : "bg-theme-accent/25",
            )}
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 1.85, opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            aria-hidden
          />
        ) : null}
        <div
          className={cn(
            "relative grid h-16 w-16 place-items-center rounded-full",
            isDark ? "bg-white text-black" : "bg-theme-accent text-white",
          )}
        >
          <Check className="h-8 w-8 stroke-[2.5]" aria-hidden />
        </div>
      </motion.div>

      <motion.h3
        className={cn(
          "mt-6 text-[22px] font-semibold tracking-tight sm:text-[24px]",
          isDark ? "text-white" : "text-theme-fg",
        )}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h3>

      <motion.p
        className={cn(
          "mt-2 max-w-sm text-[14px] leading-7",
          isDark ? "text-white/65" : "text-theme-fg-muted",
        )}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {description}
      </motion.p>

      <motion.div
        className="mt-8 w-full max-w-xs"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <CtaButton type="button" size="lg" fullWidth onClick={onSubmitAnother}>
          {submitAnotherLabel}
        </CtaButton>
      </motion.div>
    </motion.div>
  );
}
