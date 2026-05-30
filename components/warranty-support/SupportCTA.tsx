"use client";

import { useState } from "react";
import { ArrowUpRight, Headset } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import WarrantyDetailsModal from "@/components/warranty-support/WarrantyDetailsModal";
import { cn } from "@/lib/utils";

export type SupportCTAProps = {
  supportHref?: string;
  className?: string;
};

export default function SupportCTA({
  supportHref = "/contact",
  className,
}: SupportCTAProps) {
  const [warrantyOpen, setWarrantyOpen] = useState(false);

  return (
    <>
      <div className={cn("mt-7 flex flex-col gap-3 sm:flex-row", className)}>
        <CtaButton
          type="button"
          fullWidth
          className="sm:w-auto"
          onClick={() => setWarrantyOpen(true)}
          aria-haspopup="dialog"
        >
          View Warranty Details
          <ArrowUpRight className="h-4 w-4" />
        </CtaButton>

        <CtaButton href={supportHref} fullWidth className="sm:w-auto">
          Contact Support
          <Headset className="h-4 w-4" />
        </CtaButton>
      </div>

      <WarrantyDetailsModal open={warrantyOpen} onClose={() => setWarrantyOpen(false)} />
    </>
  );
}
