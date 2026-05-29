"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Route,
  Truck,
} from "lucide-react";
import SectionHeader from "@/components/contact/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import { BUSINESS, contactGlass } from "@/lib/contact";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: MapPin,
    label: "Business Address",
    value: BUSINESS.address,
  },
  {
    icon: Phone,
    label: "Phone Number",
    value: BUSINESS.phone,
    href: BUSINESS.phoneHref,
  },
  {
    icon: Mail,
    label: "Email Address",
    value: BUSINESS.email,
    href: BUSINESS.emailHref,
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: BUSINESS.hours,
  },
  {
    icon: Route,
    label: "Service Areas",
    value: BUSINESS.serviceAreas,
  },
  {
    icon: Truck,
    label: "Delivery Coverage",
    value: BUSINESS.delivery,
  },
] as const;

export default function BusinessInfo() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(57,255,136,0.35),transparent)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="grid gap-10 lg:grid-cols-12 lg:items-start"
        >
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="VISIT & VERIFY"
              title="Business Information"
              description="Transparent details—so you know exactly who you're buying from and how we deliver."
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {items.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-[#39ff88]/10">
                      <Icon className="h-4 w-4 text-[#39ff88]/90" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
                        {item.label}
                      </div>
                      <div className="mt-1.5 text-[14px] font-medium leading-6 text-white/85">
                        {item.value}
                      </div>
                    </div>
                  </div>
                </>
              );

              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className={cn(contactGlass, "p-5 transition-colors hover:border-white/18")}
                >
                  {"href" in item && item.href ? (
                    <a href={item.href} className="block transition-opacity hover:opacity-90">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
