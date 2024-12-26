// import { getI18nPath } from '@/utils/Helpers';
// import { SignIn } from '@clerk/nextjs';
// import { getTranslations, setRequestLocale } from 'next-intl/server';

// type ISignInPageProps = {
//   params: Promise<{ locale: string }>;
// };

// export async function generateMetadata(props: ISignInPageProps) {
//   const { locale } = await props.params;
//   const t = await getTranslations({
//     locale,
//     namespace: 'SignIn',
//   });

//   return {
//     title: t('meta_title'),
//     description: t('meta_description'),
//   };
// }

// export default async function SignInPage(props: ISignInPageProps) {
//   const { locale } = await props.params;
//   setRequestLocale(locale);

//   return (
//     <SignIn path={getI18nPath('/sign-in', locale)} />
//   );
// };
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import Link from "next/link";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            console.log("login data: ", data);
            localStorage.setItem("token", data.access_token);
            alert("Login successful!");
            router.push("/");
        } catch (error) {
            alert("Login failed!");
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
            />
            <Link
                href="/auth/forgot-password"
                className="px-4 py-2 text-sm text-gray-700 underline dark:text-gray-200"
            >
                Forgot Password
            </Link>
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition"
            >
                Sign In
            </button>
        </form>
    );
};

export default LoginPage;
