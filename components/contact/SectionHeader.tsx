"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  headingId?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  headingId,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <motion.div
      variants={fadeUp}
      className={cn(centered && "mx-auto max-w-2xl text-center", className)}
    >
      {eyebrow ? (
        <p className="text-[12px] font-medium tracking-[0.22em] text-white/55">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={headingId}
        className={cn(
          eyebrow ? "mt-2 sm:mt-3" : "mt-0",
          "type-page-hero font-semibold tracking-tight text-white",
          "text-[24px] leading-[1.08] sm:text-[32px] lg:text-[36px]",
        )}
      >
        {title}
      </h2>
      <div className={cn("theme-accent-line mt-3 w-12", centered && "mx-auto")} />
      {description ? (
        <p
          className={cn(
            "mt-4 text-[14px] leading-7 text-white/65 sm:text-[15px]",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
