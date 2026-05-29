"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";
import LifestyleContent from "@/components/lifestyle/LifestyleContent";
import LifestyleImage from "@/components/lifestyle/LifestyleImage";

export default function LifestyleSection() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
          className={cn("grid items-center gap-10", "md:grid-cols-12 md:gap-10")}
        >
          <motion.div variants={fadeUp} className="md:col-span-5">
            <LifestyleContent />
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-7">
            <LifestyleImage
              src="/lifestyle/lifestyle-1.jpg"
              alt="Modern premium kitchen interior"
              className="aspect-[5/4] md:aspect-[16/10]"
            />

            <div className="mt-4 hidden grid-cols-2 gap-4 md:grid">
              <LifestyleImage
                src="/lifestyle/lifestyle-2.jpg"
                alt="Warm luxury home interior"
                className="aspect-[4/3]"
              />
              <div
                className={cn(
                  "relative overflow-hidden rounded-[26px]",
                  "border border-white/12 bg-black",
                  "shadow-[0_35px_110px_rgba(0,0,0,0.65)]",
                  "px-6 py-6",
                )}
              >
                <div className="text-[12px] font-medium tracking-[0.22em] text-white/55">
                  THE FEELING
                </div>
                <div className="mt-3 text-[18px] font-semibold leading-snug tracking-tight text-white">
                  A calmer kitchen.
                  <br />
                  A smarter home.
                </div>
                <div className="mt-3 h-[2px] w-10 rounded-full bg-white/50" />
                <div className="mt-4 text-[12.5px] leading-6 text-white/70">
                  Premium appliances shouldn&apos;t be out of reach. Get the modern look
                  and confident performance—restored with professional standards.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
