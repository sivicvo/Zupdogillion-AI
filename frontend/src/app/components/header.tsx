"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, User } from "lucide-react";
import axios from "axios";
import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";

const Header = () => {
    const { theme, setTheme } = useTheme();

    const handleLogout = async () => {
        console.log("logout button clicked-----------------");
        try {
            const token = localStorage.getItem("token");
            console.log("local storage : ", `Bearer ${token}`);
            await axios.post("http://localhost:5328/auth/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
            });
            localStorage.removeItem("token"); // Clear token from local storage
            window.location.href = "/auth/login"; // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };

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
                        <Link
                            href="/auth/login"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            Login
                        </Link>
                        <Link
                            href="/auth/register"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            Register
                        </Link>
                        <div className="relative mb-0">
                            <Dropdown
                                showArrow
                                className="bg-white rounded-md shadow-md mb-0"
                            >
                                <DropdownTrigger>
                                    <User size={25} />
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="User actions"
                                    className="p-3"
                                >
                                    <DropdownItem key="my-memes">
                                        <Link
                                            href="/my-memes"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                        >
                                            My Memes
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem key="pricing">
                                        <Link
                                            href="/pricing"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                        >
                                            Pricing
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem
                                        key="logout"
                                        onAction={handleLogout}
                                    >
                                        <Button className="block px-4 py-2 text-sm mb-0 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                                            Logout
                                        </Button>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
