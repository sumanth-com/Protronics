"use client";

import CtaButton from "@/components/ui/CtaButton";

export default function HeroButtons() {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
      <CtaButton href="#shop" size="lg" fullWidth className="sm:w-auto">
        Explore Collection
      </CtaButton>

      <CtaButton href="#demo" size="lg" fullWidth className="sm:w-auto">
        Book Video Demo
      </CtaButton>
    </div>
  );
}
