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
  /** Use h1 once per page (form hero). Other sections stay h2. */
  as?: "h1" | "h2";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  headingId,
  as = "h2",
}: SectionHeaderProps) {
  const centered = align === "center";
  const HeadingTag = as;

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
      <HeadingTag
        id={headingId}
        className={cn(
          eyebrow ? "mt-2 sm:mt-3" : "mt-0",
          "type-page-hero font-semibold tracking-tight text-white",
        )}
      >
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={cn(
            "mt-3 text-[14px] leading-7 text-white/70 sm:mt-4 sm:text-[15px]",
            centered && "mx-auto max-w-xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
