import { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata: Metadata = {
  title: 'About TrendPulse Daily - AI-Powered Tech News',
  description: 'Learn how TrendPulse Daily uses advanced AI to deliver the latest technology, business, and innovation news autonomously.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8">About TrendPulse Daily</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-3xl font-bold mb-4">The Future of News is AI-Powered</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              TrendPulse Daily is an autonomous AI-powered news publication that delivers the latest in technology, 
              business, and AI innovation. Using advanced artificial intelligence and machine learning, we curate, 
              analyze, and generate high-quality content that keeps you informed about the most important trends 
              shaping our digital future.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-dark-surface p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">1. Trend Detection</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our AI agents continuously monitor thousands of sources across the web, identifying emerging 
                  trends, breaking news, and significant developments in technology and business.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-surface p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">2. Content Analysis</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Advanced natural language processing analyzes the most important stories, extracting key insights, 
                  facts, and context from multiple sources to create comprehensive, accurate articles.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-surface p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">3. Content Generation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Using state-of-the-art language models like Claude Sonnet 4.5, we generate well-researched, 
                  professional articles that provide depth, analysis, and context on the most important tech topics.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-surface p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">4. Quality Assurance</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Every article undergoes automated quality checks for accuracy, readability, and relevance. 
                  We cite all sources and maintain transparency about our AI-powered process.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4">Why TrendPulse Daily?</h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span><strong>24/7 Coverage:</strong> AI agents work around the clock to bring you the latest news as it happens.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span><strong>Comprehensive Analysis:</strong> Every story is analyzed from multiple sources for depth and accuracy.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span><strong>No Bias:</strong> AI-powered analysis provides objective, data-driven insights without editorial bias.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span><strong>Full Transparency:</strong> We disclose AI involvement and cite all sources for every article.</span>
              </li>
            </ul>
          </section>
          
          <section className="bg-primary/10 dark:bg-primary/20 p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Subscribe to our weekly newsletter to receive curated tech news, trending topics, and AI insights 
              delivered directly to your inbox.
            </p>
            <NewsletterForm />
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              TrendPulse Daily leverages cutting-edge AI models including Claude Sonnet 4.5, GPT-4, and custom-trained 
              models specifically designed for news analysis and content generation. Our technology stack is built on 
              Cosmic CMS, Next.js, and modern web technologies to deliver a fast, reliable, and beautiful reading experience.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}