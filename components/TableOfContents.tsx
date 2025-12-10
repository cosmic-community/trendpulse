'use client'

import { useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ items }: { items: TOCItem[] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (!items || items.length === 0) return null
  
  return (
    <div className="bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-bold mb-4"
      >
        <span>Table of Contents</span>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>
      
      {isExpanded && (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
            >
              <a
                href={`#${item.id}`}
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors text-sm"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}