"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TradeInSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function TradeInSectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: TradeInSectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[12px] font-medium tracking-[0.22em] text-white/50">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-white sm:text-[34px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-[14px] leading-7 text-white/65 sm:text-[15px]">
          {description}
        </p>
      ) : null}
      <div
        className={cn(
          "mt-4 h-[2px] w-14 rounded-full bg-white/50",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  );
}

export function TradeInReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
