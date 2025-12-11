import { Article } from '@/types'

interface ArticleStructuredDataProps {
  article: Article
}

export default function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.metadata.excerpt,
    image: article.metadata.featured_image ? [
      `${article.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    ] : [],
    datePublished: article.metadata.publish_date,
    dateModified: article.metadata.last_updated || article.metadata.publish_date,
    author: {
      '@type': 'Organization',
      name: 'TrendPulse Daily',
      url: 'https://trendpulsedaily.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'TrendPulse Daily',
      logo: {
        '@type': 'ImageObject',
        url: 'https://trendpulsedaily.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://trendpulsedaily.com/articles/${article.slug}`
    },
    articleSection: article.metadata.categories?.[0]?.title || 'Technology',
    keywords: article.metadata.tags?.map(tag => tag.title).join(', ') || 'technology, AI, news',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}