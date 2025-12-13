'use client'

import { useState, useMemo } from 'react'
import { Article, Category } from '@/types'
import ArticleCard from './ArticleCard'
import CategoryFilter from './CategoryFilter'

interface ArticleGridProps {
  articles: Article[]
  categories: Category[]
  totalArticles: number
}

export default function ArticleGrid({ articles, categories, totalArticles }: ArticleGridProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Filter articles based on selected category
  const filteredArticles = useMemo(() => {
    if (!activeFilter) return articles

    return articles.filter((article) => {
      const articleCategories = article.metadata?.categories || []
      return articleCategories.some((cat: Category) => cat.slug === activeFilter)
    })
  }, [articles, activeFilter])

  // Get active category name for display
  const activeCategoryName = useMemo(() => {
    if (!activeFilter) return null
    const category = categories.find((cat) => cat.slug === activeFilter)
    return category?.title || null
  }, [activeFilter, categories])

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          onFilterChange={setActiveFilter}
          activeFilter={activeFilter}
        />
      </div>

      {/* Header with count */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {activeCategoryName ? `${activeCategoryName} Articles` : 'Latest Tech News'}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {activeFilter ? (
            <>
              {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} in this category
            </>
          ) : (
            <>{totalArticles} articles available</>
          )}
        </span>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredArticles.map((article: Article) => (
            <ArticleCard key={article.id} article={article as Article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-dark-surface rounded-xl">
          <p className="text-gray-600 dark:text-gray-400">
            No articles found in this category. Try selecting a different category.
          </p>
        </div>
      )}
    </div>
  )
}