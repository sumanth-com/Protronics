"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow = "Why Buy From Protronics?",
  title = "Engineered for Trust.",
  description = "Premium renewed appliances, professionally certified with rigorous restoration standards—so refurbished feels undeniably premium.",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
      className={cn("mx-auto flex max-w-3xl flex-col items-center", className)}
    >
      <motion.p
        variants={fadeUp}
        className="text-center text-[12px] font-medium tracking-[0.22em] text-white/55"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className={cn(
          "type-section-title mt-3 text-center font-semibold tracking-tight text-white",
          "text-[34px] leading-[1.06]",
          "sm:text-[44px] sm:leading-[1.04]",
        )}
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-center text-[14px] leading-7 text-white/70 sm:text-[15px]"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

