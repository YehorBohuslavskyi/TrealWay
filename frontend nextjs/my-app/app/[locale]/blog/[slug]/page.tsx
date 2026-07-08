import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_ARTICLE_IDS, BLOG_ARTICLE_IMAGES } from "@/shared";
import BlogArticlePage from "@/app/_pages/BlogArticlePage";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const idx = BLOG_ARTICLE_IDS.indexOf(slug);
  if (idx === -1) return { title: "Article Not Found — TrealWay" };
  return {
    title: "TrealWay Blog",
    description: "TrealWay blog article",
  };
}

export function generateStaticParams() {
  return BLOG_ARTICLE_IDS.map((id) => ({ slug: id }));
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const idx = BLOG_ARTICLE_IDS.indexOf(slug);
  if (idx === -1) notFound();
  return <BlogArticlePage articleIndex={idx + 1} image={BLOG_ARTICLE_IMAGES[idx]} />;
}
