import { NextResponse } from 'next/server'
import { incrementViewCount } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const { articleId, currentViews } = await request.json()
    
    if (!articleId || typeof currentViews !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      )
    }
    
    await incrementViewCount(articleId, currentViews)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('View count increment error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to increment view count' },
      { status: 500 }
    )
  }
}