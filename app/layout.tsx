import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import CosmicBadge from '@/components/CosmicBadge'
import StructuredData from '@/components/StructuredData'
import Analytics from '@/components/Analytics'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://trendpulsedaily.com'),
  title: {
    default: 'TrendPulse Daily - AI-Powered Tech News & Trends',
    template: '%s | TrendPulse Daily',
  },
  description: 'Stay ahead with AI-curated tech news, trending topics, and daily insights. TrendPulse Daily delivers the most important technology stories, powered by artificial intelligence.',
  keywords: [
    'tech news',
    'AI news',
    'technology trends',
    'artificial intelligence',
    'tech industry',
    'innovation',
    'startups',
    'tech analysis',
    'daily tech news',
    'AI-powered news',
    'machine learning news',
    'tech insights',
    'business technology',
    'developer news',
    'tech newsletter',
  ],
  authors: [{ name: 'TrendPulse Daily' }],
  creator: 'TrendPulse Daily',
  publisher: 'TrendPulse Daily',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>📡</text></svg>",
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trendpulsedaily.com',
    siteName: 'TrendPulse Daily',
    title: 'TrendPulse Daily - AI-Powered Tech News & Trends',
    description: 'Stay ahead with AI-curated tech news, trending topics, and daily insights.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TrendPulse Daily - AI-Powered Tech News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendPulse Daily - AI-Powered Tech News & Trends',
    description: 'Stay ahead with AI-curated tech news, trending topics, and daily insights.',
    images: ['/twitter-image.jpg'],
    creator: '@trendpulsedaily',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://trendpulsedaily.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG || ''
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <Analytics />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <CosmicBadge bucketSlug={bucketSlug} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}