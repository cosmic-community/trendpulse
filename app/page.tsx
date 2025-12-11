import { getArticles, getCategories, getTrendingTopics } from '@/lib/cosmic'
import { Article, Category, TrendingTopic } from '@/types'
import ArticleCard from '@/components/ArticleCard'
import TrendingWidget from '@/components/TrendingWidget'
import NewsletterForm from '@/components/NewsletterForm'
import CategoryNav from '@/components/CategoryNav'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import CTABanner from '@/components/CTABanner'
import { Metadata } from 'next'

export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://trendpulsedaily.com',
  },
}

export default async function HomePage() {
  // Changed: Fixed article fetching to properly destructure the response
  const articlesResponse = await getArticles(13)
  const articles = articlesResponse.objects
  const total = articlesResponse.total
  
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
      
      {/* Social Proof Banner */}
      <SocialProof />
      
      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Articles Grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Latest Tech News</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {total} articles available
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {gridArticles.map((article: Article) => (
                <ArticleCard key={article.id} article={article as Article} />
              ))}
            </div>
            
            {/* Mid-content CTA */}
            <div className="mt-12">
              <CTABanner />
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Newsletter - Most Prominent */}
              <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 dark:from-primary/20 dark:to-blue-600/20 border-2 border-primary/20 dark:border-primary/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">Join 10,000+ Subscribers</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Get Weekly AI Tech Insights</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Free weekly roundup of the most important tech stories. No spam, unsubscribe anytime.
                </p>
                <NewsletterForm />
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                  🔒 We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
              
              {/* Trending Topics */}
              {trendingTopics.length > 0 && (
                <TrendingWidget topics={trendingTopics as TrendingTopic[]} />
              )}
              
              {/* Categories */}
              {categories.length > 0 && (
                <CategoryNav categories={categories as Category[]} />
              )}
              
              {/* Sponsored/Affiliate Section */}
              <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
                <div className="text-xs text-gray-500 dark:text-gray-500 mb-3 uppercase tracking-wide">
                  Sponsored
                </div>
                <h4 className="font-bold mb-2">Recommended Tools</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Discover the best AI and tech tools to boost your productivity.
                </p>
                <a 
                  href="#" 
                  className="inline-block text-sm font-semibold text-primary hover:underline"
                  rel="sponsored noopener"
                >
                  Explore Tools →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}