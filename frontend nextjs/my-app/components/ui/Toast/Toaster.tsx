"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { subscribe, dismissToast, type ToastItem } from "./toast-store";

const AUTO_DISMISS = 4500;

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => subscribe(setToasts), []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[3000] flex flex-col items-center gap-3 px-4 md:top-6">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastCard({ toast }: { toast: ToastItem }) {
  useEffect(() => {
    const timer = setTimeout(() => dismissToast(toast.id), AUTO_DISMISS);
    return () => clearTimeout(timer);
  }, [toast.id]);

  const isSuccess = toast.variant === "success";
  const accent = isSuccess ? "text-dark-violet" : "text-red-400";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => dismissToast(toast.id)}
      role="status"
      aria-live="polite"
      className={`pointer-events-auto relative flex w-full max-w-sm cursor-pointer items-center gap-3 overflow-hidden rounded-xl border bg-[#111]/95 px-4 py-3.5 shadow-2xl backdrop-blur-md ${
        isSuccess ? "border-dark-violet/30" : "border-red-500/30"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isSuccess ? "bg-dark-violet/10" : "bg-red-500/10"
        } ${accent}`}
      >
        {isSuccess ? (
          <motion.svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
            />
          </motion.svg>
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3.75h.008M12 3l9 16H3l9-16z"
            />
          </svg>
        )}
      </span>

      <p className="flex-1 text-sm leading-snug text-foreground">
        {toast.message}
      </p>

      <motion.span
        className={`absolute bottom-0 left-0 h-0.5 ${
          isSuccess ? "bg-dark-violet" : "bg-red-500"
        }`}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: AUTO_DISMISS / 1000, ease: "linear" }}
      />
    </motion.div>
  );
}
