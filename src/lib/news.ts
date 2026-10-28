import { articles, categories } from "@/data/news";
import type { Article, CategoryId } from "@/types/news";

export type ArticleFilter = {
  category?: "all" | CategoryId;
  query?: string;
};

const sortedArticles: Article[] = [...articles].sort(
  (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
);

const articlesBySlug = new Map(
  articles.map((article) => [article.slug, article]),
);

const categoryLabels = new Map(
  categories.map((category) => [category.id, category.label]),
);

const featuredArticle =
  articles.find((article) => article.featured) ?? sortedArticles[0];

export function getArticles(): Article[] {
  return sortedArticles;
}

export function getFeaturedArticle(): Article {
  return featuredArticle;
}

export function getArticle(slug: string): Article | undefined {
  return articlesBySlug.get(slug);
}

export function getRelated(slug: string, limit = 3): Article[] {
  const current = articlesBySlug.get(slug);
  if (!current) return sortedArticles.slice(0, limit);

  const related: Article[] = [];
  for (const article of articles) {
    if (article.slug !== slug && article.category === current.category) {
      related.push(article);
      if (related.length === limit) return related;
    }
  }
  for (const article of articles) {
    if (article.slug !== slug && article.category !== current.category) {
      related.push(article);
      if (related.length === limit) return related;
    }
  }
  return related;
}

export function getCategoryLabel(id: CategoryId): string {
  return categoryLabels.get(id) ?? id;
}

export function filterArticles(
  items: Article[],
  { category = "all", query = "" }: ArticleFilter = {},
): Article[] {
  const needle = query.trim().toLowerCase();
  if (category === "all" && needle.length === 0) return items;

  return items.filter((article) => {
    if (category !== "all" && article.category !== category) return false;
    if (needle.length === 0) return true;
    return (
      article.title.toLowerCase().includes(needle) ||
      article.excerpt.toLowerCase().includes(needle) ||
      article.hardware.toLowerCase().includes(needle) ||
      (article.version ?? "").toLowerCase().includes(needle)
    );
  });
}

const months = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

const monthsShort = [
  "січ.",
  "лют.",
  "бер.",
  "квіт.",
  "трав.",
  "черв.",
  "лип.",
  "серп.",
  "вер.",
  "жовт.",
  "лист.",
  "груд.",
];

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${day} ${monthsShort[date.getUTCMonth()]}`;
}
