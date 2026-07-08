"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/landing/ProjectCard";
import { ScrollReveal } from "@/components/ui";
import { PROJECTS } from "@/shared";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Projects() {
  const t = useTranslations("projectsSection");

  return (
    <ScrollReveal
      as="section"
      className="projects flex w-full min-w-0 flex-col gap-6 md:gap-10"
    >
      <div className="text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-dark-violet md:text-sm">
          {t("label")}
        </span>
        <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight md:text-5xl">
          {t("titleStart")}{" "}
          <span className="text-gradient-violet">{t("titleAccent")}</span>
        </h2>
      </div>
      <motion.div
        className="flex w-full min-w-0 flex-col gap-4 md:gap-5"
        variants={stagger}
      >
        {PROJECTS.map((p) => (
          <motion.div key={p.name} variants={item}>
            <ProjectCard
              name={p.name}
              category={p.category}
              liveProduct={p.liveProduct}
              description={p.description}
              image={p.image}
              href={p.href}
              tags={p.tags}
            />
          </motion.div>
        ))}
      </motion.div>
    </ScrollReveal>
  );
}
