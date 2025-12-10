import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'
  
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full font-semibold transition-colors ${sizeClasses}`}
    >
      {category.title}
    </Link>
  )
}