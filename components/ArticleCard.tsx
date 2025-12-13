import Link from 'next/link'
import { Article } from '@/types'
import { formatDate } from '@/lib/utils'
import CategoryBadge from './CategoryBadge'
import TrendingIndicator from './TrendingIndicator'

export default function ArticleCard({ article }: { article: Article }) {
  // Safe access to first category with null check
  const firstCategory = article.metadata.categories?.[0]
  
  // Changed: Safe view count formatting with type checking
  const viewCount = article.metadata.view_count
  const viewCountDisplay = typeof viewCount === 'number' && !isNaN(viewCount) && viewCount > 0 
    ? viewCount.toLocaleString() 
    : null
  
  // Changed: Safe image URL access with proper null checks
  const imageUrl = article.metadata.featured_image?.imgix_url || article.metadata.featured_image?.url
  
  return (
    <article className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Featured Image or Fallback */}
      <Link href={`/articles/${article.slug}`}>
        <div className="relative h-48 overflow-hidden">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=800&h=384&fit=crop&auto=format,compress`}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            // Changed: Added gradient fallback when no image exists
            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <div className="text-center px-6">
                <svg className="w-16 h-16 mx-auto mb-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-white/90 text-sm font-semibold line-clamp-2">{article.title}</p>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Categories & Trending */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {firstCategory && (
            <CategoryBadge category={firstCategory} size="sm" />
          )}
          {article.metadata.trending_score && article.metadata.trending_score > 80 && (
            <TrendingIndicator score={article.metadata.trending_score} size="sm" />
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 line-clamp-2 flex-grow text-gray-900 dark:text-white">
          <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </h3>
        
        {/* Excerpt */}
        {article.metadata.excerpt && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {article.metadata.excerpt}
          </p>
        )}
        
        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-500 mt-auto">
          <span>{formatDate(article.metadata.publish_date)}</span>
          {viewCountDisplay && (
            <>
              <span>•</span>
              <span>{viewCountDisplay} views</span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}