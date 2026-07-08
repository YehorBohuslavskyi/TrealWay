"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Props = {
  name: string;
  category: string;
  liveProduct: string;
  description: string;
  image: string;
  href?: string;
  tags: string[];
};

export function ProjectCard({ name, category, liveProduct, description, image, href, tags }: Props) {
  const t = useTranslations("projectsSection");
  const isActive = liveProduct === "Active";

  return (
    <motion.div
      className="group flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] transition-all duration-300 hover:border-dark-violet/25 lg:flex-row"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative w-full overflow-hidden lg:w-[44%] lg:shrink-0">
        <Image
          src={image}
          alt={name}
          width={600}
          height={400}
          className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[240px] lg:h-full"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5 md:p-6 lg:p-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold uppercase tracking-tight md:text-2xl">
            {name}
          </h3>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#151515] px-3 py-1 text-xs text-[#aaa]">
              {category}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-dark-violet/8 text-dark-violet"
              }`}
            >
              {liveProduct}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[#aaa] md:text-[15px]">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#1a1a1a] px-2.5 py-0.5 font-mono text-[10px] text-[#888]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-dark-violet py-3 font-mono text-sm font-semibold uppercase tracking-wider text-dark transition-all duration-300 hover:bg-primary-hover md:w-auto md:px-8"
          >
            {t("visitWebsite")}
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        ) : (
          <button
            type="button"
            className="mt-1 flex w-full cursor-pointer items-center justify-center rounded-xl bg-dark-violet py-3 font-mono text-sm font-semibold uppercase tracking-wider text-dark transition-all duration-300 hover:bg-primary-hover md:w-auto md:px-8"
          >
            {t("requestDemo")}
          </button>
        )}
      </div>
    </motion.div>
  );
}
