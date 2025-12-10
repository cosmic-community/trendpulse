// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticles } from '@/lib/cosmic'
import { Article } from '@/types'
import { formatDate, calculateReadingTime, getRelatedArticles, generateTableOfContents } from '@/lib/utils'
import ArticleContent from '@/components/ArticleContent'
import CategoryBadge from '@/components/CategoryBadge'
import TagList from '@/components/TagList'
import ShareButtons from '@/components/ShareButtons'
import RelatedArticles from '@/components/RelatedArticles'
import ViewCounter from '@/components/ViewCounter'
import TableOfContents from '@/components/TableOfContents'
import { Metadata } from 'next'

export const revalidate = 3600

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found - TrendPulse Daily'
    }
  }
  
  const typedArticle = article as Article
  
  return {
    title: typedArticle.metadata.seo_meta_title || typedArticle.title,
    description: typedArticle.metadata.seo_meta_description || typedArticle.metadata.excerpt,
    openGraph: {
      title: typedArticle.metadata.seo_meta_title || typedArticle.title,
      description: typedArticle.metadata.seo_meta_description || typedArticle.metadata.excerpt,
      type: 'article',
      publishedTime: typedArticle.metadata.publish_date,
      authors: ['TrendPulse Daily'],
      images: typedArticle.metadata.featured_image ? [
        {
          url: `${typedArticle.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
        }
      ] : [],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }
  
  const typedArticle = article as Article
  const { objects: allArticles } = await getArticles(100)
  const relatedArticles = getRelatedArticles(typedArticle, allArticles as Article[], 4)
  const readingTime = calculateReadingTime(typedArticle.metadata.content || '')
  const toc = generateTableOfContents(typedArticle.metadata.content || '')
  
  return (
    <article className="min-h-screen bg-white dark:bg-dark-bg">
      <ViewCounter articleId={typedArticle.id} initialViews={typedArticle.metadata.view_count || 0} />
      
      {/* Featured Image */}
      {typedArticle.metadata.featured_image && (
        <div className="w-full h-[400px] lg:h-[500px] relative">
          <img
            src={`${typedArticle.metadata.featured_image.imgix_url}?w=2400&h=1000&fit=crop&auto=format,compress`}
            alt={typedArticle.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            {/* Categories */}
            {typedArticle.metadata.categories && typedArticle.metadata.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {typedArticle.metadata.categories.map((category) => (
                  <CategoryBadge key={category.id} category={category} />
                ))}
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {typedArticle.title}
            </h1>
            
            {/* Excerpt */}
            {typedArticle.metadata.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {typedArticle.metadata.excerpt}
              </p>
            )}
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{formatDate(typedArticle.metadata.publish_date)}</span>
              <span>•</span>
              <span>{readingTime} min read</span>
              {typedArticle.metadata.view_count !== undefined && (
                <>
                  <span>•</span>
                  <span>{typedArticle.metadata.view_count.toLocaleString()} views</span>
                </>
              )}
              {typedArticle.metadata.ai_generated && typedArticle.metadata.ai_model_used && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-5a1 1 0 011 1v1a1 1 0 11-2 0V7a1 1 0 011-1z"/>
                    </svg>
                    AI Generated ({typedArticle.metadata.ai_model_used})
                  </span>
                </>
              )}
            </div>
            
            {/* Share Buttons */}
            <div className="mt-6">
              <ShareButtons 
                url={`https://trendpulsedaily.com/articles/${typedArticle.slug}`}
                title={typedArticle.title}
              />
            </div>
          </header>
          
          {/* Table of Contents */}
          {toc.length > 0 && (
            <TableOfContents items={toc} />
          )}
          
          {/* Article Content */}
          <ArticleContent content={typedArticle.metadata.content || ''} />
          
          {/* External Sources */}
          {typedArticle.metadata.external_sources && typedArticle.metadata.external_sources.length > 0 && (
            <div className="mt-12 p-6 bg-gray-50 dark:bg-dark-surface rounded-xl">
              <h3 className="text-xl font-bold mb-4">External Sources</h3>
              <ul className="space-y-2">
                {typedArticle.metadata.external_sources.map((source, index) => (
                  <li key={index}>
                    <a 
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Tags */}
          {typedArticle.metadata.tags && typedArticle.metadata.tags.length > 0 && (
            <div className="mt-8">
              <TagList tags={typedArticle.metadata.tags} />
            </div>
          )}
        </div>
      </div>
      
      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-gray-50 dark:bg-dark-surface py-12">
          <div className="container mx-auto px-4">
            <RelatedArticles articles={relatedArticles} />
          </div>
        </div>
      )}
    </article>
  )
}