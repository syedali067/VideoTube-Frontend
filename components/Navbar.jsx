"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/lib/api";
import Avatar from "@/components/ui/Avatar";

export default function Navbar() {
    const router = useRouter();
    const { user, isLoggedIn, clearUser } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);

    async function handleLogout() {
        try {
            await api.post("/users/logout");
        } catch {}
        clearUser();
        setMenuOpen(false);
        router.push("/");
    }

    const menuLinks = [
        { href: `/channel/${user?.username}`, label: "My Channel" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/my-videos", label: "My Videos" },
        { href: "/playlists", label: "Playlists" },
        { href: "/history", label: "Watch History" },
        { href: "/tweets", label: "Tweets" },
        { href: "/settings", label: "Settings" },
        { href: "/settings/password", label: "Change Password" },
    ];

    return (
        <nav className="sticky top-0 z-40 bg-surface border-b border-border">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
                <Link href="/" className="text-display text-lg font-semibold text-text">
                    VideoTube
                </Link>

                <div className="flex-1 max-w-md hidden sm:block" />

                <div className="flex items-center gap-3 relative">
                    {isLoggedIn ? (
                        <>
                            <Link href="/upload" className="text-sm text-text-muted hover:text-text">
                                Upload
                            </Link>
                            <button onClick={() => setMenuOpen(!menuOpen)}>
                                <Avatar src={user.avatar} size="sm" />
                            </button>

                            {menuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 top-12 z-50 bg-surface border border-border rounded-lg shadow-lg py-2 w-48 flex flex-col">
                                        {menuLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setMenuOpen(false)}
                                                className="px-4 py-2 text-sm text-text-muted hover:text-text hover:bg-surface-hover"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 text-sm text-left text-red-400 hover:bg-surface-hover"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <Link href="/login" className="text-sm text-text-muted hover:text-text">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}