"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ScrollToSection } from "@/components/ui";

export function PurposeBlock() {
  const t = useTranslations("purpose");

  return (
    <motion.div
      className="flex min-w-0 flex-col gap-5 rounded-2xl border border-dark-violet/15 bg-[#0d0d0d] p-6 md:flex-row md:items-center md:justify-between md:gap-12 md:p-10 lg:p-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <div className="flex min-w-0 flex-col gap-3">
        <h2 className="text-2xl font-semibold uppercase leading-tight tracking-tight break-words md:text-3xl lg:text-4xl">
          {t("titleStart")}{" "}
          <span className="text-gradient-violet">{t("titleAccent")}</span>
        </h2>
        <p className="max-w-lg text-sm text-[#aaa] break-words md:text-base">
          {t("description")}
        </p>
      </div>
      <ScrollToSection
        section="qa"
        className="flex shrink-0 cursor-pointer items-center justify-center gap-3 rounded-xl bg-dark-violet px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-dark transition-all duration-300 hover:bg-primary-hover md:text-base"
      >
        {t("cta")}
      </ScrollToSection>
    </motion.div>
  );
}
