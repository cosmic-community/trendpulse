'use client'

import { useState } from 'react'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  onFilterChange: (categorySlug: string | null) => void
  activeFilter: string | null
}

export default function CategoryFilter({ categories, onFilterChange, activeFilter }: CategoryFilterProps) {
  if (!categories || categories.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onFilterChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeFilter === null
            ? 'bg-primary text-white'
            : 'bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border'
        }`}
      >
        All Articles
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onFilterChange(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === category.slug
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border'
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  )
}