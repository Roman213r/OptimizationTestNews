import type { Article } from "@/types/news";
import { formatShortDate } from "@/lib/news";

export function Ticker({ items }: { items: Article[] }) {
  const line = items
    .map(
      (item) =>
        `${formatShortDate(item.publishedAt)}  ·  ${item.hardware}  ·  ${item.title}`,
    )
    .join("     ///     ");

  return (
    <div className="overflow-hidden border-b border-white/8 bg-[#0b0c0e]">
      <div className="ticker flex whitespace-nowrap py-2 font-mono text-[11px] tracking-[0.14em] text-white/55 uppercase">
        <span className="px-8">{line}</span>
        <span className="px-8" aria-hidden>
          {line}
        </span>
      </div>
    </div>
  );
}
