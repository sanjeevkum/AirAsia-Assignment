import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AirAsia Events",
    description: "Book your favorite events",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-neutral-950 text-white selection:bg-red-600 selection:text-white">
                    <nav className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-50">
                        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                                AirAsia Events
                            </a>
                            <div className="flex gap-6 text-sm font-medium text-neutral-400">
                                <a href="/" className="hover:text-white transition-colors">Home</a>
                                <a href="/admin" className="hover:text-white transition-colors">Admin</a>
                            </div>
                        </div>
                    </nav>
                    <main className="max-w-7xl mx-auto px-6 py-12">
                        {children}
                    </main>
                    <footer className="border-t border-neutral-800 py-12 text-center text-neutral-500 text-sm">
                        © 2024 AirAsia Events. All rights reserved.
                    </footer>
                </div>
            </body>
        </html>
    );
}
