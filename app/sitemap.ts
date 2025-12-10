import { MetadataRoute } from 'next'
import { getArticles, getCategories } from '@/lib/cosmic'
import { Article, Category } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { objects: articles } = await getArticles(1000)
  const categories = await getCategories()
  
  const baseUrl = 'https://trendpulsedaily.com'
  
  const articleUrls = articles.map((article: Article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.metadata.last_updated || article.metadata.publish_date,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))
  
  const categoryUrls = categories.map((category: Category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...articleUrls,
    ...categoryUrls,
  ]
}