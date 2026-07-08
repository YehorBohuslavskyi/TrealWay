"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { feedbackApi } from "@/shared";

export function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const t = useTranslations("newsletter");

  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError(false);
    if (!email.trim() || !emailRegex.test(email)) {
      setError(true);
      return;
    }
    feedbackApi
      .subscribeEmail({ email: email.trim() })
      .then((res) => {
        if (res.ok) setSent(true);
        setEmail("");
        setTimeout(() => setSent(false), 3000);
      })
      .catch(() => {});
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] p-5 md:flex-row md:items-center md:justify-between md:p-6">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-sm font-medium uppercase tracking-wider md:text-base">
          {t("title")}
        </span>
        <span className="text-xs text-[#888]">
          {t("subtitle")}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="email"
          placeholder={t("placeholder")}
          className={`w-full rounded-lg border border-[#1a1a1a] bg-[#080808] px-4 py-2.5 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-[#666] focus:border-dark-violet/40 md:w-64 ${
            error ? "!border-red-500/50" : ""
          }`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
            setSent(false);
          }}
        />
        <button
          type="button"
          onClick={handleSubscribe}
          aria-label="Subscribe"
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-dark-violet transition-all duration-300 hover:bg-primary-hover"
        >
          <svg
            className="h-4 w-4 text-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      {sent && (
        <span className="font-mono text-xs text-dark-violet">{t("subscribed")}</span>
      )}
    </div>
  );
}
