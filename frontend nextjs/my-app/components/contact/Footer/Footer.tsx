"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Ticker, ScrollReveal } from "@/components/ui";
import { PurposeBlock } from "@/components/contact/PurposeBlock";
import { SocialLink } from "@/components/contact/SocialLink";
import { NewsletterBlock } from "@/components/contact/NewsletterBlock";
import { SOCIAL_LINKS } from "@/shared";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Footer() {
  const t = useTranslations("footer");

  return (
    <ScrollReveal
      as="footer"
      className="footer flex w-full min-w-0 flex-col gap-4 md:gap-5"
    >
      <PurposeBlock />

      <div className="overflow-hidden rounded-xl bg-[#0d0d0d] p-3.5 md:p-4">
        <Ticker />
      </div>

      <motion.div
        className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3"
        variants={stagger}
      >
        {SOCIAL_LINKS.map((link) => (
          <motion.div key={link.title} variants={item}>
            <SocialLink
              iconSrc={link.iconSrc}
              iconAlt={link.iconAlt}
              title={link.title}
              subtitle={link.subtitle}
              href={link.href}
            />
          </motion.div>
        ))}
      </motion.div>

      <NewsletterBlock />

      <div className="flex w-full flex-col gap-3 rounded-xl bg-[#0d0d0d] px-5 py-5 font-mono text-[11px] text-[#777] md:flex-row md:items-center md:justify-between md:px-8 md:py-6 md:text-xs">
        <span>&copy; {new Date().getFullYear()} TrealWay</span>
        <a
          href="mailto:info@trealway.com"
          className="text-[#999] transition-colors hover:text-dark-violet"
        >
          info@trealway.com
        </a>
        <span className="hidden md:inline">
          {t("terms")} &middot;{" "}
          <Link href="/privacy-policy" className="text-[#999] transition-colors hover:text-dark-violet">
            {t("privacyPolicy")}
          </Link>
        </span>
        <span className="md:hidden">
          {t("termsShort")} &middot;{" "}
          <Link href="/privacy-policy" className="text-[#999] transition-colors hover:text-dark-violet">
            {t("privacyShort")}
          </Link>
        </span>
      </div>
    </ScrollReveal>
  );
}
