'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import { Article } from '@/types'
import { Search, Loader2 } from 'lucide-react'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || ''
  
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    const fetchArticles = async () => {
      if (!query) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch search results')
        }
        
        const data = await response.json()
        setArticles(data.articles || [])
      } catch (err) {
        console.error('Search error:', err)
        setError('Failed to load search results. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Search Articles
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Search
                </button>
              </div>
            </form>

            {query && (
              <p className="text-gray-600 dark:text-gray-400">
                {loading ? (
                  'Searching...'
                ) : (
                  <>
                    Found {articles.length} result{articles.length !== 1 ? 's' : ''} for "{query}"
                  </>
                )}
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* No Query State */}
          {!query && !loading && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Enter a search term to find articles
              </p>
              <Link 
                href="/"
                className="text-primary hover:underline"
              >
                Browse all articles →
              </Link>
            </div>
          )}

          {/* No Results State */}
          {query && !loading && !error && articles.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No articles found for "{query}"
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">
                Try adjusting your search terms or browse all articles
              </p>
              <Link 
                href="/"
                className="text-primary hover:underline"
              >
                Browse all articles →
              </Link>
            </div>
          )}

          {/* Results Grid */}
          {!loading && !error && articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-dark-bg py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}