import { describe, expect, it } from "vitest";
import { articles, categories } from "@/data/news";

describe("стрічка новин", () => {
  it("має унікальні slug, одну featured-статтю і валідні поля", () => {
    const slugs = articles.map((article) => article.slug);
    const known = new Set(categories.map((category) => category.id));

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(articles.filter((article) => article.featured)).toHaveLength(1);

    for (const article of articles) {
      expect(article.title.length).toBeGreaterThan(0);
      expect(article.body.length).toBeGreaterThan(0);
      expect(article.author.length).toBeGreaterThan(0);
      expect(Date.parse(article.publishedAt)).not.toBeNaN();
      expect(known.has(article.category)).toBe(true);
    }
  });
});
