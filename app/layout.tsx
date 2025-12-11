import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import CosmicBadge from '@/components/CosmicBadge'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://trendpulse-daily.com'),
  title: {
    default: 'TrendPulse Daily - AI-Curated Tech News & Insights',
    template: '%s | TrendPulse Daily',
  },
  description:
    'Stay ahead of the curve with TrendPulse Daily. AI-curated tech news, emerging trends, and deep analysis for entrepreneurs, developers, and tech enthusiasts.',
  keywords: [
    'tech news',
    'AI news',
    'technology trends',
    'startup news',
    'emerging technologies',
    'AI-curated news',
    'tech insights',
    'business technology',
    'innovation news',
    'tech analysis',
  ],
  authors: [{ name: 'TrendPulse Daily' }],
  creator: 'TrendPulse Daily',
  publisher: 'TrendPulse Daily',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trendpulse-daily.com',
    title: 'TrendPulse Daily - AI-Curated Tech News & Insights',
    description:
      'Stay ahead of the curve with AI-curated tech news, emerging trends, and deep analysis.',
    siteName: 'TrendPulse Daily',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TrendPulse Daily - AI-Curated Tech News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendPulse Daily - AI-Curated Tech News & Insights',
    description:
      'Stay ahead of the curve with AI-curated tech news, emerging trends, and deep analysis.',
    images: ['/og-image.png'],
    creator: '@trendpulse',
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
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://trendpulse-daily.com',
    types: {
      'application/rss+xml': 'https://trendpulse-daily.com/feed.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG || 'trendpulse-daily-production'
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100">
            <Header />
            <main>{children}</main>
            <Footer />
            <CosmicBadge bucketSlug={bucketSlug} />
          </div>
        </ThemeProvider>
        <script src="/dashboard-console-capture.js" async></script>
      </body>
    </html>
  )
}