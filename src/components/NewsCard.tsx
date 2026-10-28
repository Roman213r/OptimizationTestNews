import Link from "next/link";
import { CoverArt } from "@/components/CoverArt";
import { formatDate, getCategoryLabel } from "@/lib/news";
import type { Article } from "@/types/news";

export function NewsCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className={`group flex flex-col border border-white/10 bg-[#0c0d10] transition-[border-color,transform] hover:border-white/30 ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <CoverArt
        article={article}
        size={featured ? "wide" : "card"}
        className={featured ? "md:w-[46%] md:self-stretch" : ""}
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
          <span className="text-[#e31937]">{getCategoryLabel(article.category)}</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readMinutes} хв</span>
        </div>
        <h3
          className={`font-display leading-tight text-white group-hover:text-white ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {article.title}
        </h3>
        <p className="text-sm leading-6 text-white/55">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
          <span>{article.author}</span>
          <span className="text-white/70">{article.hardware}</span>
        </div>
      </div>
    </Link>
  );
}
