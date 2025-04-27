import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "NexLearn",
    description: "Login to NexLearn and access futuristic learning content",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" href="/auth/authLogo.svg" type="image/svg+xml" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
                <ReduxProvider>{children}</ReduxProvider>
                <Toaster richColors closeButton expand={true} duration={3000} />
            </body>
        </html>
    );
}
