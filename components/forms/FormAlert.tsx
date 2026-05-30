import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FormAlertProps = {
  variant: "error" | "success";
  title?: string;
  message: string;
  className?: string;
};

export default function FormAlert({ variant, title, message, className }: FormAlertProps) {
  const Icon = variant === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-2xl border px-4 py-3 text-[13px] leading-6",
        variant === "success"
          ? "border-white/15 bg-white/[0.04] text-white/80"
          : "border-red-400/30 bg-red-400/10 text-red-200",
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div>
        {title ? <p className="font-semibold text-white">{title}</p> : null}
        <p className={title ? "mt-0.5 text-white/70" : undefined}>{message}</p>
      </div>
    </div>
  );
}
