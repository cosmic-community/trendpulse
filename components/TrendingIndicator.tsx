import { Flame } from 'lucide-react'

interface TrendingIndicatorProps {
  score: number
  size?: 'sm' | 'md'
}

export default function TrendingIndicator({ score, size = 'md' }: TrendingIndicatorProps) {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
  
  return (
    <span className={`inline-flex items-center gap-1 bg-accent/10 text-accent rounded-full font-semibold ${sizeClasses}`}>
      <Flame className={iconSize} />
      {score}
    </span>
  )
}