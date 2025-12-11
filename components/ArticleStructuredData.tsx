import { Article } from '@/types'

interface ArticleStructuredDataProps {
  article: Article
}

export default function ArticleStructuredData({
  article,
}: ArticleStructuredDataProps) {
  const title = article.title
  const description = article.metadata.excerpt || article.metadata.seo_meta_description || ''
  const publishDate = article.metadata.publish_date
  const modifiedDate = article.metadata.last_updated || article.metadata.publish_date
  const imageUrl = article.metadata.featured_image?.imgix_url
  const authorName = 'TrendPulse Daily'
  const categories = article.metadata.categories?.map(cat => cat.title) || []
  const url = `https://trendpulsedaily.com/articles/${article.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: description,
    image: imageUrl ? `${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress` : 'https://trendpulse-daily.com/default-article-image.png',
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: 'https://trendpulse-daily.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TrendPulse Daily',
      logo: {
        '@type': 'ImageObject',
        url: 'https://trendpulse-daily.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: categories.join(', '),
    keywords: categories.join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://trendpulse-daily.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: 'https://trendpulse-daily.com/articles',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: url,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}