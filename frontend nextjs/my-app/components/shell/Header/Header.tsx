"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Logo } from "@/components/shell/Logo";
import { BurgerButton } from "@/components/shell/BurgerButton";
import { NavBar } from "@/components/shell/NavBar";
import { Link, usePathname } from "@/i18n/navigation";

const LOCALES = ["en", "sk", "ru", "de"] as const;

export function Header() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const restoreScrollOnCloseRef = useRef(true);
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (!burgerOpen) return;
    restoreScrollOnCloseRef.current = true;
    scrollPositionRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = "100%";
    return () => {
      const top = scrollPositionRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (restoreScrollOnCloseRef.current) {
        window.scrollTo({ top, behavior: "instant" });
      }
      restoreScrollOnCloseRef.current = true;
    };
  }, [burgerOpen]);

  const localeSwitcher = (className: string) => (
    <div className={className}>
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={`rounded px-2 py-1 text-[11px] uppercase tracking-wide transition-colors ${
            locale === l ? "bg-dark-violet text-dark" : "text-[#aaa] hover:text-foreground"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="z-[1000] flex w-full min-h-16 flex-wrap items-center justify-between gap-4 border-b border-border-gray bg-header px-4 py-3 font-mono backdrop-blur-[12px] md:px-6">
      <Logo />

      <NavBar
        onNavClick={() => {
          restoreScrollOnCloseRef.current = false;
          setBurgerOpen(false);
        }}
        className="hidden md:flex"
      />

      {localeSwitcher("hidden items-center gap-1 rounded-lg border border-border-gray bg-[#121212] p-1 md:flex")}

      <BurgerButton
        open={burgerOpen}
        onToggle={() => setBurgerOpen((v) => !v)}
      />

      {burgerOpen && (
        <>
          {localeSwitcher("mt-1 flex w-full items-center justify-center gap-2 border-t border-border-gray pt-2 md:hidden")}
          <NavBar
            onNavClick={() => {
              restoreScrollOnCloseRef.current = false;
              setBurgerOpen(false);
            }}
            className="flex w-full flex-col items-stretch gap-1 pt-2 md:hidden"
          />
        </>
      )}
    </header>
  );
}
