"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Send,
    Home,
    // Image,
    DollarSign,
    Grid,
    User,
    HelpCircle,
    FileText,
} from "lucide-react";
import Sidebar from "@/lib/components/Sidebar";

export default function Generate() {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Simulated current user's refresh token (replace this with actual logic)

    const currentUserRefreshToken = "your_current_user_refresh_token"; // Replace with actual logic

    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        console.log("localstorage token : ------------> ", localStorageToken);

        // Check if local storage token exists and matches current user's refresh token
        if (
            localStorageToken &&
            localStorageToken === currentUserRefreshToken
        ) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5328/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text_input: prompt }),
            });
            const data = await response.json();
            console.log(data);
            // Handle generated meme (if needed)
        } catch (error) {
            console.error("Error generating meme:", error);
            // Handle error (if needed)
        }
        setIsLoading(false);
    };

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
                            <div className="flex flex-col items-center text-gray-300">
                                <span className="text-xl mb-4">
                                    You didn&apos;t create any meme
                                </span>
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
                        <button
                            onClick={handleGenerate}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Generate
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
