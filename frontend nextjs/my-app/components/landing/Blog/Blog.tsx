"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui";
import { BLOG_ARTICLE_IDS, BLOG_ARTICLE_IMAGES } from "@/shared";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Blog() {
  const t = useTranslations("blog");

  const articles = BLOG_ARTICLE_IDS.map((id, i) => ({
    id,
    title: t(`a${i + 1}Title`),
    excerpt: t(`a${i + 1}Excerpt`),
    category: t(`a${i + 1}Category`),
    date: t(`a${i + 1}Date`),
    readTime: t(`a${i + 1}ReadTime`),
    image: BLOG_ARTICLE_IMAGES[i],
  }));

  return (
    <ScrollReveal
      as="section"
      className="blog flex w-full min-w-0 flex-col gap-6 md:gap-10"
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
        className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
        variants={stagger}
      >
        {articles.map((article) => (
          <motion.div key={article.id} variants={item}>
            <Link
              href={`/blog/${article.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] no-underline transition-all duration-300 hover:border-dark-violet/25"
            >
              <div className="relative h-[180px] w-full overflow-hidden md:h-[200px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-dark-violet/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-violet backdrop-blur-sm">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-[#666]">
                  <span>{article.date}</span>
                  <span className="h-0.5 w-0.5 rounded-full bg-[#444]" />
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground md:text-lg">
                  {article.title}
                </h3>

                <p className="line-clamp-3 text-sm leading-relaxed text-[#aaa]">
                  {article.excerpt}
                </p>

                <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-dark-violet transition-colors group-hover:text-violet">
                  {t("readArticle")}
                  <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </ScrollReveal>
  );
}
