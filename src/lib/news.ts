import { articles, categories } from "@/data/news";
import type { Article, CategoryId } from "@/types/news";

export function getArticles(): Article[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getFeaturedArticle(): Article {
  return articles.find((article) => article.featured) ?? getArticles()[0];
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelated(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return getArticles().slice(0, limit);

  const sameCategory = articles.filter(
    (article) =>
      article.slug !== slug && article.category === current.category,
  );
  const rest = articles.filter(
    (article) =>
      article.slug !== slug && article.category !== current.category,
  );

  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategoryLabel(id: CategoryId): string {
  return categories.find((category) => category.id === id)?.label ?? id;
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
