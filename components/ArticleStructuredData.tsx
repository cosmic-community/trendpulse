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
    image: article.metadata.featured_image?.imgix_url,
    datePublished: article.metadata.publish_date,
    dateModified: article.metadata.last_updated || article.metadata.publish_date,
    author: {
      '@type': 'Organization',
      name: 'TrendPulse Daily',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TrendPulse Daily',
      logo: {
        '@type': 'ImageObject',
        url: 'https://trendpulsedaily.com/logo.png',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}