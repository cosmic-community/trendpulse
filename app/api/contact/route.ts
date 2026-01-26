import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name' },
        { status: 400 }
      )
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide a message' },
        { status: 400 }
      )
    }

    // Send contact email via Resend
    const emailResult = await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    })

    if (!emailResult.success) {
      console.error('Contact email failed:', emailResult.error)
      return NextResponse.json(
        { success: false, error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!'
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}