"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ScrollToSection } from "@/components/ui";

type Props = {
  type: string;
  description: string;
  range: string;
  iconIndex: number;
};

const ICONS = [
  // 0: Mobile & Web
  <svg key="0" className="h-4.5 w-4.5 text-dark-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>,
  // 1: AI & Automation
  <svg key="1" className="h-4.5 w-4.5 text-dark-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
  </svg>,
  // 2: Data & Smart
  <svg key="2" className="h-4.5 w-4.5 text-dark-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>,
  // 3: SaaS & Subscription
  <svg key="3" className="h-4.5 w-4.5 text-dark-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  </svg>,
];

export function ServiceCard({ type, description, range, iconIndex }: Props) {
  const t = useTranslations("services");

  return (
    <motion.div
      className="group flex h-full min-w-0 flex-col justify-between gap-5 rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-5 transition-all duration-300 hover:border-dark-violet/25 md:gap-6 md:p-7"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-dark-violet/8">
            {ICONS[iconIndex]}
          </div>
          <h3 className="text-base font-semibold uppercase leading-tight tracking-tight md:text-lg">
            {type}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-[#aaa] break-words">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-4">
        <div className="font-mono text-sm text-[#777]">
          <span className="text-[#777]">{t("from")} </span>
          <span className="text-foreground">{range}</span>
        </div>
        <ScrollToSection
          section="qa"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#222] transition-all duration-300 hover:border-dark-violet/40 hover:bg-dark-violet/8"
          as="button"
        >
          <svg
            className="h-3.5 w-3.5 text-[#888] transition-colors group-hover:text-dark-violet"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </ScrollToSection>
      </div>
    </motion.div>
  );
}
