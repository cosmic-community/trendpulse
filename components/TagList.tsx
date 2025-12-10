import { Tag } from '@/types'

export default function TagList({ tags }: { tags: Tag[] }) {
  if (!tags || tags.length === 0) return null
  
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
        >
          #{tag.title}
        </span>
      ))}
    </div>
  )
}