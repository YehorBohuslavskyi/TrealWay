"use client";

import { scrollToSection } from "@/shared";

type Props = {
  section: string;
  className?: string;
  children: React.ReactNode;
  as?: "a" | "button" | "span";
  onClick?: () => void;
};

export function ScrollToSection({ section, className, children, as: As = "a", onClick }: Props) {
  const handleClick = () => {
    scrollToSection(section);
    onClick?.();
  };
  return (
    <As className={className} onClick={handleClick} role="button">
      {children}
    </As>
  );
}
