'use client'

import { Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Share:</span>
      
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      
      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      
      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors relative"
        aria-label="Copy link"
      >
        <LinkIcon className="w-4 h-4" />
        {copied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  )
}