interface ArticleStructuredDataProps {
  title: string
  description: string
  publishDate: string
  modifiedDate?: string
  imageUrl?: string
  authorName?: string
  categories?: string[]
  url: string
}

export default function ArticleStructuredData({
  title,
  description,
  publishDate,
  modifiedDate,
  imageUrl,
  authorName = 'TrendPulse Daily',
  categories = [],
  url,
}: ArticleStructuredDataProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: description,
    image: imageUrl || 'https://trendpulse-daily.com/default-article-image.png',
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