'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])
  
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}