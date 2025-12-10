'use client'

import { useEffect, useState } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    // Check localStorage or system preference
    const storedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark')
    }
  }, [])
  
  if (!mounted) {
    return <>{children}</>
  }
  
  return <>{children}</>
}