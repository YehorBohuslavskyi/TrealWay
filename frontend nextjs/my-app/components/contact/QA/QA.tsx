"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollReveal } from "@/components/ui";

export function QA() {
  const t = useTranslations("qa");

  return (
    <ScrollReveal
      as="section"
      className="qa flex w-full min-w-0 flex-col gap-6 md:gap-10"
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

      <div className="mx-auto w-full max-w-3xl">
        <ContactForm />
      </div>
    </ScrollReveal>
  );
}
