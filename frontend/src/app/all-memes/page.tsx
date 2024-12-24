import Image from "next/image";
import { Search, ThumbsUp, Share2, MoreHorizontal } from "lucide-react";

const memes = [
    {
        id: 1,
        title: "Funny Cat Meme",
        creator: "John Doe",
        image: "wolf.svg?text=Meme1",
    },
    {
        id: 2,
        title: "Programming Joke",
        creator: "Jane Smith",
        image: "wolf.svg?text=Meme2",
    },
    {
        id: 3,
        title: "Movie Reference",
        creator: "Bob Johnson",
        image: "wolf.svg?text=Meme3",
    },
    // Add more meme objects as needed
];

export default function AllMemes() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
                Explore Our Community Creations
            </h1>

            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search memes..."
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {memes.map((meme) => (
                    <div
                        key={meme.id}
                        className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                    >
                        <Image
                            src={meme.image}
                            alt={meme.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                {meme.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Created by {meme.creator}
                            </p>
                            <div className="flex justify-between items-center">
                                <button className="text-blue-500 hover:text-blue-600 flex items-center">
                                    <ThumbsUp size={20} className="mr-1" /> Like
                                </button>
                                <button className="text-green-500 hover:text-green-600 flex items-center">
                                    <Share2 size={20} className="mr-1" /> Share
                                </button>
                                <button className="text-gray-500 hover:text-gray-600">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
