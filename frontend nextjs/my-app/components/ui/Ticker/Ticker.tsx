"use client";

import Image from "next/image";
import { TICKER_ITEMS } from "@/shared";

const REPEAT = 2;

export function Ticker() {
  const items = TICKER_ITEMS.flatMap((text) => [text, "dot"]);

  return (
    <div className="relative flex h-full w-full items-center">
      <div className="flex animate-ticker items-center gap-12 will-change-transform hover:[animation-play-state:paused]">
        {[...Array(REPEAT)].flatMap((_, setIndex) =>
          items.map((item, i) =>
            item === "dot" ? (
              <div key={`${setIndex}-${i}`} className="inline-flex shrink-0 items-center">
                <Image src="/assets/images/arrows/dot.svg" alt="" width={8} height={8} />
              </div>
            ) : (
              <div key={`${setIndex}-${i}`} className="inline-flex shrink-0 items-center">
                <span className="font-semibold text-sm tracking-widest uppercase text-ticker transition-colors duration-300 hover:text-light-violet md:text-base">
                  {item}
                </span>
              </div>
            ),
          ),
        )}
      </div>
    </div>
  );
}
