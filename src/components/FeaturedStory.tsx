import Link from "next/link";
import { CoverArt } from "@/components/CoverArt";
import { formatDate, getCategoryLabel } from "@/lib/news";
import type { Article } from "@/types/news";

export function FeaturedStory({ article }: { article: Article }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-8 pb-6 sm:px-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.32em] text-[#e31937] uppercase">
            Провідний сигнал
          </p>
          <h1 className="mt-2 font-display text-3xl tracking-wide sm:text-5xl">
            Оновлення Tesla
          </h1>
        </div>
        <p className="hidden max-w-xs text-right text-sm text-white/45 sm:block">
          Розумні прилади, автопілот, чипи, гуманоїди й енергія — одним пульсом.
        </p>
      </div>
      <Link
        href={`/news/${article.slug}`}
        className="group grid overflow-hidden border border-white/10 bg-[#0c0d10] lg:grid-cols-[1.15fr_0.85fr]"
      >
        <CoverArt article={article} size="hero" />
        <div className="flex flex-col justify-end gap-5 p-6 sm:p-10">
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.22em] text-white/50 uppercase">
            <span className="text-[#e31937]">
              {getCategoryLabel(article.category)}
            </span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>{article.version}</span>
          </div>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            {article.title}
          </h2>
          <p className="max-w-lg text-base leading-7 text-white/60">
            {article.excerpt}
          </p>
          <span className="font-mono text-[11px] tracking-[0.24em] text-white uppercase">
            Читати досьє →
          </span>
        </div>
      </Link>
    </section>
  );
}
