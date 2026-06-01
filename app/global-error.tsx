"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center text-white antialiased">
        <p className="text-[12px] font-medium tracking-[0.22em] text-white/55">
          Application error
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-7 text-white/70">
          Please refresh the page or try again in a moment.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-full bg-white px-6 py-2.5 text-[13px] font-semibold text-black transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
