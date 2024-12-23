import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            Unleash Your Creativity with AI-Powered Memes!
          </h1>
          <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
            Transform Your Thoughts into Hilarious Memes in Seconds!
          </p>
          <Link
            href="/generate"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
          >
            Start Now
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/placeholder.svg"
            alt="AI Meme Generator"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Latest and Popular Memes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
              <Image
                src={`/placeholder.svg?text=Meme${i}`}
                alt={`Meme ${i}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Meme Title {i}</h3>
              <p className="text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Why Our Project</h2>
        <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
          In digital age, memes have become a universal language of humor and social commentary. Our AI-powered meme generator democratizes creativity, allowing anyone to express themselves through this popular medium.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We created this platform with a vision to foster community engagement and spread laughter across the internet. By simplifying the meme creation process, empowering users to share their unique perspectives and join the global conversation.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Meme Creation Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Basic Meme Formats</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Learn about popular meme structures and how to use them effectively.</p>
            <Link href="#" className="text-blue-500 hover:underline">Watch Tutorial</Link>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Crafting Engaging Captions</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Discover techniques for writing captions that make your memes stand out.</p>
            <Link href="#" className="text-blue-500 hover:underline">Read Guide</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">How does the AI meme generator work?</h3>
            <p className="text-gray-600 dark:text-gray-300">Our AI analyzes your input and matches it with suitable templates and images to create hilarious memes tailored to your ideas.</p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Can I use the generated memes commercially?</h3>
            <p className="text-gray-600 dark:text-gray-300">The memes generated are for personal use. For commercial use, please check our licensing options in the pricing section.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

