'use client'

import { useEffect } from 'react'

interface ViewCounterProps {
  articleId: string
  initialViews: number
}

export default function ViewCounter({ articleId, initialViews }: ViewCounterProps) {
  useEffect(() => {
    // Increment view count when component mounts
    const incrementViews = async () => {
      try {
        await fetch('/api/increment-views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            articleId,
            currentViews: initialViews,
          }),
        })
      } catch (error) {
        console.error('Failed to increment view count:', error)
      }
    }
    
    incrementViews()
  }, [articleId, initialViews])
  
  return null
}