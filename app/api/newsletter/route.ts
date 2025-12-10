import { NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/cosmic'
import { validateEmail } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Validate email format
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Subscribe to newsletter
    const result = await subscribeToNewsletter(email)
    
    if (result.success) {
      return NextResponse.json({ success: true, message: 'Successfully subscribed!' })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to subscribe' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}