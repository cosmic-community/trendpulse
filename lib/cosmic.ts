import { createBucketClient } from '@cosmicjs/sdk'
import { Article, Category, Tag, TrendingTopic } from '@/types'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Newsletter subscription with duplicate check and subscriber tracking
export async function subscribeToNewsletter(email: string) {
  try {
    // Check if email already exists - handle 404 as "no subscribers found"
    let existingSubscribers
    try {
      existingSubscribers = await cosmic.objects
        .find({
          type: 'newsletter-subscribers',
          'metadata.email': email,
        })
        .props(['id', 'title', 'metadata'])
    } catch (error) {
      // 404 means no subscribers found - this is normal, continue to create new subscriber
      if ((error as { status?: number }).status === 404) {
        existingSubscribers = { objects: [] }
      } else {
        // Re-throw other errors
        throw error
      }
    }

    if (existingSubscribers.objects && existingSubscribers.objects.length > 0) {
      const subscriber = existingSubscribers.objects[0]
      
      // Check if already active
      if (subscriber.metadata?.status === 'Active') {
        return {
          success: false,
          alreadySubscribed: true,
          error: "You're already subscribed to our newsletter!",
        }
      }

      // Reactivate if unsubscribed
      if (subscriber.metadata?.status === 'Unsubscribed') {
        await cosmic.objects.updateOne(subscriber.id, {
          metadata: {
            status: 'Active',
            resubscribed_at: new Date().toISOString(),
          },
        })

        return {
          success: true,
          reactivated: true,
        }
      }
    }

    // Create new subscriber
    const result = await cosmic.objects.insertOne({
      title: email,
      type: 'newsletter-subscribers',
      metadata: {
        email: email,
        status: 'Active',
        subscribed_at: new Date().toISOString(),
        source: 'website',
      },
    })

    return {
      success: true,
      subscriberId: result.object?.id,
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      error: 'Failed to subscribe. Please try again later.',
    }
  }
}

// Get all articles with full metadata - Fixed: Added proper return type
export async function getArticles(limit = 10): Promise<{ objects: Article[]; total: number }> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'articles',
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .limit(limit)

    // Manual sorting by publish_date (descending - newest first)
    const sortedArticles = response.objects.sort((a: Article, b: Article) => {
      const dateA = new Date(a.metadata?.publish_date || a.created_at || '').getTime()
      const dateB = new Date(b.metadata?.publish_date || b.created_at || '').getTime()
      return dateB - dateA
    })

    return {
      objects: sortedArticles as Article[],
      total: response.total || sortedArticles.length,
    }
  } catch (error) {
    if ((error as { status?: number }).status === 404) {
      return { objects: [], total: 0 }
    }
    throw error
  }
}

// Get a single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'articles',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return object as Article
  } catch (error) {
    if ((error as { status?: number }).status === 404) {
      return null
    }
    throw error
  }
}

// Get categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'categories',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    return response.objects as Category[]
  } catch (error) {
    if ((error as { status?: number }).status === 404) {
      return []
    }
    throw error
  }
}

// Get a single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'categories',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    return object as Category
  } catch (error) {
    if ((error as { status?: number }).status === 404) {
      return null
    }
    throw error
  }
}

// Get tags
export async function getTags(): Promise<Tag[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'tags',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    return response.objects as Tag[]
  } catch (error) {
    if ((error as { status?: number }).status === 404) {
      return []
    }
    throw error
  }
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'articles',
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    // Filter articles that have the specified category
    const filteredArticles = response.objects.filter((article: Article) => {
      const categories = article.metadata?.categories || []
      return categories.some((cat: Category) => cat.slug === categorySlug)
    })

    // Manual sorting by publish_date (descending)
    const sortedArticles = filteredArticles.sort((a: Article, b: Article) => {
      const dateA = new Date(a.metadata?.publish_date || a.created_at || '').getTime()
      const dateB = new Date(b.metadata?.publish_date || b.created_at || '').getTime()
      return dateB - dateA
    })

    return sortedArticles as Article[]
  } catch (error) {
    if ((error as { status?: number }).status === 404) {
      return []
    }
    throw error
  }
}

// Get trending topics - Fixed: Changed trend_score to trending_score
export async function getTrendingTopics(limit = 5): Promise<TrendingTopic[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'trending-topics',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
      .limit(limit)

    // Manual sorting by trending_score (descending) - Changed: Fixed property name
    const sortedTopics = response.objects.sort((a: TrendingTopic, b: TrendingTopic) => {
      const scoreA = a.metadata?.trend_score || 0
      const scoreB = b.metadata?.trend_score || 0
      return scoreB - scoreA
    })

    return sortedTopics as TrendingTopic[]
  } catch (error) {
    if ((error as { status?: number }).status === 404) {
      return []
    }
    throw error
  }
}

// Increment article view count
export async function incrementArticleViews(articleId: string, currentViews: number = 0): Promise<{ success: boolean }> {
  try {
    await cosmic.objects.updateOne(articleId, {
      metadata: {
        view_count: currentViews + 1,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to increment view count:', error)
    return { success: false }
  }
}

// Alias for backward compatibility
export const incrementViewCount = incrementArticleViews

// Get related articles based on categories and tags
export async function getRelatedArticles(articleId: string, categories: string[], tags: string[], limit = 3): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'articles',
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    // Filter out the current article and find articles with matching categories or tags
    const relatedArticles = response.objects
      .filter((article: Article) => article.id !== articleId)
      .map((article: Article) => {
        const articleCategories = article.metadata?.categories || []
        const articleTags = article.metadata?.tags || []
        
        let relevanceScore = 0
        
        // Increase score for matching categories (higher weight)
        articleCategories.forEach((cat: Category) => {
          if (categories.includes(cat.slug)) {
            relevanceScore += 2
          }
        })
        
        // Increase score for matching tags
        articleTags.forEach((tag: Tag) => {
          if (tags.includes(tag.slug)) {
            relevanceScore += 1
          }
        })
        
        return { article, relevanceScore }
      })
      .filter(({ relevanceScore }: { relevanceScore: number }) => relevanceScore > 0)
      .sort((a: { relevanceScore: number }, b: { relevanceScore: number }) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
      .map(({ article }: { article: Article }) => article)

    return relatedArticles as Article[]
  } catch (error) {
    if ((error as { status?: number }).status === 404) {
      return []
    }
    throw error
  }
}

export { cosmic }