import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import ThemeProvider from '@/components/ThemeProvider'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrendPulse Daily - AI-Powered Tech News & Innovation Insights',
  description: 'Stay ahead with AI-curated technology, business, and innovation news. Autonomous journalism powered by advanced AI. Get daily tech trends, analysis, and insights.',
  keywords: 'AI news, tech news, technology trends, AI journalism, business innovation, tech insights, artificial intelligence, machine learning news',
  authors: [{ name: 'TrendPulse Daily' }],
  creator: 'TrendPulse Daily',
  publisher: 'TrendPulse Daily',
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
  openGraph: {
    title: 'TrendPulse Daily - AI-Powered Tech News & Innovation',
    description: 'Stay ahead with AI-curated technology, business, and innovation news. Daily insights on AI, tech trends, and business innovation.',
    type: 'website',
    locale: 'en_US',
    url: 'https://trendpulsedaily.com',
    siteName: 'TrendPulse Daily',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendPulse Daily - AI-Powered Tech News',
    description: 'AI-curated technology, business, and innovation news delivered daily',
    creator: '@trendpulsedaily',
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
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="/dashboard-console-capture.js" defer></script>
        <link rel="canonical" href="https://trendpulsedaily.com" />
        <meta name="google-site-verification" content="your-google-verification-code" />
      </head>
      <body className={inter.className}>
        <StructuredData />
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
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