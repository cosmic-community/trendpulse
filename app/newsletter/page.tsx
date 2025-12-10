import { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata: Metadata = {
  title: 'Newsletter - TrendPulse Daily',
  description: 'Subscribe to TrendPulse Daily newsletter for weekly AI-curated tech news and insights.',
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Subscribe to TrendPulse Daily</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get the latest AI-curated tech news delivered to your inbox every week
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-8 mb-8">
          <NewsletterForm />
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">What You'll Get</h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span><strong>Weekly Roundup:</strong> Top 10 most important tech stories of the week</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span><strong>Trending Topics:</strong> AI-detected emerging trends in technology and business</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span><strong>Deep Dives:</strong> Comprehensive analysis of major developments</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span><strong>Exclusive Insights:</strong> Newsletter-only analysis and commentary</span>
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Privacy & Frequency</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Frequency:</strong> We send one email per week, typically on Sunday evenings.
              </p>
              <p>
                <strong>Privacy:</strong> We respect your privacy. Your email address will never be shared, sold, 
                or used for anything other than delivering our newsletter. You can unsubscribe at any time with 
                a single click.
              </p>
              <p>
                <strong>No Spam:</strong> We're committed to providing value. Every email is carefully curated 
                to bring you the most relevant tech news and insights.
              </p>
            </div>
          </section>
          
          <section className="bg-gray-50 dark:bg-dark-surface p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Join Thousands of Subscribers</h2>
            <p className="text-gray-700 dark:text-gray-300">
              TrendPulse Daily's newsletter is trusted by developers, entrepreneurs, tech leaders, and AI enthusiasts 
              who want to stay ahead of the curve. Join our growing community and never miss an important tech story again.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}