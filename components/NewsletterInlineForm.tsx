'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function NewsletterInlineForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed! Check your email.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('An error occurred. Please try again.')
    }
  }
  
  return (
    <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 dark:from-primary/20 dark:to-blue-600/20 border-2 border-primary/20 dark:border-primary/30 rounded-xl p-8 my-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold">Stay Updated with TrendPulse Daily</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Join thousands of tech enthusiasts receiving weekly AI and tech insights directly in their inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-dark-bg disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
          </button>
        </form>
        
        {status === 'success' && (
          <p className="mt-4 text-sm text-green-600 dark:text-green-400 font-medium">
            {message}
          </p>
        )}
        
        {status === 'error' && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400 font-medium">
            {message}
          </p>
        )}
        
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
          🔒 No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  )
}