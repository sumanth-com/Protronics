"use client";

import { useEffect } from "react";
import CtaButton from "@/components/ui/CtaButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-4 text-center text-white">
      <p className="text-[12px] font-medium tracking-[0.22em] text-white/55">
        Something went wrong
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        We hit a snag
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-7 text-white/70">
        A temporary issue occurred. Try again, or return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <CtaButton onClick={reset}>Try again</CtaButton>
        <CtaButton href="/" className="bg-transparent text-white ring-white/20 hover:bg-white/[0.06]">
          Go home
        </CtaButton>
      </div>
    </div>
  );
}
