'use client'

import { useEffect, useState } from 'react'

export default function SocialProof() {
  const [stats, setStats] = useState({
    articles: 0,
    subscribers: 0,
    views: 0
  })

  useEffect(() => {
    // Animate counters
    const duration = 2000
    const steps = 50
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      setStats({
        articles: Math.floor((step / steps) * 500),
        subscribers: Math.floor((step / steps) * 10000),
        views: Math.floor((step / steps) * 250000)
      })
      
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-primary/5 to-blue-600/5 dark:from-primary/10 dark:to-blue-600/10 border-y border-gray-200 dark:border-dark-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
              {stats.articles.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">AI Articles Published</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
              {stats.subscribers.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Newsletter Subscribers</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
              {stats.views.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Readers</div>
          </div>
        </div>
      </div>
    </div>
  )
}