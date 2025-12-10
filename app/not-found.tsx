import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8 text-gray-600 dark:text-gray-400">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}