"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollUp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastValue = false;
    const check = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 400;
        if (next !== lastValue) {
          lastValue = next;
          setVisible(next);
        }
        ticking = false;
      });
    };
    setVisible(window.scrollY > 400);
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="fixed right-4 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border-gray bg-dark-gray/90 backdrop-blur-sm transition-colors hover:border-dark-violet hover:glow-violet-sm md:right-6 md:bottom-10 md:h-14 md:w-14"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="h-5 w-5 text-[#aaa]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
