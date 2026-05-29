import type { SupportTrustCard } from "@/lib/support";
import { supportGlass } from "@/lib/support";
import { cn } from "@/lib/utils";

type SupportProtectionTrustCardProps = {
  trustCard: SupportTrustCard;
  className?: string;
};

export default function SupportProtectionTrustCard({
  trustCard,
  className,
}: SupportProtectionTrustCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5",
        supportGlass,
        "border-white/10 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <p className="text-[11px] font-medium tracking-[0.18em] text-white/45">
        PROTRONICS PROTECTION
      </p>
      <h3 className="mt-1.5 text-[16px] font-semibold tracking-tight text-white">
        {trustCard.title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {trustCard.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13px] leading-5 text-white/75">
            <span className="mt-0.5 text-white" aria-hidden>
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
