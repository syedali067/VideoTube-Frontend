"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

// Paths that require a logged-in user. Kept here (client-side) instead of in
// middleware.js because the auth cookie is set by the backend on a completely
// different domain (Back4App) than this frontend (Vercel) — middleware runs
// server-side at the edge and can only see cookies attached to requests for
// ITS OWN domain, so it can never see a cookie scoped to another domain.
// A browser-issued fetch with credentials: "include" (used below, via
// /users/current-user) is a different mechanism that *can* carry cross-domain
// cookies when CORS allows it, so the check has to happen here instead.
const protectedPaths = [
    "/dashboard",
    "/upload",
    "/settings",
    "/my-videos",
    "/playlists",
    "/history",
    "/tweets",
];

function isProtectedPath(pathname) {
    return protectedPaths.some((path) => pathname.startsWith(path));
}

export default function AuthProvider({ children }) {
    const setUser = useAuthStore((state) => state.setUser);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const [checked, setChecked] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        async function loadUser() {
            try {
                const res = await api.get("/users/current-user");
                setUser(res.data);
            } catch {
                // not logged in — that's fine, just continue as anonymous
            } finally {
                setChecked(true);
            }
        }
        loadUser();
    }, [setUser]);

    useEffect(() => {
        if (!checked) return;
        if (!isLoggedIn && isProtectedPath(pathname)) {
            router.replace(`/login?redirectTo=${encodeURIComponent(pathname)}`);
        }
    }, [checked, isLoggedIn, pathname, router]);

    if (!checked) return null; // avoids a flash of "logged out" navbar before the check finishes

    return children;
}