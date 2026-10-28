import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NewsFeed } from "@/components/NewsFeed";
import type { Article } from "@/types/news";

vi.mock("@/components/CoverArt", () => ({
  CoverArt: () => <div data-testid="cover" />,
}));

const sample: Article[] = [
  {
    slug: "fsd-sample",
    title: "FSD оновлення для HW4",
    excerpt: "Автопілот став спокійнішим.",
    publishedAt: "2026-10-24T08:30:00.000Z",
    readMinutes: 4,
    category: "fsd",
    hardware: "HW4",
    version: "2026.38.5",
    motif: "radar",
    author: "Тест",
    location: "Остін",
    body: ["Текст"],
  },
  {
    slug: "cab-sample",
    title: "Cybercab у Далласі",
    excerpt: "Роботаксі без керма.",
    publishedAt: "2026-10-22T16:40:00.000Z",
    readMinutes: 5,
    category: "robotaxi",
    hardware: "Cybercab",
    motif: "cab",
    author: "Тест",
    location: "Даллас",
    body: ["Текст"],
  },
  {
    slug: "ai5-sample",
    title: "Чип AI5 для Optimus",
    excerpt: "У десять разів більше обчислень.",
    publishedAt: "2026-10-20T10:10:00.000Z",
    readMinutes: 3,
    category: "hardware",
    hardware: "AI5",
    motif: "grid",
    author: "Тест",
    location: "Техас",
    body: ["Текст"],
  },
];

describe("NewsFeed", () => {
  it("фільтрує за категорією і шукає за запитом", () => {
    render(<NewsFeed articles={sample} />);

    expect(screen.getByText("FSD оновлення для HW4")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "Robotaxi" }));
    expect(screen.getByText("Cybercab у Далласі")).toBeDefined();
    expect(screen.queryByText("FSD оновлення для HW4")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Усе" }));
    const search = screen.getByRole("textbox", { name: "Пошук у стрічці" });
    fireEvent.change(search, { target: { value: "AI5" } });
    expect(screen.getByText("Чип AI5 для Optimus")).toBeDefined();
    expect(screen.queryByText("Cybercab у Далласі")).toBeNull();

    fireEvent.change(search, { target: { value: "zzz" } });
    expect(
      screen.getByText(
        "У цій смузі сигналу порожньо. Зніміть фільтр або змініть запит.",
      ),
    ).toBeDefined();
  });
});
