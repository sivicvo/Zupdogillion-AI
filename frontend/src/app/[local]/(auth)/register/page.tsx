// import { getI18nPath } from '@/utils/Helpers';
// import { SignUp } from '@clerk/nextjs';
// import { getTranslations, setRequestLocale } from 'next-intl/server';

// type ISignUpPageProps = {
//   params: Promise<{ locale: string }>;
// };

// export async function generateMetadata(props: ISignUpPageProps) {
//   const { locale } = await props.params;
//   const t = await getTranslations({
//     locale,
//     namespace: 'SignUp',
//   });

//   return {
//     title: t('meta_title'),
//     description: t('meta_description'),
//   };
// }

// export default async function SignUpPage(props: ISignUpPageProps) {
//   const { locale } = await props.params;
//   setRequestLocale(locale);

//   return (
//     <SignUp path={getI18nPath('/sign-up', locale)} />
//   );
// };

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            alert("Registeration successful!");
            router.push("/auth/login");
        } catch (error) {
            alert("Registeration failed!");
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
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
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition"
            >
                Sign Up
            </button>
        </form>
    );
};

export default RegisterPage;
