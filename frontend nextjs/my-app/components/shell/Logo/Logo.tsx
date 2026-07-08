"use client";

import Image from "next/image";
import { scrollToSection } from "@/shared";

export function Logo() {
  return (
    <button
      type="button"
      onClick={() => scrollToSection("info")}
      className="flex cursor-pointer items-center gap-2 border-none bg-transparent p-0"
      aria-label="Go to top"
    >
      <Image
        src="/Logo (2).svg"
        alt="TrealWay"
        width={120}
        height={26}
        className="h-6 w-auto md:h-7"
        priority
      />
    </button>
  );
}
