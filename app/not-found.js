import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-4xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}