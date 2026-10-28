"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "@/components/NewsCard";
import { categories } from "@/data/news";
import type { Article, CategoryId } from "@/types/news";

type Filter = "all" | CategoryId;

export function NewsFeed({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const byCategory = filter === "all" || article.category === filter;
      const byQuery =
        needle.length === 0 ||
        article.title.toLowerCase().includes(needle) ||
        article.excerpt.toLowerCase().includes(needle) ||
        article.hardware.toLowerCase().includes(needle) ||
        (article.version ?? "").toLowerCase().includes(needle);
      return byCategory && byQuery;
    });
  }, [articles, filter, query]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <div className="mb-8 flex flex-col gap-5 border-y border-white/8 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="Усе"
          />
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              active={filter === category.id}
              onClick={() => setFilter(category.id)}
              label={category.label}
            />
          ))}
        </div>
        <label className="relative block w-full lg:max-w-xs">
          <span className="sr-only">Пошук у стрічці</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Пошук: FSD, AI5, Cybercab..."
            className="w-full border border-white/12 bg-transparent px-3 py-2 font-mono text-xs tracking-wide text-white outline-none placeholder:text-white/30 focus:border-[#e31937]"
          />
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="border border-dashed border-white/15 px-4 py-16 text-center text-white/45">
          У цій смузі сигналу порожньо. Зніміть фільтр або змініть запит.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((article, index) => (
            <div
              key={article.slug}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <NewsCard article={article} featured={index === 0} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors ${
        active
          ? "border-[#e31937] bg-[#e31937] text-white"
          : "border-white/12 text-white/55 hover:border-white/40 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
