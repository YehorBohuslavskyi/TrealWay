"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  hasPlus: boolean;
  hasPercent: boolean;
  hasK: boolean;
  targetValue: number;
};

const DURATION_MS = 1600;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function AnimatedCounter({ text, hasPlus, hasPercent, hasK, targetValue }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = text;
      animated.current = true;
      return;
    }

    let rafId = 0;
    let startTs = 0;

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(1, elapsed / DURATION_MS);
      const current = Math.floor(targetValue * easeOut(progress));
      let display = String(current);
      if (hasK) display = current + "k";
      else if (hasPercent) display = current + "%";
      else if (hasPlus) display = current + "+";
      el.textContent = display;
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        el.textContent = text;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        animated.current = true;
        observer.disconnect();
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [text, targetValue, hasPlus, hasPercent, hasK]);

  return (
    <span
      ref={ref}
      className="text-4xl font-semibold uppercase text-violet transition-colors duration-300 md:text-5xl"
    >
      {text}
    </span>
  );
}
