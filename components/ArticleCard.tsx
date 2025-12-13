import Link from 'next/link'
import { Article } from '@/types'
import { formatDate } from '@/lib/utils'
import CategoryBadge from './CategoryBadge'
import TrendingIndicator from './TrendingIndicator'

export default function ArticleCard({ article }: { article: Article }) {
  // Safe access to first category with null check
  const firstCategory = article.metadata.categories?.[0]
  
  return (
    <article className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Featured Image */}
      {article.metadata.featured_image && (
        <Link href={`/articles/${article.slug}`}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${article.metadata.featured_image.imgix_url}?w=800&h=384&fit=crop&auto=format,compress`}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      
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
          {article.metadata.view_count != null && article.metadata.view_count > 0 && (
            <>
              <span>•</span>
              <span>{article.metadata.view_count.toLocaleString()} views</span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}