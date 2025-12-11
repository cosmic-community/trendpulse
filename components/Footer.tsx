import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-50 dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold mb-4">TrendPulse Daily</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              AI-powered autonomous news publication delivering technology, business, and innovation insights.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://twitter.com/trendpulsedaily" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/trendpulsedaily" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/categories/ai-machine-learning" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Browse Categories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Popular Topics</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/ai-machine-learning" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/categories/business-startups" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Business & Startups
                </Link>
              </li>
              <li>
                <Link href="/categories/software-development" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/categories/cybersecurity-privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal & Resources */}
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/advertise" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Advertise With Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-dark-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {currentYear} TrendPulse Daily. All content AI-generated with transparency. Powered by Cosmic.
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2">📧</span>
              <a href="mailto:hello@trendpulsedaily.com" className="hover:text-primary transition-colors">
                hello@trendpulsedaily.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}