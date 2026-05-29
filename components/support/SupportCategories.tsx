"use client";

import type { SupportCategory } from "@/lib/support";
import { SUPPORT_ICON_PROPS } from "@/lib/support";
import { cn } from "@/lib/utils";

type SupportCategoriesProps = {
  categories: SupportCategory[];
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
  className?: string;
};

export default function SupportCategories({
  categories,
  activeCategoryId,
  onSelect,
  className,
}: SupportCategoriesProps) {
  return (
    <nav aria-label="Support categories" className={cn("flex flex-col gap-0.5", className)}>
      {categories.map((category) => {
        const Icon = category.icon;
        const active = category.id === activeCategoryId;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={cn(
              "group relative flex w-full items-start gap-3.5 rounded-lg py-3.5 pl-4 pr-3 text-left transition-colors",
              active
                ? "bg-white/[0.05] text-white"
                : "text-white/70 hover:bg-white/[0.03] hover:text-white",
            )}
          >
            {active ? (
              <span className="absolute bottom-2.5 left-0 top-2.5 w-[2px] rounded-full bg-white" />
            ) : null}
            <Icon
              {...SUPPORT_ICON_PROPS}
              className={cn(
                "mt-0.5 shrink-0",
                active ? "text-white" : "text-white/50 group-hover:text-white/75",
              )}
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block text-[16px] font-medium leading-snug">{category.label}</span>
              <span className="mt-1 block text-[13px] leading-5 text-white/45">{category.description}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
