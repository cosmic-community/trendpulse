import { NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/cosmic'
import { sendWelcomeEmail, sendAdminNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Subscribe to newsletter in Cosmic CMS
    const result = await subscribeToNewsletter(email)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error, alreadySubscribed: result.alreadySubscribed },
        { status: result.alreadySubscribed ? 200 : 500 }
      )
    }

    // Send welcome email via Resend
    const emailResult = await sendWelcomeEmail({ 
      email,
      subscriberName: email.split('@')[0] // Use email prefix as name
    })

    // Send admin notification
    await sendAdminNotification(email)

    if (!emailResult.success) {
      // Subscription saved but email failed - still return success
      console.error('Welcome email failed:', emailResult.error)
      return NextResponse.json({ 
        success: true, 
        message: 'Subscribed successfully! Please check your email.',
        emailWarning: 'Email delivery may be delayed'
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: result.reactivated 
        ? 'Welcome back! Your subscription has been reactivated.' 
        : 'Successfully subscribed! Check your email for confirmation.',
      reactivated: result.reactivated
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}