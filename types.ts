// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  status?: string
  published_at?: string
  bucket?: string
  created_by?: string
  modified_by?: string
  thumbnail?: string
}

// Article status type literal
export type ArticleStatus = 'draft' | 'review' | 'published' | 'archived'

// Trending topic status type literal
export type TrendingTopicStatus = 'queued' | 'in-progress' | 'published' | 'skipped'

// Priority level type literal
export type PriorityLevel = 'high' | 'medium' | 'low'

// Category interface
export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    slug?: string
    description?: string
    parent_category?: Category | null
    article_count?: number
    seo_meta?: string
    featured?: boolean
  }
}

// Tag interface
export interface Tag extends CosmicObject {
  type: 'tags'
  metadata: {
    name?: string
    slug?: string
    article_count?: number
  }
}

// Article interface
export interface Article extends CosmicObject {
  type: 'articles'
  metadata: {
    title?: string
    slug?: string
    content?: string
    excerpt?: string
    seo_meta_title?: string
    seo_meta_description?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    categories?: Category[]
    tags?: Tag[]
    trending_score?: number
    external_sources?: string[]
    ai_generated?: boolean
    ai_model_used?: string
    publish_date: string
    last_updated?: string
    view_count?: number
    status?: {
      key: string
      value: string
    }
    agent_id?: string
  }
}

// Weekly Roundup interface
export interface WeeklyRoundup extends CosmicObject {
  type: 'weekly-roundups'
  metadata: {
    week_number?: string
    week_start_date?: string
    title?: string
    introduction?: string
    featured_articles?: Article[]
    total_articles_this_week?: number
    top_category?: string
    newsletter_sent?: boolean
    send_date?: string
  }
}

// Trending Topic interface
export interface TrendingTopic extends CosmicObject {
  type: 'trending-topics'
  metadata: {
    topic_name?: string
    trend_score?: number
    source_urls?: any
    detection_date?: string
    article_created?: Article | null
    status?: {
      key: string
      value: string
    }
    priority_level?: {
      key: string
      value: string
    }
    keywords?: any
    estimated_search_volume?: number
  }
}

// Newsletter Subscriber interface
export interface NewsletterSubscriber extends CosmicObject {
  type: 'newsletter-subscribers'
  metadata: {
    email: string
    subscribed_at: string
    active: boolean
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
}

// Type guards for runtime validation
export function isArticle(obj: CosmicObject): obj is Article {
  return obj.type === 'articles'
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories'
}

export function isTag(obj: CosmicObject): obj is Tag {
  return obj.type === 'tags'
}

// Utility types
export type ArticleCardData = Pick<Article, 'id' | 'slug' | 'title' | 'metadata'>
export type CategoryWithCount = Category & { article_count: number }