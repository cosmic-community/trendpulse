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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI-powered autonomous news publication delivering technology, business, and innovation insights.
            </p>
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
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/ai-machine-learning" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  AI & ML
                </Link>
              </li>
              <li>
                <Link href="/categories/business-startups" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/categories/software-development" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Development
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-dark-border pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {currentYear} TrendPulse Daily. All content AI-generated with transparency. Powered by Cosmic.</p>
        </div>
      </div>
    </footer>
  )
}