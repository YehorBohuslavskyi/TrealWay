"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ServiceCard } from "@/components/landing/ServiceCard";
import { ScrollReveal } from "@/components/ui";
import { SERVICE_RANGES } from "@/shared";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Services() {
  const t = useTranslations("services");

  const services = [1, 2, 3, 4].map((n) => ({
    type: t(`s${n}Type`),
    description: t(`s${n}Desc`),
    range: SERVICE_RANGES[n - 1],
    iconIndex: n - 1,
  }));

  return (
    <ScrollReveal
      as="section"
      className="services flex w-full min-w-0 flex-col gap-6 md:gap-10"
    >
      <div className="text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-dark-violet md:text-sm">
          {t("label")}
        </span>
        <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight md:text-5xl">
          {t("titleStart")}{" "}
          <span className="text-gradient-violet">{t("titleAccent")}</span>{" "}
          {t("titleEnd")}
        </h2>
      </div>
      <motion.div
        className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 md:gap-4"
        variants={stagger}
      >
        {services.map((s, i) => (
          <motion.div key={i} variants={item}>
            <ServiceCard
              type={s.type}
              description={s.description}
              range={s.range}
              iconIndex={s.iconIndex}
            />
          </motion.div>
        ))}
      </motion.div>
    </ScrollReveal>
  );
}
