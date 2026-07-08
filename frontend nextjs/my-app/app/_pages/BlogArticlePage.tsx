"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components";

type Props = {
  articleIndex: number;
  image: string;
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  },
});

export default function BlogArticlePage({ articleIndex, image }: Props) {
  const t = useTranslations("blog");
  const n = articleIndex;

  const title = t(`a${n}Title`);
  const excerpt = t(`a${n}Excerpt`);
  const category = t(`a${n}Category`);
  const date = t(`a${n}Date`);
  const readTime = t(`a${n}ReadTime`);
  const body = [1, 2, 3, 4].map((b) => t(`a${n}Body${b}`));

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[1000] w-full">
        <Header />
      </div>
      <div className="h-16 shrink-0" aria-hidden />

      <motion.article
        className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 md:px-8 md:py-16"
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp(0)}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#888] transition-colors hover:text-dark-violet"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t("backToHome")}
          </Link>
        </motion.div>

        <motion.div className="flex flex-col gap-4" variants={fadeUp(0.05)}>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-[#666]">
            <span className="rounded-full bg-dark-violet/15 px-3 py-1 text-dark-violet">
              {category}
            </span>
            <span>{date}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-[#444]" />
            <span>{readTime}</span>
          </div>

          <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="text-base leading-relaxed text-[#aaa] md:text-lg">
            {excerpt}
          </p>
        </motion.div>

        <motion.div
          className="relative h-[250px] w-full overflow-hidden rounded-2xl md:h-[360px]"
          variants={fadeUp(0.1)}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
        </motion.div>

        <motion.div
          className="flex flex-col gap-6"
          variants={fadeUp(0.15)}
        >
          {body.map((paragraph, i) => (
            <p key={i} className="text-base leading-[1.8] text-[#ccc] md:text-[17px]">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div
          className="mt-4 border-t border-[#1a1a1a] pt-8"
          variants={fadeUp(0.2)}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-dark-violet transition-colors hover:text-violet"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t("backToArticles")}
          </Link>
        </motion.div>
      </motion.article>
    </>
  );
}
