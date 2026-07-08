"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollToSection } from "@/components/ui";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  },
});

export function HeroContent() {
  const [showScroll, setShowScroll] = useState(true);
  const t = useTranslations("hero");

  useEffect(() => {
    let ticking = false;
    let lastValue = true;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY < 80;
        if (next !== lastValue) {
          lastValue = next;
          setShowScroll(next);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-[85vh] w-full overflow-hidden rounded-2xl md:min-h-[80vh] md:rounded-3xl">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/info/about.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/70 to-dark" />
      </div>

      <motion.div
        className="relative z-10 flex h-full min-h-[85vh] flex-col items-center justify-center px-5 py-20 text-center md:min-h-[80vh] md:px-10 lg:px-20"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#222] bg-[#111]/80 px-5 py-2.5 backdrop-blur-md md:mb-8"
          variants={fadeUp(0)}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-dark-violet" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#aaa] md:text-xs">
            {t("badge")}
          </span>
        </motion.div>

        <motion.h1
          className="mb-3 max-w-5xl text-[clamp(2.8rem,8vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-tighter"
          variants={fadeUp(0.05)}
        >
          {t("titleStart")} <span className="text-gradient-violet">{t("titleAccent")}</span>
        </motion.h1>

        <motion.p
          className="mb-6 text-[clamp(1.1rem,3vw,3rem)] font-light uppercase leading-tight tracking-tight text-[#999] md:mb-8"
          variants={fadeUp(0.1)}
        >
          {t("subtitle")}
        </motion.p>

        <motion.p
          className="mb-10 max-w-md text-sm leading-relaxed text-[#aaa] md:mb-12 md:text-base"
          variants={fadeUp(0.15)}
        >
          {t("description")}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          variants={fadeUp(0.2)}
        >
          <ScrollToSection
            section="qa"
            className="group flex cursor-pointer items-center gap-3 rounded-xl bg-dark-violet px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-dark transition-all duration-300 hover:bg-primary-hover md:px-8 md:py-4 md:text-base"
          >
            {t("cta")}
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </ScrollToSection>
          <ScrollToSection
            section="projects"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#222] px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-wider text-[#888] transition-all duration-300 hover:border-[#444] hover:text-foreground md:px-8 md:py-4 md:text-base"
          >
            {t("ctaSecondary")}
          </ScrollToSection>
        </motion.div>

        <AnimatePresence>
          {showScroll && (
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex h-8 w-5 items-start justify-center rounded-full border border-[#333] p-1">
                <motion.div
                  className="h-1.5 w-0.5 rounded-full bg-dark-violet"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
