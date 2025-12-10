import { Article } from '@/types'

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function getRelatedArticles(
  currentArticle: Article,
  allArticles: Article[],
  limit = 4
): Article[] {
  if (!currentArticle.metadata.categories || currentArticle.metadata.categories.length === 0) {
    return []
  }
  
  const currentCategoryIds = currentArticle.metadata.categories.map(cat => cat.id)
  
  // Filter articles with same categories
  const related = allArticles.filter(article => {
    if (article.id === currentArticle.id) return false
    
    const articleCategories = article.metadata?.categories || []
    return articleCategories.some(cat => currentCategoryIds.includes(cat.id))
  })
  
  // Sort by publish date and limit
  return related
    .sort((a, b) => {
      const dateA = a.metadata?.publish_date ? new Date(a.metadata.publish_date).getTime() : 0
      const dateB = b.metadata?.publish_date ? new Date(b.metadata.publish_date).getTime() : 0
      return dateB - dateA
    })
    .slice(0, limit)
}

export function generateTableOfContents(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = []
  const lines = content.split('\n')
  
  lines.forEach(line => {
    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (match && match[1] && match[2]) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      headings.push({ id, text, level })
    }
  })
  
  return headings
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}