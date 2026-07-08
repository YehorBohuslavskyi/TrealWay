"use client";

import { HeroContent } from "@/components/landing/HeroContent";
import { StatsBar } from "@/components/landing/StatsBar";
import { Ticker } from "@/components/ui";

export function Info() {
  return (
    <section className="info flex w-full min-w-0 flex-col gap-5 md:gap-8">
      <HeroContent />
      <StatsBar />
      <div className="overflow-hidden rounded-xl bg-[#0d0d0d] p-3.5 md:p-4">
        <Ticker />
      </div>
    </section>
  );
}
