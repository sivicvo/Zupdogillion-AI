"use client";

import Image from "next/image";
import { ThumbsUp, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Header from "@/lib/components/layout/header";
import Footer from "@/lib/components/layout/footer";
import MemeModal from "@/lib/components/modal/Modal";

interface Meme {
    id: string;
    url: string;
    name: string;
    prompt: string;
    likes: number;
}

const AllMemes = () => {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visibleCount, setVisibleCount] = useState(12);
    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [selectedMemeUrl, setSelectedMemeUrl] = useState<string>("");
    // const [selectedMemeName, setSelectedMemeName] = useState<string>("");
    // const [selectedMemePrompt, setSelectedMemePrompt] = useState<string>("");
    const [selectedMeme, setSelectedMeme] = useState<Meme>();

    useEffect(() => {
        const fetchMemes = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://127.0.0.1:5328/api/all_memes");
                // const res = await fetch(
                //     "https://zupdogollion-ai-backend.vercel.app/api/all_memes"
                // );
                if (!res.ok) {
                    throw new Error("Failed to fetch memes!");
                }
                const data = await res.json();
                console.log(
                    "memes from backend ------------>",
                    data.data.memes
                );
                setMemes(data.data.memes);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMemes();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 12);
    };

    const openModal = (
        // url: string,
        // name: string,
        // prompt: string,
        meme: Meme
    ) => {
        // setSelectedMemeUrl(url);
        // setSelectedMemeName(name);
        // setSelectedMemePrompt(prompt);
        setSelectedMeme(meme);
        // setIsModalOpen(true);
    };

    const closeModal = () => {
        // setIsModalOpen(false);
        // setSelectedMemeUrl("");
        // setSelectedMemeName("");
        // setSelectedMemePrompt("");
        setSelectedMeme(undefined);
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex items-center justify-center h-screen">
                    <p className="text-xl text-gray-100 dark:text-white">
                        Loading memes...
                    </p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-6xl font-bold mb-4 text-gray-100 dark:text-white">
                    All Memes
                </h1>
                <h1 className="text-2xl font-bold mb-4 text-gray-100 dark:text-white">
                    Explore all memes
                </h1>

                <div className="mb-8">
                    <div className="flex relative">
                        <input
                            type="text"
                            placeholder="Search memes..."
                            className="w-full p-2 border pl-4 text-white border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        <Button className="bg-white rounded-r-md">
                            Search
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {memes.slice(0, visibleCount).map((meme) => (
                        <div
                            key={meme.id}
                            className="border dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                        >
                            <Image
                                src={meme.url}
                                alt="memes"
                                width={400}
                                height={400}
                                className="w-full h-48 object-cover"
                                unoptimized={true}
                                onClick={() => openModal(meme)}
                            />
                            <div className="p-4">
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Created by {meme.name}
                                </p>
                                <div className="flex justify-between items-center">
                                    <button className="text-blue-500 hover:text-blue-600 flex items-center">
                                        <ThumbsUp size={20} className="mr-1" />{" "}
                                        Like
                                    </button>
                                    <button className="text-green-500 hover:text-green-600 flex items-center">
                                        <Share2 size={20} className="mr-1" />{" "}
                                        Share
                                    </button>
                                    <button className="text-gray-500 hover:text-gray-600">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {visibleCount < memes.length && (
                    <div className="flex items-center justify-center mt-6 text-blue-400">
                        <Button onClick={handleLoadMore}>Load More</Button>
                    </div>
                )}
                <MemeModal
                    isOpen={!!selectedMeme}
                    onClose={closeModal}
                    meme={selectedMeme}
                />
            </div>
            <Footer />
        </>
    );
};

export default AllMemes;
