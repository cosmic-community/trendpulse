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
import Breadcrumbs from '@/components/Breadcrumbs'
import ArticleStructuredData from '@/components/ArticleStructuredData'
import NewsletterInlineForm from '@/components/NewsletterInlineForm'
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
  const articleUrl = `https://trendpulsedaily.com/articles/${slug}`
  
  // Changed: Safe image URL access with proper null checks
  const imageUrl = typedArticle.metadata.featured_image?.imgix_url || typedArticle.metadata.featured_image?.url
  
  return {
    title: `${typedArticle.metadata.seo_meta_title || typedArticle.title} | TrendPulse Daily`,
    description: typedArticle.metadata.seo_meta_description || typedArticle.metadata.excerpt,
    keywords: typedArticle.metadata.tags?.map(tag => tag.title).join(', ') || 'AI news, tech news, technology',
    authors: [{ name: 'TrendPulse Daily' }],
    openGraph: {
      title: typedArticle.metadata.seo_meta_title || typedArticle.title,
      description: typedArticle.metadata.seo_meta_description || typedArticle.metadata.excerpt,
      type: 'article',
      publishedTime: typedArticle.metadata.publish_date,
      modifiedTime: typedArticle.metadata.last_updated,
      authors: ['TrendPulse Daily'],
      url: articleUrl,
      images: imageUrl ? [
        {
          url: `${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: typedArticle.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: typedArticle.metadata.seo_meta_title || typedArticle.title,
      description: typedArticle.metadata.seo_meta_description || typedArticle.metadata.excerpt,
      images: imageUrl ? [
        `${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress`
      ] : [],
    },
    alternates: {
      canonical: articleUrl,
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
  // Changed: Fixed to properly destructure the response
  const allArticlesResponse = await getArticles(100)
  const relatedArticles = getRelatedArticles(typedArticle, allArticlesResponse.objects, 4)
  const readingTime = calculateReadingTime(typedArticle.metadata.content || '')
  const toc = generateTableOfContents(typedArticle.metadata.content || '')
  const articleUrl = `https://trendpulsedaily.com/articles/${slug}`
  
  // Changed: Safe image URL access with proper null checks
  const imageUrl = typedArticle.metadata.featured_image?.imgix_url || typedArticle.metadata.featured_image?.url
  
  return (
    <article className="min-h-screen bg-white dark:bg-dark-bg">
      <ArticleStructuredData article={typedArticle} />
      <ViewCounter articleId={typedArticle.id} initialViews={typedArticle.metadata.view_count || 0} />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: typedArticle.metadata.categories?.[0]?.title || 'Articles', href: typedArticle.metadata.categories?.[0]?.slug ? `/categories/${typedArticle.metadata.categories[0].slug}` : '/articles' },
            { label: typedArticle.title, href: `/articles/${slug}` },
          ]}
        />
      </div>
      
      {/* Featured Image or Gradient Fallback */}
      <div className="w-full h-[400px] lg:h-[500px] relative">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=2400&h=1000&fit=crop&auto=format,compress`}
            alt={typedArticle.title}
            className="w-full h-full object-cover"
          />
        ) : (
          // Changed: Added gradient fallback for articles without images
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
            <div className="text-center px-8 max-w-4xl">
              <svg className="w-24 h-24 mx-auto mb-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">{typedArticle.title}</h1>
              {typedArticle.metadata.excerpt && (
                <p className="text-xl text-white/90">{typedArticle.metadata.excerpt}</p>
              )}
            </div>
          </div>
        )}
      </div>
      
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
            
            {/* Title - Only show if image exists (otherwise it's in the hero) */}
            {imageUrl && (
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {typedArticle.title}
              </h1>
            )}
            
            {/* Excerpt - Only show if image exists (otherwise it's in the hero) */}
            {imageUrl && typedArticle.metadata.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {typedArticle.metadata.excerpt}
              </p>
            )}
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <time dateTime={typedArticle.metadata.publish_date}>
                {formatDate(typedArticle.metadata.publish_date)}
              </time>
              <span>•</span>
              <span>{readingTime} min read</span>
              {typedArticle.metadata.view_count != null && typedArticle.metadata.view_count > 0 && (
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
                url={articleUrl}
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
          
          {/* Mid-article Newsletter CTA */}
          <div className="my-12">
            <NewsletterInlineForm />
          </div>
          
          {/* External Sources */}
          {typedArticle.metadata.external_sources && typedArticle.metadata.external_sources.length > 0 && (
            <div className="mt-12 p-6 bg-gray-50 dark:bg-dark-surface rounded-xl">
              <h3 className="text-xl font-bold mb-4">Sources & References</h3>
              <ul className="space-y-2">
                {typedArticle.metadata.external_sources.map((source, index) => (
                  <li key={index}>
                    <a 
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary hover:underline break-all text-sm"
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