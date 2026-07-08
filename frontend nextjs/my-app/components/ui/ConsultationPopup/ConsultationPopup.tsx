"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ScrollToSection } from "@/components/ui/ScrollToSection";

export function ConsultationPopup() {
  const [show, setShow] = useState(false);
  const t = useTranslations("popup");

  useEffect(() => {
    const dismissed = sessionStorage.getItem("consultation-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setShow(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("consultation-dismissed", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[2001] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-dark-violet/20 bg-[#111] p-8 shadow-2xl md:p-10"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#333] text-[#888] transition-colors hover:border-dark-violet/40 hover:text-foreground"
              aria-label="Close"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-dark-violet/10">
                <svg className="h-7 w-7 text-dark-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold uppercase tracking-tight md:text-2xl">
                {t("title")}
              </h3>

              <p className="text-sm leading-relaxed text-[#aaa] md:text-base">
                {t.rich("description", {
                  accent: (chunks) => <span className="text-violet font-medium">{chunks}</span>,
                })}
              </p>

              <ScrollToSection
                section="qa"
                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-dark-violet px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-dark transition-all duration-300 hover:bg-primary-hover md:text-base"
                onClick={handleClose}
              >
                {t("cta")}
                <svg className="h-4 w-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </ScrollToSection>

              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer font-mono text-[11px] uppercase tracking-wider text-[#666] transition-colors hover:text-[#aaa]"
              >
                {t("dismiss")}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
