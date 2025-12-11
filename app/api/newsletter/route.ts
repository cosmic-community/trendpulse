import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/cosmic'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Subscribe to newsletter in Cosmic CMS
    const result = await subscribeToNewsletter(email)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to subscribe' },
        { status: result.alreadySubscribed ? 400 : 500 }
      )
    }

    // Send welcome email via Resend (only for new subscribers, not reactivations)
    if (!result.reactivated && process.env.RESEND_API_KEY) {
      await sendWelcomeEmail({ email })
    }

    return NextResponse.json({
      success: true,
      message: result.reactivated 
        ? 'Welcome back! Your subscription has been reactivated.' 
        : 'Thanks for subscribing! Check your email for a welcome message.',
    })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}