"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeUp } from "@/lib/animations";
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
      variants={fadeUp}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-white/12 bg-black",
        "px-6 py-6",
        "h-full min-h-[200px]",
      )}
    >
      <div className="relative flex h-full flex-col">
        <div
          className={cn(
            "grid h-12 w-12 place-items-center rounded-xl",
            "border border-white/12 bg-white/[0.06]",
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>

        <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-white">
          {title}
        </h3>
        <div className="mt-2 h-[2px] w-10 rounded-full bg-white/50" />
        <p className="mt-3 text-[13px] leading-6 text-white/65">{description}</p>
      </div>
    </motion.article>
  );
}
