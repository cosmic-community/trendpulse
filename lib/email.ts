import { Resend } from 'resend'

// Initialize Resend client (only if API key is available)
const resendApiKey = process.env.RESEND_API_KEY
export const resend = resendApiKey ? new Resend(resendApiKey) : null

interface WelcomeEmailProps {
  email: string
  subscriberName?: string
}

export async function sendWelcomeEmail({ email, subscriberName }: WelcomeEmailProps) {
  // If Resend is not configured, skip email sending
  if (!resend) {
    console.log('Resend not configured - skipping welcome email')
    return { success: true, skipped: true }
  }

  const firstName = subscriberName?.split(' ')[0] || 'there'

  try {
    const { data, error } = await resend.emails.send({
      from: 'TrendPulse Daily <tony@cosmicjs.com>',
      to: [email],
      replyTo: 'tony@cosmicjs.com',
      subject: '🎉 Welcome to TrendPulse Daily!',
      html: generateWelcomeEmailHTML(firstName),
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

function generateWelcomeEmailHTML(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to TrendPulse Daily</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f3f4f6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        .header {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .logo {
          color: #ffffff;
          font-size: 28px;
          font-weight: bold;
          margin: 0;
        }
        .content {
          padding: 40px 30px;
          color: #374151;
          line-height: 1.6;
        }
        .content h1 {
          color: #111827;
          font-size: 24px;
          margin: 0 0 20px 0;
        }
        .content p {
          margin: 0 0 16px 0;
        }
        .benefits {
          background-color: #f9fafb;
          border-left: 4px solid #3b82f6;
          padding: 20px;
          margin: 30px 0;
        }
        .benefits h2 {
          color: #111827;
          font-size: 18px;
          margin: 0 0 16px 0;
        }
        .benefits ul {
          margin: 0;
          padding-left: 20px;
        }
        .benefits li {
          margin-bottom: 8px;
        }
        .cta {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          background-color: #3b82f6;
          color: #ffffff;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
        }
        .footer {
          background-color: #f9fafb;
          padding: 30px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          border-top: 1px solid #e5e7eb;
        }
        .footer a {
          color: #3b82f6;
          text-decoration: none;
        }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">📈 TrendPulse Daily</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">AI-Curated Tech News & Insights</p>
        </div>
        
        <div class="content">
          <h1>Welcome aboard, ${firstName}! 🎉</h1>
          
          <p>Thank you for subscribing to TrendPulse Daily! You've just joined thousands of tech professionals, entrepreneurs, and AI enthusiasts who stay ahead of the curve with our AI-curated news.</p>
          
          <div class="benefits">
            <h2>Here's what you can expect:</h2>
            <ul>
              <li><strong>Weekly Roundup:</strong> Top 10 most important tech stories delivered every Sunday</li>
              <li><strong>Trending Topics:</strong> AI-detected emerging trends in technology and business</li>
              <li><strong>Deep Dives:</strong> Comprehensive analysis of major developments</li>
              <li><strong>Exclusive Insights:</strong> Newsletter-only analysis and commentary</li>
            </ul>
          </div>
          
          <p>Your first newsletter will arrive this Sunday. In the meantime, explore our latest articles:</p>
          
          <div class="cta">
            <a href="https://trendpulse-daily.com" class="button">Browse Latest Articles</a>
          </div>
          
          <p style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
            <strong>Why TrendPulse Daily?</strong><br>
            We use advanced AI to scan thousands of sources daily, identifying the most important tech news and trends. Our algorithms ensure you get signal, not noise.
          </p>
        </div>
        
        <div class="footer">
          <div class="social-links">
            <a href="https://twitter.com/trendpulse">Twitter</a>
            <a href="https://linkedin.com/company/trendpulse">LinkedIn</a>
            <a href="https://github.com/trendpulse">GitHub</a>
          </div>
          
          <p>
            <strong>TrendPulse Daily</strong><br>
            AI-Curated Tech News & Insights
          </p>
          
          <p style="margin-top: 20px;">
            <a href="https://trendpulse-daily.com/newsletter">Manage Preferences</a> · 
            <a href="{{unsubscribe_url}}">Unsubscribe</a>
          </p>
          
          <p style="margin-top: 20px; color: #9ca3af; font-size: 12px;">
            You're receiving this email because you subscribed to TrendPulse Daily.<br>
            We respect your privacy and will never share your email address.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function sendWeeklyNewsletter(
  email: string,
  content: {
    subject: string
    articles: Array<{
      title: string
      excerpt: string
      url: string
    }>
  }
) {
  if (!resend) {
    console.log('Resend not configured - skipping newsletter')
    return { success: true, skipped: true }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'TrendPulse Daily <tony@cosmicjs.com>',
      to: [email],
      replyTo: 'tony@cosmicjs.com',
      subject: content.subject,
      html: generateNewsletterHTML(content),
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to send newsletter:', error)
    return { success: false, error: 'Failed to send newsletter' }
  }
}

function generateNewsletterHTML(content: {
  subject: string
  articles: Array<{
    title: string
    excerpt: string
    url: string
  }>
}): string {
  const articlesHTML = content.articles
    .map(
      (article) => `
      <div style="margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid #e5e7eb;">
        <h3 style="margin: 0 0 10px 0; color: #111827; font-size: 20px;">
          <a href="${article.url}" style="color: #111827; text-decoration: none;">${article.title}</a>
        </h3>
        <p style="margin: 0 0 10px 0; color: #6b7280; line-height: 1.6;">${article.excerpt}</p>
        <a href="${article.url}" style="color: #3b82f6; text-decoration: none; font-weight: 600;">Read more →</a>
      </div>
    `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${content.subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0;">📈 TrendPulse Daily</h1>
        </div>
        
        <div style="padding: 40px 30px; color: #374151; line-height: 1.6;">
          <h2 style="color: #111827; font-size: 24px; margin: 0 0 30px 0;">${content.subject}</h2>
          
          ${articlesHTML}
          
          <div style="text-align: center; margin-top: 40px; padding-top: 40px; border-top: 2px solid #e5e7eb;">
            <a href="https://trendpulse-daily.com" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">View All Articles</a>
          </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">
          <p>
            <a href="https://trendpulse-daily.com/newsletter" style="color: #3b82f6; text-decoration: none;">Manage Preferences</a> · 
            <a href="{{unsubscribe_url}}" style="color: #3b82f6; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}