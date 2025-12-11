// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getArticlesByCategory } from '@/lib/cosmic'
import { Category, Article } from '@/types'
import ArticleCard from '@/components/ArticleCard'
import { Metadata } from 'next'

export const revalidate = 3600

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - TrendPulse Daily'
    }
  }
  
  const typedCategory = category as Category
  
  return {
    title: `${typedCategory.title} - TrendPulse Daily`,
    description: typedCategory.metadata.description || `Latest articles in ${typedCategory.title}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }
  
  const typedCategory = category as Category
  const articles = await getArticlesByCategory(slug)
  const total = articles.length
  
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-12">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {typedCategory.title}
          </h1>
          {typedCategory.metadata.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {typedCategory.metadata.description}
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            {total} {total === 1 ? 'article' : 'articles'}
          </p>
        </header>
        
        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: Article) => (
              <ArticleCard key={article.id} article={article as Article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No articles in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}