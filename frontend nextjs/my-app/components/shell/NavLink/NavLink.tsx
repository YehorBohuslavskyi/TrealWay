"use client";

import { scrollToSection } from "@/shared";

type Props = {
  section: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function NavLink({ section, className, children, onClick }: Props) {
  const handleClick = () => {
    onClick?.();
    // On mobile we close burger menu first (which unlocks body scroll),
    // then perform section scroll on the next frame.
    requestAnimationFrame(() => {
      setTimeout(() => scrollToSection(section), 0);
    });
  };

  return (
    <button
      type="button"
      className={`cursor-pointer text-left ${className ?? ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
