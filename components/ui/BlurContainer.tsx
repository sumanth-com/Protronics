import { cn } from "@/lib/utils";

export default function BlurContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-white/72 supports-[backdrop-filter]:bg-white/58 backdrop-blur-md border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

