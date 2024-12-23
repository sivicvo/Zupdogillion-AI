"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, User, ChevronDown } from "lucide-react";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-gray-800 dark:text-white"
                    >
                        AI Meme Generator
                    </Link>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    href="/generate"
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                                >
                                    Generate
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/all-memes"
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                                >
                                    All Memes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun size={20} />
                            ) : (
                                <Moon size={20} />
                            )}
                        </button>
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                            >
                                <User size={20} />
                                <span>Account</span>
                                <ChevronDown size={16} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10">
                                    <Link
                                        href="/my-memes"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        My Memes
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        Pricing
                                    </Link>
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                        <button>Sign Up</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
