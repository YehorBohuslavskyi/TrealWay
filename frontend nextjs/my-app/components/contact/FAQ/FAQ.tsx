"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FAQItem } from "@/components/contact/FAQItem";
import { ScrollReveal } from "@/components/ui";

const FAQ_COUNT = 6;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("faq");

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`q${i + 1}`),
    a: t(`a${i + 1}`),
  }));

  return (
    <ScrollReveal
      as="section"
      className="faq flex w-full min-w-0 flex-col gap-6 md:gap-10"
    >
      <div className="text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-dark-violet md:text-sm">
          {t("label")}
        </span>
        <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight md:text-5xl">
          {t("titleStart")}{" "}
          <span className="text-gradient-violet">{t("titleAccent")}</span>
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-2.5">
        {items.map((faq, i) => (
          <FAQItem
            key={i}
            question={faq.q}
            answer={faq.a}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </ScrollReveal>
  );
}
