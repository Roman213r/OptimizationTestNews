import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverArt } from "@/components/CoverArt";
import { NewsCard } from "@/components/NewsCard";
import { articles } from "@/data/news";
import {
  formatDate,
  getArticle,
  getCategoryLabel,
  getRelated,
} from "@/lib/news";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Матеріал не знайдено" };
  }
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function NewsArticlePage({
  params,
}: PageProps<"/news/[slug]">) {
  return (
    <Suspense fallback={<ArticleFallback />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

async function ArticleContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getArticle(slug)) notFound();
  return <CachedArticle slug={slug} />;
}

async function CachedArticle({ slug }: { slug: string }) {
  "use cache";

  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelated(article.slug);

  return (
    <main className="flex-1">
      <article className="mx-auto w-full max-w-4xl px-4 pt-8 pb-16 sm:px-6">
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[0.24em] text-white/40 uppercase hover:text-white"
        >
          ← До стрічки
        </Link>
        <div className="mt-6 overflow-hidden border border-white/10">
          <CoverArt article={article} size="banner" />
        </div>
        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
          <span className="text-[#e31937]">
            {getCategoryLabel(article.category)}
          </span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.hardware}</span>
          {article.version ? <span>{article.version}</span> : null}
          <span>{article.readMinutes} хв читання</span>
        </div>
        <h1 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-white/60">{article.excerpt}</p>
        <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-white/35 uppercase">
          {article.author} · {article.location}
        </p>
        <div className="mt-10 space-y-6 text-base leading-8 text-white/78">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </article>
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <p className="mb-4 font-mono text-[10px] tracking-[0.28em] text-white/40 uppercase">
          Суміжні сигнали
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <NewsCard key={item.slug} article={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ArticleFallback() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pt-8 sm:px-6">
      <div className="h-3 w-28 bg-white/10" />
      <div className="mt-6 h-72 border border-white/10 bg-white/5 sm:h-96" />
      <div className="mt-8 h-8 w-3/4 bg-white/10" />
      <div className="mt-4 h-4 w-full bg-white/5" />
      <div className="mt-2 h-4 w-5/6 bg-white/5" />
    </main>
  );
}
