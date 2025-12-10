import { Article } from '@/types'
import ArticleCard from './ArticleCard'

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) return null
  
  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}