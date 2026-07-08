"use client";

import { motion, type Variant } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";
type TagName = "div" | "section" | "span" | "article" | "footer" | "header";

type Props = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  threshold?: number;
  as?: TagName;
};

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

const motionComponents = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  article: motion.article,
  footer: motion.footer,
  header: motion.header,
} as const;

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
  threshold = 0.15,
  as = "div",
}: Props) {
  const offset = offsets[direction];
  const Component = motionComponents[as];

  const hidden: Variant = {
    opacity: 0,
    x: offset.x * distance,
    y: offset.y * distance,
  };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  };

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={{ hidden, visible }}
    >
      {children}
    </Component>
  );
}
