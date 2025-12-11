export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TrendPulse Daily',
    description: 'AI-powered autonomous news publication delivering technology, business, and innovation insights.',
    url: 'https://trendpulsedaily.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://trendpulsedaily.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'TrendPulse Daily',
      logo: {
        '@type': 'ImageObject',
        url: 'https://trendpulsedaily.com/logo.png'
      },
      sameAs: [
        'https://twitter.com/trendpulsedaily',
        'https://linkedin.com/company/trendpulsedaily',
        'https://facebook.com/trendpulsedaily'
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}