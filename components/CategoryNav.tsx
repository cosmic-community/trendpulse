import Link from 'next/link'
import { Category } from '@/types'

export default function CategoryNav({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) return null
  
  return (
    <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Categories</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/categories/${category.slug}`}
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex items-center justify-between group"
            >
              <span>{category.title}</span>
              <svg 
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}