"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui";

const STEP_IMAGES = [
  "/process-step-1.jpeg",
  "/process-step-2.jpeg",
  "/process-step-3.jpeg",
  "/process-step-4.jpeg",
];

const lineGrow = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const cardVariant = (index: number) => ({
  hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 15 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.15,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
});

const dotVariant = (index: number) => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.15 + 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
});

function highlightAccent(text: string, accent: string) {
  const idx = text.indexOf(accent);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-violet">{accent}</span>
      {text.slice(idx + accent.length)}
    </>
  );
}

export function Reasons() {
  const t = useTranslations("reasons");

  const steps = [1, 2, 3, 4].map((n) => ({
    index: String(n).padStart(2, "0"),
    title: t(`step${n}Title`),
    description: t(`step${n}Desc`),
    accent: t(`step${n}Accent`),
    image: STEP_IMAGES[n - 1],
  }));

  return (
    <ScrollReveal
      as="section"
      className="reasons flex w-full min-w-0 flex-col gap-6 md:gap-10"
    >
      <div className="text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-dark-violet md:text-sm">
          {t("label")}
        </span>
        <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight md:text-5xl lg:text-6xl">
          {t("titleStart")} <span className="text-gradient-violet">{t("titleAccent")}</span>
        </h2>
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div
          className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-dark-violet/50 via-dark-violet/15 to-transparent md:left-1/2 md:-translate-x-1/2"
          variants={lineGrow}
        />

        <div className="flex flex-col gap-8 md:gap-14">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div
                key={step.index}
                className="relative flex items-start gap-0 md:items-center"
              >
                <motion.div
                  className="absolute left-5 top-5 z-20 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  variants={dotVariant(i)}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-violet/30 bg-[#0d0d0d] font-mono text-xs font-bold text-dark-violet md:h-10 md:w-10">
                    {step.index}
                  </div>
                </motion.div>

                <motion.div
                  className={`ml-14 w-full md:ml-0 md:w-[calc(50%-36px)] ${
                    isLeft
                      ? "md:mr-auto md:pr-4 md:text-right"
                      : "md:ml-auto md:pl-4 md:text-left"
                  }`}
                  variants={cardVariant(i)}
                >
                  <div className="overflow-hidden rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] transition-all duration-300 hover:border-dark-violet/20">
                    <div className="relative h-[140px] w-full overflow-hidden md:h-[160px]">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
                    </div>
                    <div className="p-5 md:p-6">
                      <h3 className="mb-2 text-base font-semibold uppercase tracking-tight md:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#aaa]">
                        {highlightAccent(step.description, step.accent)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
