import { BadgeCheck, Shield, Truck } from "lucide-react";

const items = [
  { icon: Truck, label: "Delivery available" },
  { icon: Shield, label: "Warranty support" },
  { icon: BadgeCheck, label: "Rigorously Tested Appliances" },
];

export default function Topbar() {
  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4">
        <div className="flex items-center gap-3 text-[11px] tracking-wide text-white/88">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <div key={it.label} className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-white/75" />
                <span className="whitespace-nowrap">{it.label}</span>
                {idx !== items.length - 1 && (
                  <span
                    aria-hidden
                    className="mx-1 hidden h-3 w-px bg-white/20 sm:inline-block"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

