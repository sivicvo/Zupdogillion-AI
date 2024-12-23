'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, Home, Image, DollarSign, Grid, User, HelpCircle, FileText } from 'lucide-react'

export default function Generate() {
  const [memeText, setMemeText] = useState('')
  const [generatedMeme, setGeneratedMeme] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This should be replaced with actual auth state
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/generate-meme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: memeText }),
      })
      const data = await response.json()
      setGeneratedMeme(data.meme)
    } catch (error) {
      console.error('Error generating meme:', error)
      setGeneratedMeme('Error generating meme. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <Link href="/" className="flex items-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md">
                <Home className="mr-3" size={20} />
                Homepage
              </Link>
            </li>
            <li>
              <Link href="/generate" className="flex items-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md">
                <Image className="mr-3" size={20} />
                Text to Meme
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="flex items-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md">
                <DollarSign className="mr-3" size={20} />
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/all-memes" className="flex items-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md">
                <Grid className="mr-3" size={20} />
                All Memes
              </Link>
            </li>
          </ul>
        </nav>
        <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
          <ul className="space-y-2">
            <li>
              <Link href="/account" className="flex items-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md">
                <User className="mr-3" size={20} />
                Account
              </Link>
            </li>
            <li>
              <Link href="/support" className="flex items-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md">
                <HelpCircle className="mr-3" size={20} />
                Support
              </Link>
            </li>
            <li>
              <Link href="/docs" className="flex items-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md">
                <FileText className="mr-3" size={20} />
                Docs
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Generate Your Meme</h1>
        
        {isLoggedIn ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {generatedMeme && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Generated Meme</h2>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <p className="text-gray-800 dark:text-white">{generatedMeme}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={memeText}
                onChange={(e) => setMemeText(e.target.value)}
                placeholder="Enter your meme idea here..."
                className="w-full h-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center disabled:opacity-50"
              >
                {isLoading ? 'Generating...' : 'Generate'} <Send className="ml-2" size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Sign Up to Start Creating Memes</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg text-lg mb-8">
              Sign Up
            </button>
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={memeText}
                  onChange={(e) => setMemeText(e.target.value)}
                  placeholder="Enter your meme idea here..."
                  className="w-full h-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-50"
                >
                  {isLoading ? 'Generating...' : 'Generate'} <Send className="ml-2" size={16} />
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

