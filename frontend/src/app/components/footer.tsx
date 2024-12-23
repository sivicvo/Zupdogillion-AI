import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">AI Meme Generator</h3>
            <p className="text-gray-600 dark:text-gray-300">Transform your thoughts into hilarious memes in seconds!</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/generate" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Generate</Link></li>
              <li><Link href="/all-memes" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">All Memes</Link></li>
              <li><Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Pricing</Link></li>
              <li><Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © 2024 AI Meme Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

