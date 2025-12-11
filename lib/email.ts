import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface WelcomeEmailProps {
  email: string
  subscriberName?: string
}

export async function sendWelcomeEmail({ email, subscriberName }: WelcomeEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'TrendPulse Daily <tony@cosmicjs.com>',
      to: [email],
      replyTo: 'tony@cosmicjs.com',
      subject: '🎉 Welcome to TrendPulse Daily - Your AI Tech News Hub',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to TrendPulse Daily</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                          🚀 Welcome to TrendPulse Daily
                        </h1>
                        <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                          Your Daily Source for AI & Tech Insights
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                          ${subscriberName ? `Hi ${subscriberName},` : 'Hi there,'}
                        </p>
                        <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                          Thank you for subscribing to TrendPulse Daily! 🎉 You've just joined thousands of tech enthusiasts who stay ahead of the curve with our curated AI and technology news.
                        </p>
                        
                        <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 4px;">
                          <h2 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px; font-weight: 600;">
                            What You'll Get:
                          </h2>
                          <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 15px; line-height: 1.8;">
                            <li style="margin-bottom: 10px;">📰 Daily curated tech news and AI breakthroughs</li>
                            <li style="margin-bottom: 10px;">🔥 Trending topics and emerging technologies</li>
                            <li style="margin-bottom: 10px;">💡 Expert insights and analysis</li>
                            <li style="margin-bottom: 10px;">📊 Weekly roundups delivered to your inbox</li>
                          </ul>
                        </div>
                        
                        <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                          We respect your time and inbox. No spam, just valuable content you can trust.
                        </p>
                        
                        <table role="presentation" style="width: 100%; margin: 30px 0;">
                          <tr>
                            <td align="center">
                              <a href="https://trendpulsedaily.com" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                                Visit TrendPulse Daily
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 30px 0 0 0; color: #374151; font-size: 16px; line-height: 1.6;">
                          Stay curious,<br>
                          <strong style="color: #1e40af;">The TrendPulse Daily Team</strong>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                          You're receiving this email because you subscribed to TrendPulse Daily
                        </p>
                        <p style="margin: 0; color: #6b7280; font-size: 12px;">
                          <a href="https://trendpulsedaily.com" style="color: #3b82f6; text-decoration: none;">Visit Website</a> • 
                          <a href="#" style="color: #6b7280; text-decoration: none;">Unsubscribe</a>
                        </p>
                        <p style="margin: 15px 0 0 0; color: #9ca3af; font-size: 12px;">
                          © ${new Date().getFullYear()} TrendPulse Daily. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend email error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendAdminNotification(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'TrendPulse Daily <tony@cosmicjs.com>',
      to: ['tony@cosmicjs.com'],
      subject: '🔔 New Newsletter Subscription',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Subscriber</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e40af; margin-top: 0;">New Newsletter Subscriber</h2>
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                A new subscriber has joined TrendPulse Daily!
              </p>
              <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <strong style="color: #1e40af;">Email:</strong> 
                <span style="color: #374151;">${email}</span>
              </div>
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
                Subscribed at: ${new Date().toLocaleString()}
              </p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Admin notification error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to send admin notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}