import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - TrendPulse Daily',
  description: 'Get in touch with TrendPulse Daily. Send us your questions, feedback, or partnership inquiries.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-6">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Get In Touch</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Have a question, feedback, or partnership inquiry? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/5 to-blue-600/5 dark:from-primary/10 dark:to-blue-600/10 border border-primary/20 dark:border-primary/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <a 
                    href="mailto:tony@cosmicjs.com" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    tony@cosmicjs.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600/10 dark:bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Response Time</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    We typically respond within 24-48 hours during business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600/10 dark:bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    We're a remote-first team serving readers worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Teaser */}
            <div className="bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-6">
              <h3 className="font-bold mb-3">Common Topics</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Partnership & advertising inquiries</li>
                <li>• Newsletter subscriptions</li>
                <li>• Content suggestions</li>
                <li>• Technical support</li>
                <li>• Press & media requests</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}