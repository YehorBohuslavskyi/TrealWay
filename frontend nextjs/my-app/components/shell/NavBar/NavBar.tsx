"use client";

import { useTranslations } from "next-intl";
import { NavLink } from "@/components/shell/NavLink";
import { NAV_LINKS } from "@/shared";

type Props = {
  onNavClick?: () => void;
  className?: string;
};

const variantClasses: Record<string, string> = {
  home: "text-logo hover:bg-logo/15",
  nav: "text-light-gray hover:bg-btn-hover hover:text-btn-text-hover",
  contact: "bg-primary-idle text-primary-text hover:bg-primary-hover",
};

export function NavBar({ onNavClick, className }: Props) {
  const t = useTranslations("nav");

  return (
    <nav className={`flex items-center gap-2 flex-wrap justify-end ${className ?? ""}`}>
      {NAV_LINKS.map(({ section, variant }) => (
        <NavLink
          key={section}
          section={section}
          className={`inline-block rounded-lg px-4 py-2.5 text-sm font-medium uppercase tracking-wide whitespace-nowrap transition-colors duration-200 ${variantClasses[variant]}`}
          onClick={onNavClick}
        >
          {t(section)}
        </NavLink>
      ))}
    </nav>
  );
}
