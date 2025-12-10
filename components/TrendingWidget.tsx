import { TrendingTopic } from '@/types'
import { Flame } from 'lucide-react'

export default function TrendingWidget({ topics }: { topics: TrendingTopic[] }) {
  if (!topics || topics.length === 0) return null
  
  return (
    <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Flame className="w-5 h-5 text-accent" />
        Trending Topics
      </h3>
      <ul className="space-y-3">
        {topics.map((topic) => (
          <li key={topic.id} className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center text-sm font-bold">
              {topic.metadata.trend_score}
            </span>
            <span className="text-sm font-medium line-clamp-2">
              {topic.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}