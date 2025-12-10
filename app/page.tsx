import { getArticles, getCategories, getTrendingTopics } from '@/lib/cosmic'
import { Article, Category, TrendingTopic } from '@/types'
import ArticleCard from '@/components/ArticleCard'
import TrendingWidget from '@/components/TrendingWidget'
import NewsletterForm from '@/components/NewsletterForm'
import CategoryNav from '@/components/CategoryNav'
import Hero from '@/components/Hero'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const { objects: articles, total } = await getArticles(13)
  const categories = await getCategories()
  const trendingTopics = await getTrendingTopics(5)
  
  if (!articles || articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600 dark:text-gray-400">
          No articles available yet. Check back soon!
        </p>
      </div>
    )
  }
  
  const [heroArticle, ...gridArticles] = articles
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {heroArticle && <Hero article={heroArticle as Article} />}
      
      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Articles Grid */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {gridArticles.map((article: Article) => (
                <ArticleCard key={article.id} article={article as Article} />
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Trending Topics */}
              {trendingTopics.length > 0 && (
                <TrendingWidget topics={trendingTopics as TrendingTopic[]} />
              )}
              
              {/* Newsletter */}
              <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Subscribe to Newsletter</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Get the latest AI-curated tech news delivered to your inbox weekly.
                </p>
                <NewsletterForm />
              </div>
              
              {/* Categories */}
              {categories.length > 0 && (
                <CategoryNav categories={categories as Category[]} />
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}