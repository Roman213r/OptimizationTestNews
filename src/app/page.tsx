import { FeaturedStory } from "@/components/FeaturedStory";
import { NewsFeed } from "@/components/NewsFeed";
import { SignalStats } from "@/components/SignalStats";
import { Ticker } from "@/components/Ticker";
import { getArticles, getFeaturedArticle } from "@/lib/news";

export default async function Home() {
  "use cache";

  const articles = getArticles();
  const featured = getFeaturedArticle();
  const rest = articles.filter((article) => article.slug !== featured.slug);

  return (
    <main className="flex-1">
      <Ticker items={articles} />
      <FeaturedStory article={featured} />
      <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <SignalStats />
      </div>
      <NewsFeed articles={rest} />
    </main>
  );
}
