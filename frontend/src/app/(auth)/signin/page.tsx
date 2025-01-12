"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button, Input, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import PrimaryButton from "@/lib/components/Button/PrimaryButton";
import { DivideCircleIcon } from "lucide-react";

export default function Component() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    // Redirect if session exists
    useEffect(() => {
        if (session) {
            router.push("/generate");
        }
    }, [session, router]);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 lg:h-1/2">
            <div className="flex w-full items-center justify-center p-4">
                <div className="flex w-full max-w-sm flex-col items-center gap-4 bg-white rounded-lg shadow-md p-6">
                    <div className="w-full text-left">
                        <p className="pb-2 text-xl font-medium">Sign In</p>
                        <p className="text-small text-default-500">
                            Log in to your account to continue
                        </p>
                    </div>

                    <form
                        className="flex w-full flex-col gap-3"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <Input
                            label="Email Address"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            variant="underlined"
                            required
                        />
                        <Input
                            endContent={
                                <button
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? (
                                        <Icon
                                            className="pointer-events-none text-2xl text-default-400"
                                            icon="solar:eye-closed-linear"
                                        />
                                    ) : (
                                        <Icon
                                            className="pointer-events-none text-2xl text-default-400"
                                            icon="solar:eye-bold"
                                        />
                                    )}
                                </button>
                            }
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            type={isVisible ? "text" : "password"}
                            variant="underlined"
                            required
                        />
                        <div className="flex items-center justify-between px-1 py-2">
                            <Link
                                className="text-default-500"
                                href="#"
                                size="sm"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <PrimaryButton
                            className="w-full bg-blue-500"
                            text="Login"
                        />
                    </form>

                    <div className="flex w-full items-center gap-4 py-2">
                        <Divider className="flex-1" />
                        <p className="shrink-0 text-tiny text-default-500">
                            OR
                        </p>
                        <Divider className="flex-1" />
                    </div>

                    <div className="flex w-full flex-col gap-2">
                        <Button
                            startContent={
                                <Icon
                                    icon="flat-color-icons:google"
                                    width={24}
                                />
                            }
                            variant="bordered"
                            onClick={() => {
                                signIn("google", {
                                    callbackUrl:
                                        "http://localhost:3000/explore",
                                });
                            }}
                        >
                            Continue with Google
                        </Button>
                    </div>

                    <div className="text-center text-small">
                        Need to create an account?&nbsp;
                        <Link href="/signup" size="sm">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
