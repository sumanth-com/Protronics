"use client";

import dynamic from "next/dynamic";
import { useCompare } from "@/hooks/useProductStore";

const CompareToast = dynamic(() => import("@/components/compare/CompareToast"), {
  ssr: false,
});

const CompareStickyBar = dynamic(() => import("@/components/compare/CompareStickyBar"), {
  ssr: false,
});

export default function CompareShell() {
  const { count } = useCompare();

  return (
    <>
      <CompareToast />
      {count > 0 ? <CompareStickyBar /> : null}
    </>
  );
}
