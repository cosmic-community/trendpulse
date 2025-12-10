'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function NewsletterForm() {
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
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-dark-bg disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {status === 'success' && (
        <p className="mt-3 text-sm text-green-600 dark:text-green-400">
          {message}
        </p>
      )}
      
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          {message}
        </p>
      )}
    </div>
  )
}