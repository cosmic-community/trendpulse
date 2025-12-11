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
        setMessage('Successfully subscribed! Check your email.')
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
    <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 dark:from-primary/20 dark:to-blue-600/20 border-2 border-primary/20 dark:border-primary/30 rounded-xl p-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Enjoying This Article?</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Get more insights like this delivered to your inbox weekly. Join 10,000+ tech professionals.
        </p>
      </div>
      
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
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
        </button>
      </form>
      
      {status === 'success' && (
        <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
          {message}
        </p>
      )}
      
      {status === 'error' && (
        <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
          {message}
        </p>
      )}
      
      <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-4">
        No spam. Unsubscribe at any time. We respect your privacy.
      </p>
    </div>
  )
}