import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NewsFeed } from "@/components/NewsFeed";
import type { Article } from "@/types/news";

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
  it("показує всі матеріали за замовчуванням", () => {
    render(<NewsFeed articles={sample} />);
    expect(screen.getByText("FSD оновлення для HW4")).toBeDefined();
    expect(screen.getByText("Cybercab у Далласі")).toBeDefined();
    expect(screen.getByText("Чип AI5 для Optimus")).toBeDefined();
  });

  it("фільтрує стрічку за категорією", async () => {
    const user = userEvent.setup();
    render(<NewsFeed articles={sample} />);

    await user.click(screen.getByRole("button", { name: "Robotaxi" }));

    expect(screen.getByText("Cybercab у Далласі")).toBeDefined();
    expect(screen.queryByText("FSD оновлення для HW4")).toBeNull();
    expect(screen.queryByText("Чип AI5 для Optimus")).toBeNull();
  });

  it("шукає за назвою і показує порожній стан", async () => {
    const user = userEvent.setup();
    render(<NewsFeed articles={sample} />);

    await user.type(screen.getByRole("textbox", { name: "Пошук у стрічці" }), "AI5");

    expect(screen.getByText("Чип AI5 для Optimus")).toBeDefined();
    expect(screen.queryByText("Cybercab у Далласі")).toBeNull();

    await user.clear(screen.getByRole("textbox", { name: "Пошук у стрічці" }));
    await user.type(screen.getByRole("textbox", { name: "Пошук у стрічці" }), "zzz");

    expect(
      screen.getByText("У цій смузі сигналу порожньо. Зніміть фільтр або змініть запит."),
    ).toBeDefined();
  });
});
