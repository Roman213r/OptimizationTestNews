import { describe, expect, it } from "vitest";
import { articles } from "@/data/news";
import {
  filterArticles,
  formatDate,
  formatShortDate,
  getArticle,
  getArticles,
  getCategoryLabel,
  getFeaturedArticle,
  getRelated,
} from "@/lib/news";

describe("getArticles", () => {
  it("повертає матеріали від новіших до старіших", () => {
    const dates = getArticles().map((article) => article.publishedAt);
    const sorted = [...dates].sort(
      (a, b) => Date.parse(b) - Date.parse(a),
    );
    expect(dates).toEqual(sorted);
  });

  it("не копіює масив на кожен виклик", () => {
    expect(getArticles()).toBe(getArticles());
  });
});

describe("getFeaturedArticle", () => {
  it("повертає статтю з позначкою featured", () => {
    const featured = getFeaturedArticle();
    expect(featured.featured).toBe(true);
    expect(featured.slug).toBe("fsd-14-3-mlir");
  });
});

describe("getArticle", () => {
  it("знаходить матеріал за slug", () => {
    expect(getArticle("cybercab-dallas")?.title).toMatch(/Cybercab/);
  });

  it("повертає undefined, якщо slug невідомий", () => {
    expect(getArticle("no-such-story")).toBeUndefined();
  });
});

describe("getRelated", () => {
  it("не включає поточну статтю і тримає ліміт", () => {
    const related = getRelated("fsd-14-3-mlir", 3);
    expect(related).toHaveLength(3);
    expect(related.every((article) => article.slug !== "fsd-14-3-mlir")).toBe(
      true,
    );
  });

  it("спочатку ставить матеріали тієї ж категорії", () => {
    const related = getRelated("fsd-14-3-mlir", 2);
    expect(related[0]?.category).toBe("fsd");
  });
});

describe("filterArticles", () => {
  it("за категорією лишає лише robotaxi", () => {
    const filtered = filterArticles(articles, { category: "robotaxi" });
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((article) => article.category === "robotaxi")).toBe(
      true,
    );
  });

  it("шукає за назвою, залізом і версією", () => {
    expect(filterArticles(articles, { query: "AI5" }).map((a) => a.slug)).toContain(
      "ai5-chip",
    );
    expect(
      filterArticles(articles, { query: "2026.38.5" }).every((article) =>
        article.version?.includes("2026.38.5"),
      ),
    ).toBe(true);
  });

  it("повертає той самий масив, якщо фільтр порожній", () => {
    expect(filterArticles(articles)).toBe(articles);
  });
});

describe("formatDate", () => {
  it("форматує українською без прив’язки до локалі браузера", () => {
    expect(formatDate("2026-10-24T08:30:00.000Z")).toBe("24 жовтня 2026");
    expect(formatShortDate("2026-10-24T08:30:00.000Z")).toBe("24 жовт.");
  });
});

describe("getCategoryLabel", () => {
  it("повертає підпис категорії", () => {
    expect(getCategoryLabel("energy")).toBe("Енергія");
  });
});
