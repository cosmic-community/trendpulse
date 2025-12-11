export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TrendPulse Daily',
    url: 'https://trendpulse-daily.com',
    logo: 'https://trendpulse-daily.com/logo.png',
    description:
      'AI-curated tech news and insights for entrepreneurs, developers, and tech enthusiasts.',
    sameAs: [
      'https://twitter.com/trendpulse',
      'https://linkedin.com/company/trendpulse',
      'https://github.com/trendpulse',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'tony@cosmicjs.com',
      contactType: 'Customer Service',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TrendPulse Daily',
    url: 'https://trendpulse-daily.com',
    description:
      'Stay ahead of the curve with AI-curated tech news, emerging trends, and deep analysis.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://trendpulse-daily.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}