import { NextRequest, NextResponse } from 'next/server'
import { createBucketClient } from '@cosmicjs/sdk'
import { Article } from '@/types'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ articles: [] })
    }

    // Fetch all articles from Cosmic
    const response = await cosmic.objects
      .find({
        type: 'articles',
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .limit(100) // Get a larger set to search through

    const articles = response.objects as Article[]
    
    // Perform client-side search filtering
    const searchTerm = query.toLowerCase().trim()
    const filteredArticles = articles.filter((article: Article) => {
      const title = article.title?.toLowerCase() || ''
      const excerpt = article.metadata?.excerpt?.toLowerCase() || ''
      const content = article.metadata?.content?.toLowerCase() || ''
      const categories = article.metadata?.categories?.map(cat => cat.title?.toLowerCase()).join(' ') || ''
      const tags = article.metadata?.tags?.map(tag => tag.title?.toLowerCase()).join(' ') || ''
      
      return (
        title.includes(searchTerm) ||
        excerpt.includes(searchTerm) ||
        content.includes(searchTerm) ||
        categories.includes(searchTerm) ||
        tags.includes(searchTerm)
      )
    })

    // Sort by relevance (title matches first, then excerpt, then content)
    const sortedArticles = filteredArticles.sort((a: Article, b: Article) => {
      const aTitle = a.title?.toLowerCase() || ''
      const bTitle = b.title?.toLowerCase() || ''
      const aExcerpt = a.metadata?.excerpt?.toLowerCase() || ''
      const bExcerpt = b.metadata?.excerpt?.toLowerCase() || ''
      
      // Prioritize title matches
      const aTitleMatch = aTitle.includes(searchTerm)
      const bTitleMatch = bTitle.includes(searchTerm)
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      // Then prioritize excerpt matches
      const aExcerptMatch = aExcerpt.includes(searchTerm)
      const bExcerptMatch = bExcerpt.includes(searchTerm)
      
      if (aExcerptMatch && !bExcerptMatch) return -1
      if (!aExcerptMatch && bExcerptMatch) return 1
      
      // Finally sort by date (newest first)
      const dateA = new Date(a.metadata?.publish_date || a.created_at || '').getTime()
      const dateB = new Date(b.metadata?.publish_date || b.created_at || '').getTime()
      return dateB - dateA
    })

    return NextResponse.json({ 
      articles: sortedArticles,
      total: sortedArticles.length,
      query: query 
    })
  } catch (error) {
    console.error('Search API error:', error)
    
    // Handle 404 (no articles found)
    if ((error as { status?: number }).status === 404) {
      return NextResponse.json({ articles: [], total: 0 })
    }
    
    return NextResponse.json(
      { error: 'Failed to search articles' },
      { status: 500 }
    )
  }
}