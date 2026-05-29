"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import AboutAmbient from "@/components/about/AboutAmbient";
import SectionHeader from "@/components/contact/SectionHeader";
import { WHY_PILLARS, whyGlass } from "@/lib/why";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

function PillarCard({ icon: Icon, title, description }: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl px-6 py-6",
        whyGlass,
        "transition-colors hover:border-white/18",
      )}
    >
<Icon className="relative h-6 w-6 text-white" strokeWidth={1.75} />
      <h3 className="relative mt-4 text-[16px] font-semibold text-white">{title}</h3>
      <p className="relative mt-2 text-[14px] leading-6 text-white/60">{description}</p>
    </motion.article>
  );
}

export default function WhyStandard() {
  return (
    <section aria-labelledby="why-standard-heading" className="relative overflow-hidden bg-black py-16 sm:py-20">
      <AboutAmbient variant="section" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="why-standard-heading"
          eyebrow="THE PROTRONICS STANDARD"
          title="Trust Built Into Every Unit."
          align="center"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {WHY_PILLARS.map((pillar) => (
            <PillarCard key={pillar.title} {...pillar} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
