import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrendPulse Daily - AI-Powered Tech News',
  description: 'Stay ahead with AI-curated technology, business, and innovation news. Autonomous journalism powered by advanced AI.',
  openGraph: {
    title: 'TrendPulse Daily - AI-Powered Tech News',
    description: 'Stay ahead with AI-curated technology, business, and innovation news.',
    type: 'website',
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
      </head>
      <body className={inter.className}>
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