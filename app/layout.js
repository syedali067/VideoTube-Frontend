import "./globals.css";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import QueryProvider from "@/components/QueryProvider";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import ToastContainer from "@/components/ToastContainer";

const fraunces = Fraunces({
    subsets: ["latin"],
    variable: "--font-fraunces",
    weight: ["500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    weight: ["400", "500"],
});

export const metadata = {
    title: "VideoTube",
    description: "A video sharing platform",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
            <body>
                <QueryProvider>
                    <AuthProvider>
                        <Navbar />
                        {children}
                        <ToastContainer />
                    </AuthProvider>
                </QueryProvider>
            </body>
        </html>
    );
}