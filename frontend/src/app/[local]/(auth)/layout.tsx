// import { routing } from "@/libs/i18nNavigation";
// import { enUS, frFR } from "@clerk/localizations";
// import { ClerkProvider } from "@clerk/nextjs";
// import { setRequestLocale } from "next-intl/server";

// export default async function AuthLayout(props: {
//     children: React.ReactNode;
//     params: Promise<{ locale: string }>;
// }) {
//     const { locale } = await props.params;
//     setRequestLocale(locale);
//     let clerkLocale = enUS;
//     let signInUrl = "/sign-in";
//     let signUpUrl = "/sign-up";
//     let dashboardUrl = "/dashboard";
//     let afterSignOutUrl = "/";

//     if (locale === "fr") {
//         clerkLocale = frFR;
//     }

//     if (locale !== routing.defaultLocale) {
//         signInUrl = `/${locale}${signInUrl}`;
//         signUpUrl = `/${locale}${signUpUrl}`;
//         dashboardUrl = `/${locale}${dashboardUrl}`;
//         afterSignOutUrl = `/${locale}${afterSignOutUrl}`;
//     }

//     return (
//         <ClerkProvider
//             localization={clerkLocale}
//             signInUrl={signInUrl}
//             signUpUrl={signUpUrl}
//             signInFallbackRedirectUrl={dashboardUrl}
//             signUpFallbackRedirectUrl={dashboardUrl}
//             afterSignOutUrl={afterSignOutUrl}
//         >
//             {props.children}
//         </ClerkProvider>
//     );
// }

// app/(auth)/layout.tsx
import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
                <main>{children}</main>
            </div>
        </div>
    );
};

export default AuthLayout;
