import Link from 'next/link'
import { Article } from '@/types'
import { formatDate } from '@/lib/utils'
import CategoryBadge from './CategoryBadge'
import TrendingIndicator from './TrendingIndicator'

export default function Hero({ article }: { article: Article }) {
  if (!article) return null
  
  // Safe access to first category with null check
  const firstCategory = article.metadata.categories?.[0]
  
  return (
    <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image or Gradient */}
      {article.metadata.featured_image ? (
        <div className="absolute inset-0">
          <img
            src={`${article.metadata.featured_image.imgix_url}?w=2400&h=1400&fit=crop&auto=format,compress`}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          {/* Changed: Adjusted gradient for better visibility in both light and dark modes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 dark:from-black/80 dark:via-black/40 dark:to-transparent" />
        </div>
      ) : (
        // Changed: Added elegant dark gradient background when no featured image
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
          {/* Overlay pattern for texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
        <div className="max-w-4xl text-white">
          {/* Categories & Trending */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {firstCategory && (
              <CategoryBadge category={firstCategory} />
            )}
            {article.metadata.trending_score && article.metadata.trending_score > 80 && (
              <TrendingIndicator score={article.metadata.trending_score} />
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
            <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
              {article.title}
            </Link>
          </h1>
          
          {/* Excerpt */}
          {article.metadata.excerpt && (
            <p className="text-xl lg:text-2xl text-gray-100 mb-6 max-w-3xl drop-shadow-md">
              {article.metadata.excerpt}
            </p>
          )}
          
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-200">
            <span>{formatDate(article.metadata.publish_date)}</span>
            {article.metadata.view_count != null && article.metadata.view_count > 0 && (
              <>
                <span>•</span>
                <span>{article.metadata.view_count.toLocaleString()} views</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}