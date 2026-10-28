import { describe, expect, it } from "vitest";
import { articles, categories } from "@/data/news";

describe("стрічка новин", () => {
  it("має унікальні slug", () => {
    const slugs = articles.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("має рівно одну featured-статтю", () => {
    expect(articles.filter((article) => article.featured)).toHaveLength(1);
  });

  it("кожен матеріал має текст, автора і дату", () => {
    for (const article of articles) {
      expect(article.title.length).toBeGreaterThan(0);
      expect(article.body.length).toBeGreaterThan(0);
      expect(article.author.length).toBeGreaterThan(0);
      expect(Number.isNaN(Date.parse(article.publishedAt))).toBe(false);
    }
  });

  it("категорії покривають усі матеріали", () => {
    const known = new Set(categories.map((category) => category.id));
    for (const article of articles) {
      expect(known.has(article.category)).toBe(true);
    }
  });
});
