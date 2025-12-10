import Link from 'next/link'
import { Article } from '@/types'
import { formatDate } from '@/lib/utils'
import CategoryBadge from './CategoryBadge'
import TrendingIndicator from './TrendingIndicator'

export default function Hero({ article }: { article: Article }) {
  if (!article) return null
  
  return (
    <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      {article.metadata.featured_image && (
        <div className="absolute inset-0">
          <img
            src={`${article.metadata.featured_image.imgix_url}?w=2400&h=1400&fit=crop&auto=format,compress`}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
        <div className="max-w-4xl text-white">
          {/* Categories & Trending */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {article.metadata.categories && article.metadata.categories.length > 0 && (
              <CategoryBadge category={article.metadata.categories[0]} />
            )}
            {article.metadata.trending_score && article.metadata.trending_score > 80 && (
              <TrendingIndicator score={article.metadata.trending_score} />
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
            <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
              {article.title}
            </Link>
          </h1>
          
          {/* Excerpt */}
          {article.metadata.excerpt && (
            <p className="text-xl lg:text-2xl text-gray-200 mb-6 max-w-3xl">
              {article.metadata.excerpt}
            </p>
          )}
          
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span>{formatDate(article.metadata.publish_date)}</span>
            {article.metadata.view_count !== undefined && (
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