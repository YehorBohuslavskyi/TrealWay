"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { StatItem } from "@/components/landing/StatItem";

const STAT_KEYS = [
  { key: "clients", value: "220+" },
  { key: "projects", value: "100+" },
  { key: "happyClients", value: "100%" },
  { key: "followers", value: "100k" },
  { key: "experience", value: "10+" },
] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function StatsBar() {
  const t = useTranslations("stats");

  return (
    <motion.div
      className="grid w-full min-w-0 grid-cols-2 gap-2 md:gap-3 lg:grid-cols-5"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {STAT_KEYS.map(({ key, value }) => (
        <motion.div key={key} variants={item}>
          <StatItem title={t(key)} value={value} />
        </motion.div>
      ))}
    </motion.div>
  );
}
