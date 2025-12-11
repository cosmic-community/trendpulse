import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface WelcomeEmailProps {
  email: string
}

export async function sendWelcomeEmail({ email }: WelcomeEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'TrendPulse Daily <tony@cosmicjs.com>',
      to: email,
      replyTo: 'tony@cosmicjs.com',
      subject: '🎉 Welcome to TrendPulse Daily - Your AI Tech News Source',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to TrendPulse Daily</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                          🚀 TrendPulse Daily
                        </h1>
                        <p style="margin: 10px 0 0; color: #e0e7ff; font-size: 16px;">
                          AI-Powered Tech News You Can Trust
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px; font-weight: 600;">
                          Welcome to the Community! 🎉
                        </h2>
                        
                        <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                          Thank you for subscribing to TrendPulse Daily! You've just joined 10,000+ tech enthusiasts who stay ahead of the curve.
                        </p>
                        
                        <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                          Here's what you can expect from us:
                        </p>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                          <tr>
                            <td style="padding: 15px; background-color: #f3f4f6; border-radius: 8px; margin-bottom: 10px;">
                              <div style="display: flex; align-items: start;">
                                <span style="font-size: 24px; margin-right: 15px;">📰</span>
                                <div>
                                  <strong style="color: #1f2937; font-size: 16px;">Daily AI-Curated News</strong>
                                  <p style="margin: 5px 0 0; color: #6b7280; font-size: 14px;">Breaking tech stories analyzed and summarized by AI</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 15px; background-color: #f3f4f6; border-radius: 8px; margin-bottom: 10px;">
                              <div style="display: flex; align-items: start;">
                                <span style="font-size: 24px; margin-right: 15px;">📊</span>
                                <div>
                                  <strong style="color: #1f2937; font-size: 16px;">Weekly Roundups</strong>
                                  <p style="margin: 5px 0 0; color: #6b7280; font-size: 14px;">Comprehensive summaries of the week's top stories</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
                              <div style="display: flex; align-items: start;">
                                <span style="font-size: 24px; margin-right: 15px;">🔥</span>
                                <div>
                                  <strong style="color: #1f2937; font-size: 16px;">Trending Topics</strong>
                                  <p style="margin: 5px 0 0; color: #6b7280; font-size: 14px;">Real-time tracking of emerging tech trends</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>
                        
                        <div style="text-align: center; margin: 30px 0;">
                          <a href="https://trendpulsedaily.com" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                            Start Reading Now →
                          </a>
                        </div>
                        
                        <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                          Questions? Just reply to this email - we'd love to hear from you!
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px; text-align: center;">
                          TrendPulse Daily - AI-Powered Tech News
                        </p>
                        <p style="margin: 0 0 10px; color: #9ca3af; font-size: 12px; text-align: center;">
                          You're receiving this because you subscribed to our newsletter at trendpulsedaily.com
                        </p>
                        <p style="margin: 0; text-align: center;">
                          <a href="https://trendpulsedaily.com" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Visit Website</a>
                          <span style="color: #d1d5db;">|</span>
                          <a href="https://trendpulsedaily.com/newsletter" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Manage Preferences</a>
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
      text: `
Welcome to TrendPulse Daily! 🎉

Thank you for subscribing! You've just joined 10,000+ tech enthusiasts who stay ahead of the curve.

Here's what you can expect:

📰 Daily AI-Curated News
Breaking tech stories analyzed and summarized by AI

📊 Weekly Roundups
Comprehensive summaries of the week's top stories

🔥 Trending Topics
Real-time tracking of emerging tech trends

Start reading: https://trendpulsedaily.com

Questions? Just reply to this email - we'd love to hear from you!

---
TrendPulse Daily - AI-Powered Tech News
Visit Website: https://trendpulsedaily.com
Manage Preferences: https://trendpulsedaily.com/newsletter
      `,
    })

    if (error) {
      console.error('Resend email error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return { success: false, error }
  }
}