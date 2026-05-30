"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LegalSection } from "@/lib/legal/types";
import { cn } from "@/lib/utils";

type LegalSidebarProps = {
  sections: LegalSection[];
};

export default function LegalSidebar({ sections }: LegalSidebarProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    setMobileOpen(false);
  };

  const activeTitle = sections.find((s) => s.id === activeId)?.title ?? sections[0]?.title;

  const navList = (
    <nav aria-label="Table of contents">
      <p className="legal-toc-label mb-3 hidden lg:block">On this page</p>
      <ul className="legal-toc-list space-y-0.5">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollTo(section.id)}
                className={cn(
                  "legal-toc-link w-full rounded-lg px-3 py-2.5 text-left text-[13px] leading-snug transition-colors",
                  isActive ? "legal-toc-link-active" : "legal-toc-link-idle",
                )}
                aria-current={isActive ? "true" : undefined}
              >
                {section.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile dropdown */}
      <div className="legal-toc-mobile mb-6 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="legal-toc-mobile-trigger flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-[13px] font-medium"
          aria-expanded={mobileOpen}
        >
          <span className="min-w-0 truncate">{activeTitle}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              mobileOpen && "rotate-180",
            )}
          />
        </button>
        {mobileOpen ? (
          <div className="legal-toc-mobile-panel mt-2 rounded-xl border p-3">{navList}</div>
        ) : null}
      </div>

      {/* Desktop sticky sidebar */}
      <aside className="legal-toc-aside hidden lg:block">
        <div className="legal-toc-card sticky top-[calc(var(--navbar-offset)+1.25rem)] rounded-2xl border p-4">
          {navList}
        </div>
      </aside>
    </>
  );
}
