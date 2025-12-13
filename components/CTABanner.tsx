import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-8 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl lg:text-3xl font-bold mb-4">
          Never Miss a Tech Story That Matters
        </h3>
        <p className="text-lg mb-6 text-white/90">
          Join 10,000+ tech professionals getting AI-curated insights delivered weekly. 
          Plus, get our free 2025 Tech Trends Report instantly.
        </p>
        <Link 
          href="/newsletter"
          className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Subscribe Now - It's Free
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-sm mt-4 text-white/70">
          ⚡ Instant access • 📧 Weekly delivery • 🔒 Unsubscribe anytime
        </p>
      </div>
    </div>
  )
}