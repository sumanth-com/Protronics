import type { Metadata } from "next";
import Link from "next/link";
import CtaButton from "@/components/ui/CtaButton";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "This page does not exist. Browse refurbished refrigerators and appliances at Protronics, or return home.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-4 text-center text-white">
      <p className="text-[12px] font-medium tracking-[0.22em] text-white/55">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-7 text-white/70">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <CtaButton href="/shop">Browse shop</CtaButton>
        <Link
          href="/"
          className="rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
