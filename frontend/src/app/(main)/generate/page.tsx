"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/lib/components/Sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Generate() {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");
    const [history, setHistory] = useState<string[]>([]);

    const { data: session, status } = useSession();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch("http://localhost:5328/api/history");
            const data = await response.json();
            setHistory(data.history);
        } catch (error) {
            console.error("Error fetching history: ", error);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt");
            return;
        }
    
        setError("");
        setIsGenerating(true);
        fetchHistory();
    
        try {
            const formData = new FormData();
            formData.append("prompt", prompt.trim());
            
            const response = await fetch("http://localhost:5328/api/generate", {
                method: "POST",
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setImageUrl(`http://localhost:5328${data.image_url}`);
            
    
        } catch (error) {
            console.error("Error generating meme: ", error);
            setError("Failed to generate meme. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };
    
    const MemeDisplay = () => {
        if (error) {
            return <div className="text-red-500">{error}</div>;
        }
    
        if (isGenerating) {
            return (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            );
        }
    
        if (imageUrl) {
            return (
                <div className="flex justify-center relative items-center w-full">
                    <Image 
                        src={imageUrl} 
                        alt="Generated meme"
                        width={350} 
                        height={300}
                        unoptimized={true}
                        className="rounded-lg"
                        priority
                    />
                </div>
            );
        }
    
        return <div className="text-xl mt-5">Generate new meme with your idea</div>;
    };

    const HistoryDisplay = () => (
        <div className="h-[220px] overflow-y-auto pr-1">
            <div className="flex flex-row flex-wrap gap-4">
                {history.map((url, index) => (
                    <div key={index} className="relative">
                        <Image 
                            src={`http://localhost:5328${url}`} 
                            alt={`Generated meme ${index + 1}`}
                            width={100} 
                            height={100}
                            unoptimized={true}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
    
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 bg-[#090e14]">
                <div className="flex flex-col h-[calc(100vh-2rem)] mx-5 lg:w-[1200px] p-4">
                    <div className="flex flex-col border-2 border-dashed h-[900px] border-gray-700 rounded-lg w-full items-center justify-center relative text-center text-gray-300 p-4">
                        {!session ? (
                            <div>
                                <div className="text-xl mb-4">
                                    If you want to create a meme{" "}
                                    <div>
                                        firstly{" "}
                                        <span className="text-blue-300">join us</span>
                                    </div>
                                </div>
                                <Link
                                    href="/signup"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full justify-between">
                                <HistoryDisplay />
                                <MemeDisplay />
                            </div>
                        )}
                    </div>
    
                    <div className="mt-6 flex gap-2">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Write whatever you want for your meme..."
                            className="flex-1 bg-[#2a2d31] text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isGenerating || !session}
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !session || !prompt.trim()}
                            className={`px-6 py-2 rounded-lg transition-colors ${
                                session 
                                    ? "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
                                    : "bg-blue-900 text-gray-300 cursor-not-allowed"
                            }`}
                        >
                            {isGenerating ? "Generating..." : "Generate"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}