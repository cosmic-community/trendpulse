import { createBucketClient } from '@cosmicjs/sdk'
import { Article, NewsletterSubscriber } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safe article fetching with error handling
export async function getArticles(limit = 12, skip = 0) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'articles'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Manual sorting by publish date (newest first)
    const sortedArticles = response.objects.sort((a: Article, b: Article) => {
      const dateA = new Date(a.metadata?.publish_date || '').getTime()
      const dateB = new Date(b.metadata?.publish_date || '').getTime()
      return dateB - dateA
    })
    
    // Apply pagination
    return {
      objects: sortedArticles.slice(skip, skip + limit),
      total: sortedArticles.length
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { objects: [], total: 0 }
    }
    throw new Error('Failed to fetch articles')
  }
}

// Get single article by slug
export async function getArticleBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'articles',
        slug
      })
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch article')
  }
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string, limit = 12) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'articles'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Filter articles by category slug
    const filteredArticles = response.objects.filter((article: any) => {
      const categories = article.metadata?.categories || []
      return categories.some((cat: any) => cat.slug === categorySlug)
    })
    
    // Sort by publish date
    const sortedArticles = filteredArticles.sort((a: Article, b: Article) => {
      const dateA = new Date(a.metadata?.publish_date || '').getTime()
      const dateB = new Date(b.metadata?.publish_date || '').getTime()
      return dateB - dateA
    })
    
    return {
      objects: sortedArticles.slice(0, limit),
      total: sortedArticles.length
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { objects: [], total: 0 }
    }
    throw new Error('Failed to fetch articles by category')
  }
}

// Get categories
export async function getCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug
      })
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// Get tags
export async function getTags() {
  try {
    const response = await cosmic.objects
      .find({ type: 'tags' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch tags')
  }
}

// Get trending topics
export async function getTrendingTopics(limit = 5) {
  try {
    const response = await cosmic.objects
      .find({ type: 'trending-topics' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    // Sort by trend score
    const sortedTopics = response.objects.sort((a: any, b: any) => {
      const scoreA = a.metadata?.trend_score || 0
      const scoreB = b.metadata?.trend_score || 0
      return scoreB - scoreA
    })
    
    return sortedTopics.slice(0, limit)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch trending topics')
  }
}

// Increment article view count
export async function incrementViewCount(articleId: string, currentViews: number) {
  try {
    await cosmic.objects.updateOne(articleId, {
      metadata: {
        view_count: currentViews + 1
      }
    })
  } catch (error) {
    console.error('Failed to increment view count:', error)
  }
}

// Check if email is already subscribed
export async function checkExistingSubscriber(email: string): Promise<NewsletterSubscriber | null> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'newsletter-subscribers'
      })
      .props(['id', 'title', 'metadata'])
    
    // Find subscriber with matching email
    const subscriber = response.objects.find(
      (obj: NewsletterSubscriber) => obj.metadata?.email?.toLowerCase() === email.toLowerCase()
    )
    
    return subscriber || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

// Subscribe to newsletter
export async function subscribeToNewsletter(email: string) {
  try {
    // Check if email already exists
    const existingSubscriber = await checkExistingSubscriber(email)
    
    if (existingSubscriber) {
      // Check if subscriber is still active
      if (existingSubscriber.metadata?.active) {
        return { 
          success: false, 
          error: 'This email is already subscribed to our newsletter.',
          alreadySubscribed: true 
        }
      } else {
        // Reactivate inactive subscriber
        await cosmic.objects.updateOne(existingSubscriber.id, {
          metadata: {
            active: true,
            resubscribed_at: new Date().toISOString()
          }
        })
        return { 
          success: true, 
          reactivated: true 
        }
      }
    }
    
    // Create new subscriber
    const result = await cosmic.objects.insertOne({
      type: 'newsletter-subscribers',
      title: email,
      metadata: {
        email: email,
        subscribed_at: new Date().toISOString(),
        active: true
      }
    })
    
    return { 
      success: true, 
      subscriberId: result.object.id 
    }
  } catch (error) {
    console.error('Failed to subscribe to newsletter:', error)
    return { 
      success: false, 
      error: 'Failed to subscribe. Please try again later.' 
    }
  }
}

// Get all active subscribers (for newsletter sending)
export async function getActiveSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'newsletter-subscribers'
      })
      .props(['id', 'title', 'metadata'])
    
    // Filter for active subscribers only
    return response.objects.filter(
      (subscriber: NewsletterSubscriber) => subscriber.metadata?.active === true
    ) as NewsletterSubscriber[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch subscribers')
  }
}