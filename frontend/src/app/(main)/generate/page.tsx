"use client";

import { useState } from "react";
import Sidebar from "@/lib/components/Sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Generate() {
    const [prompt, setPrompt] = useState("");

    const { data: session, status } = useSession();
    console.log(" dat ->", session);
    console.log(" status ->", status);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }
    const handleGenerate = async () => {
        try {
            const response = await fetch("https://api.imgflip.com/get_memes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error generating meme: ", error);
        }

        console.log("Generating meme with text:", prompt);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 bg-[#090e14]">
                <div className="flex flex-col h-[calc(100vh-2rem)] max-w-4xl mx-auto">
                    {/* Main Content Area */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="border-2 border-dashed border-gray-700 rounded-lg w-full aspect-video flex items-center justify-center relative">
                            <div className="flex flex-col items-center text-gray-300 border border-dashed rounded-md p-6 border-gray-600">
                                {!session ? (
                                    <div className="text-center">
                                        <div className="text-xl mb-4">
                                            If you want to create a meme{" "}
                                            <div>
                                                firstly{" "}
                                                <span className="text-blue-300">
                                                    join us
                                                </span>
                                            </div>
                                        </div>
                                        <Link
                                            href="/signup"
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                                        >
                                            Sign Up{" "}
                                        </Link>
                                    </div>
                                ) : (
                                    <span className="text-xl mb-4">
                                        Generate meme with your idea
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Write what ever you want for your meme..."
                            className="flex-1 bg-[#2a2d31] text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {session ? (
                            <button
                                onClick={handleGenerate}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Generate
                            </button>
                        ) : (
                            <button
                                onClick={handleGenerate}
                                className="bg-blue-900 disabled text-gray-300 px-6 py-2 rounded-lg transition-colors"
                            >
                                Generate
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
