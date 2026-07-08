"use client";

import { AnimatedCounter } from "@/components/ui";

type Props = {
  title: string;
  value: string;
};

export function StatItem({ title, value }: Props) {
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");
  const hasK = value.includes("k") || value.includes("K");
  const targetValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

  return (
    <div className="group flex flex-col items-center justify-center gap-2.5 rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] px-4 py-5 transition-all duration-300 last:col-span-2 hover:border-dark-violet/15 md:px-5 md:py-6 lg:last:col-span-1">
      <span className="truncate font-mono text-[11px] uppercase tracking-wider text-[#888] md:text-xs">
        {title}
      </span>
      <AnimatedCounter
        text={value}
        hasPlus={hasPlus}
        hasPercent={hasPercent}
        hasK={hasK}
        targetValue={targetValue}
      />
    </div>
  );
}
