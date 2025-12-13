import { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'
import { CheckCircle, Users, TrendingUp, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Newsletter - TrendPulse Daily',
  description: 'Subscribe to TrendPulse Daily newsletter for weekly AI-curated tech news and insights. Join 10,000+ tech professionals.',
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Join 10,000+ Subscribers</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Never Miss the Tech Stories That Matter
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Get AI-curated tech news, exclusive insights, and our free Tech Trends Report delivered weekly
          </p>
        </div>
        
        {/* Main Newsletter Form */}
        <div className="bg-gradient-to-br from-primary/5 to-blue-600/5 dark:from-primary/10 dark:to-blue-600/10 border-2 border-primary/20 dark:border-primary/30 rounded-2xl p-8 mb-12">
          <NewsletterForm />
          
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Weekly delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Unsubscribe anytime</span>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">What Our Subscribers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "TrendPulse Daily is my go-to source for staying current with AI and tech trends. The weekly newsletter saves me hours of research."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  SK
                </div>
                <div>
                  <div className="font-semibold">Sarah Kim</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Product Manager, Tech Startup</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The AI-curated content is incredibly relevant. I've discovered several tools and trends that have directly impacted my business strategy."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div>
                  <div className="font-semibold">Marcus Rodriguez</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Founder & CEO</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* What You'll Get Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What You'll Get Every Week</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Weekly Tech Roundup</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Top 10 most important tech stories, curated by AI and verified for accuracy
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600/10 dark:bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold mb-2">Trend Analysis</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  AI-detected emerging trends with actionable insights for your business
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600/10 dark:bg-purple-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold mb-2">Exclusive Content</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Newsletter-only analysis, commentary, and insights not available on the website
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600/10 dark:bg-green-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold mb-2">Tool Recommendations</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Carefully vetted AI tools and resources to boost your productivity
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Privacy Section */}
        <section className="bg-gray-50 dark:bg-dark-surface p-6 rounded-xl">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">Your Privacy Matters</h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Frequency:</strong> One email per week, typically Sunday evenings.
                </p>
                <p>
                  <strong>Privacy:</strong> Your email will never be shared, sold, or used for anything other than our newsletter.
                </p>
                <p>
                  <strong>No Spam:</strong> Every email is carefully curated to provide value. Unsubscribe with one click anytime.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}