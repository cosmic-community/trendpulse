import { NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/cosmic'
import { validateEmail } from '@/lib/utils'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Validate email format
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }
    
    // Subscribe to newsletter in Cosmic CMS
    const result = await subscribeToNewsletter(email)
    
    if (!result.success) {
      // Check if already subscribed
      if (result.alreadySubscribed) {
        return NextResponse.json(
          { success: false, error: result.error, alreadySubscribed: true },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to subscribe' },
        { status: 500 }
      )
    }
    
    // Send welcome email via Resend (only if configured)
    const emailResult = await sendWelcomeEmail({ email })
    
    // Return success even if email fails (subscriber is still saved)
    if (result.reactivated) {
      return NextResponse.json({ 
        success: true, 
        message: 'Welcome back! Your subscription has been reactivated.',
        emailSent: emailResult.success && !emailResult.skipped
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email for a welcome message.',
      emailSent: emailResult.success && !emailResult.skipped
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}