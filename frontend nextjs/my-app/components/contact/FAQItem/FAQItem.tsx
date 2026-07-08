"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

export function FAQItem({ question, answer, open, onToggle }: Props) {
  return (
    <div
      className={`flex w-full min-w-0 flex-col rounded-xl border transition-all duration-300 ${
        open ? "border-dark-violet/30 bg-[#111]" : "border-[#1a1a1a] bg-[#0d0d0d]"
      }`}
    >
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left lg:p-6"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="min-w-0 text-sm font-medium break-words md:text-base">
          {question}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open ? "border-dark-violet/40 bg-dark-violet/10" : "border-[#333]"
          }`}
        >
          <svg
            className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke={open ? "#7563CE" : "#999"}
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#1a1a1a] px-5 pb-5 pt-4 lg:px-6 lg:pb-6">
              <p className="text-sm leading-relaxed text-[#aaa] break-words md:text-base">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
