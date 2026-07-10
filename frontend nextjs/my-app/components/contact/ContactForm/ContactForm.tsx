"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { feedbackApi } from "@/shared";
import { toast } from "@/components/ui";
import { BudgetSlider } from "@/components/contact/BudgetSlider";

export function ContactForm() {
  const [slider1, setSlider1] = useState(10000);
  const [slider2, setSlider2] = useState(50000);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [reasons, setReasons] = useState<string[]>([]);
  const t = useTranslations("qa");

  const CONTACT_REASONS = [
    { value: "web-design", label: t("reasonWebDesign") },
    { value: "mobile-app-design", label: t("reasonMobileApp") },
    { value: "consulting", label: t("reasonConsulting") },
    { value: "other", label: t("reasonOther") },
  ];

  const toggleReason = (value: string) => {
    setReasons((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
    );
  };

  const handleSlider1 = (v: number) => {
    if (slider2 - v <= 0) setSlider2(v);
    setSlider1(v);
  };
  const handleSlider2 = (v: number) => {
    if (v - slider1 <= 0) setSlider1(v);
    setSlider2(v);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    else if (!emailRegex.test(email)) newErrors.email = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setSending(true);
    try {
      const res = await feedbackApi.submitContact({
        name: name.trim(),
        email: email.trim(),
        contactReasons: reasons.length ? reasons : null,
        budgetMin: slider1,
        budgetMax: slider2,
        question: question.trim() || null,
      });
      if (!res.ok) {
        toast.error(t("errorMsg"));
        return;
      }
      toast.success(t("successMsg"));
      setName("");
      setEmail("");
      setQuestion("");
      setReasons([]);
      setSlider1(10000);
      setSlider2(50000);
    } catch {
      toast.error(t("networkError"));
    } finally {
      setSending(false);
    }
  };

  const inputBase =
    "w-full rounded-xl bg-[#080808] px-5 py-4 text-sm text-foreground outline-none border border-[#1a1a1a] transition-all duration-300 focus:border-dark-violet/40 focus:shadow-[0_0_0_3px_rgba(117,99,206,0.06)] placeholder:text-[#666] resize-none md:text-base";

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-6 lg:gap-8 lg:p-10">
      <form id="qaForm" className="flex w-full flex-col gap-5" noValidate>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="q-name"
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#888]"
            >
              {t("nameLabel")}
            </label>
            <input
              className={`${inputBase} ${errors.name ? "!border-red-500/50" : ""}`}
              type="text"
              id="q-name"
              name="name"
              placeholder={t("namePlaceholder")}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: false }));
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="q-email"
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#888]"
            >
              {t("emailLabel")}
            </label>
            <input
              type="email"
              id="q-email"
              name="email"
              className={`${inputBase} ${errors.email ? "!border-red-500/50" : ""}`}
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: false }));
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#888]">
            {t("purposeLabel")}
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {CONTACT_REASONS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => toggleReason(r.value)}
                className={`cursor-pointer rounded-lg border px-3 py-2.5 text-xs transition-all duration-200 md:text-sm ${
                  reasons.includes(r.value)
                    ? "border-dark-violet/40 bg-dark-violet/8 text-violet"
                    : "border-[#1a1a1a] text-[#888] hover:border-[#2a2a2a] hover:text-[#bbb]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#888]">
            {t("budgetLabel")}
          </label>
          <BudgetSlider
            valueLeft={slider1}
            valueRight={slider2}
            onValueLeftChange={handleSlider1}
            onValueRightChange={handleSlider2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="q-question"
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#888]"
          >
            {t("messageLabel")}
          </label>
          <textarea
            className={inputBase}
            id="q-question"
            name="question"
            rows={4}
            placeholder={t("messagePlaceholder")}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="w-full cursor-pointer rounded-xl bg-dark-violet px-6 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-dark outline-none border-none transition-all duration-300 hover:bg-primary-hover disabled:opacity-50"
          onClick={handleSubmit}
          disabled={sending}
        >
          {sending ? t("sending") : t("submit")}
        </button>
      </form>
    </div>
  );
}
