"use client";

import { motion } from "framer-motion";
import CategoryCard from "@/components/categories/CategoryCard";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Single Door",
    img: "https://images.unsplash.com/photo-1623092242739-5a382879cec9?auto=format&fit=crop&w=1200&q=80",
    pos: "50% 55%",
    href: "/shop/single-door",
  },
  {
    title: "Double Door",
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    pos: "55% 55%",
    href: "/shop/double-door",
  },
  {
    title: "Mini Fridges",
    img: "https://images.unsplash.com/photo-1585338667391-5b279a0c5eb8?auto=format&fit=crop&w=1200&q=80",
    pos: "50% 55%",
    href: "/shop/mini-fridges",
  },
  {
    title: "Premium Hubs",
    img: "https://images.unsplash.com/photo-1667404202905-4335b5370d96?auto=format&fit=crop&w=1200&q=80",
    pos: "55% 55%",
    href: "/shop/premium-hubs",
  },
  {
    title: "Commercial",
    img: "https://images.unsplash.com/photo-1722942624429-4e179ed18ec6?auto=format&fit=crop&w=1200&q=80",
    pos: "55% 55%",
    href: "/shop/commercial",
  },
];

export default function CategorySection() {
  return (
    <section id="shop" className="relative">
      {/* Seamless transition from hero */}
      <div className="category-hero-fade pointer-events-none absolute inset-x-0 -top-24 h-24 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div
        className={cn(
          "relative",
          "bg-black theme-section-a",
          "pt-10 pb-16 sm:pt-12 sm:pb-20",
        )}
      >
        {/* categories grid */}
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            className="flex flex-col items-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-center text-[28px] font-semibold tracking-tight text-white sm:text-[34px]"
            >
              Shop By Category
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="mt-2.5 h-[2px] w-14 rounded-full bg-white"
            />
          </motion.div>

          {/* Desktop/tablet grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-18% 0px -10% 0px" }}
            className="mt-8 hidden grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-5"
          >
            {categories.map((c) => (
              <motion.div key={c.title} variants={fadeUp}>
                <CategoryCard
                  title={c.title}
                  image={c.img}
                  href={c.href}
                  objectPosition={c.pos}
                  tone="dark"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile premium horizontal slider */}
          <div className="mt-8 sm:hidden">
            <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-lenis-prevent>
              <div className="flex snap-x snap-mandatory gap-4">
                {categories.map((c) => (
                  <div
                    key={c.title}
                    className="w-[72%] shrink-0 snap-start"
                  >
                    <CategoryCard
                      title={c.title}
                      image={c.img}
                      href={c.href}
                      objectPosition={c.pos}
                      tone="dark"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

