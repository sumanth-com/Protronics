"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeUpCard } from "@/lib/animations";
import { cn } from "@/lib/utils";

type AboutPromiseCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function AboutPromiseCard({
  icon: Icon,
  title,
  description,
}: AboutPromiseCardProps) {
  return (
    <motion.article
      variants={fadeUpCard}
      className={cn(
        "premium-card about-promise-card group relative overflow-hidden rounded-2xl",
        "border border-white/12 bg-black",
        "px-6 py-6",
        "h-full min-h-[200px]",
      )}
    >
      <div className="relative flex h-full flex-col">
        <div className="about-promise-icon-wrap grid h-12 w-12 place-items-center rounded-xl border border-white/12 bg-white/[0.06]">
          <Icon className="about-promise-icon h-5 w-5 text-white" strokeWidth={1.75} />
        </div>

        <h3 className="about-promise-title mt-4 text-[15px] font-semibold tracking-tight text-white">
          {title}
        </h3>
        <div className="theme-accent-line about-promise-accent mt-2 w-10" aria-hidden />
        <p className="about-promise-desc mt-3 text-[13px] leading-6 text-white/65">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
