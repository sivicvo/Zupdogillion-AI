"use client";

import Image from "next/image";
import {
    ThumbsUp,
    MoreHorizontal,
    UserCircle,
    X,
    Bookmark,
} from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Header from "@/lib/components/layout/header";
import Footer from "@/lib/components/layout/footer";
import MemeModal from "@/lib/components/modal/Modal";
import "./index.css";

interface Meme {
    id: string;
    meme_url: string;
    meme_name: string;
    owner_name: string;
    prompt: string;
    likes: number;
}

const AllMemes: React.FC = () => {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visibleCount, setVisibleCount] = useState<number>(12);
    const [selectedMeme, setSelectedMeme] = useState<Meme | undefined>(
        undefined
    );

    useEffect(() => {
        const fetchMemes = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://127.0.0.1:5328/api/all_memes");
                if (!res.ok) {
                    throw new Error("Failed to fetch memes!");
                }
                const data: Meme[] = await res.json();
                console.log("memes from backend ------------>", data);
                setMemes(data);
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

    const openModal = (meme: Meme) => {
        setSelectedMeme(meme);
    };

    const closeModal = () => {
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
                        <MemeCard
                            key={meme.id}
                            meme={meme}
                            openModal={openModal}
                        />
                    ))}
                </div>

                {visibleCount < memes.length && (
                    <div className="flex items-center justify-center mt-6 text-blue-400">
                        <Button onClick={handleLoadMore}>Load More</Button>
                    </div>
                )}

                {selectedMeme && (
                    <MemeModal
                        isOpen={!!selectedMeme}
                        onClose={closeModal}
                        meme={selectedMeme}
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

interface MemeCardProps {
    meme: Meme;
    openModal: (meme: Meme) => void;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme, openModal }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            className="relative border shadow-inner dark:bg-gray-700 rounded-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={meme.meme_url}
                alt="memes"
                width={400}
                height={400}
                className="w-full h-48 object-cover cursor-pointer"
                unoptimized={true}
                onClick={() => openModal(meme)}
            />
            {isHovered && (
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-50">
                    <div className="flex justify-between text-gray-300 mb-2">
                        <div className="flex gap-2">
                            <UserCircle /> {meme.owner_name}
                        </div>
                        <button className="text-gray-200 hover:text-gray-500">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <button className="text-blue-500 hover:text-blue-600 flex items-center">
                                <ThumbsUp size={20} className="mr-1" />
                                {"  "}
                                {meme.likes}
                            </button>
                            <button className=" text-gray-200 hover:text-gray-500 flex items-center">
                                <Bookmark />
                            </button>
                        </div>
                        <button className="px-3 rounded-full font-bold bg-blue-400 text-gray-800 hover:text-gray-200 flex items-center">
                            Share on <X />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllMemes;
