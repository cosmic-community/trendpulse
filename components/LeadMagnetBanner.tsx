'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

export default function LeadMagnetBanner() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'lead_magnet' }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus('success')
        setEmail('')
        
        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'lead_magnet_download', {
            event_category: 'conversion',
            event_label: 'Tech Trends Report'
          })
        }
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-primary py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Download className="w-4 h-4" />
            <span className="text-sm font-semibold">FREE DOWNLOAD</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Get Your Free 2025 Tech Trends Report
          </h2>
          
          <p className="text-xl mb-8 text-white/90">
            Download our comprehensive analysis of the top 10 technologies that will dominate 2025. 
            Perfect for entrepreneurs, developers, and tech leaders.
          </p>

          {status === 'success' ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-2">Check Your Email! 📧</h3>
              <p className="text-white/90">
                We've sent you the Tech Trends Report and subscribed you to our weekly newsletter.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-lg whitespace-nowrap"
                >
                  <Download className="w-5 h-5" />
                  {status === 'loading' ? 'Sending...' : 'Get Free Report'}
                </button>
              </div>
              {status === 'error' && (
                <p className="mt-3 text-sm text-red-200">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}

          <p className="text-sm text-white/70 mt-6">
            ✨ Instant access • 🚀 Weekly updates • 🔒 Unsubscribe anytime
          </p>
        </div>
      </div>
    </div>
  )
}