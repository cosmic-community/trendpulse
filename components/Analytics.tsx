import Script from 'next/script'

export default function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
              
              // Track newsletter signups
              window.trackNewsletterSignup = function() {
                gtag('event', 'newsletter_signup', {
                  event_category: 'engagement',
                  event_label: 'Newsletter Subscription'
                });
              }
              
              // Track article views
              window.trackArticleView = function(title, category) {
                gtag('event', 'article_view', {
                  event_category: 'content',
                  event_label: title,
                  article_category: category
                });
              }
            `}
          </Script>
        </>
      )}

      {/* Plausible Analytics (Privacy-friendly alternative) */}
      {PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  )
}