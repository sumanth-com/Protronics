"use client";

import { ArrowUpRight, Headset } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

export type SupportCTAProps = {
  warrantyHref?: string;
  supportHref?: string;
  className?: string;
};

export default function SupportCTA({
  warrantyHref = "#warranty",
  supportHref = "/contact",
  className,
}: SupportCTAProps) {
  return (
    <div className={cn("mt-7 flex flex-col gap-3 sm:flex-row", className)}>
      <CtaButton href={warrantyHref} fullWidth className="sm:w-auto">
        View Warranty Details
        <ArrowUpRight className="h-4 w-4" />
      </CtaButton>

      <CtaButton href={supportHref} fullWidth className="sm:w-auto">
        Contact Support
        <Headset className="h-4 w-4" />
      </CtaButton>
    </div>
  );
}
