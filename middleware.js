/*import { NextResponse } from "next/server";

const protectedPaths = [
    "/dashboard",
    "/upload",
    "/settings",
    "/my-videos",
    "/playlists",
    "/history",
    "/tweets",
];

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (!isProtected) {
        return NextResponse.next();
    }

    const token = request.cookies.get("accessToken");

    if (!token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/upload/:path*",
        "/settings/:path*",
        "/my-videos/:path*",
        "/playlists/:path*",
        "/history/:path*",
        "/tweets/:path*",
    ],
};*/

import { NextResponse } from "next/server";

// Disabled: this used to redirect unauthenticated users away from protected
// routes by checking for an "accessToken" cookie on incoming requests.
// That check can never work here — the cookie is set by the backend on a
// different domain (Back4App), and middleware only sees cookies scoped to
// THIS app's own domain (Vercel). Route protection now happens client-side
// in components/AuthProvider.jsx instead, where a browser fetch with
// credentials: "include" can actually see the cross-domain session.
export function middleware(request) {
    return NextResponse.next();
}

export const config = {
    matcher: [], // matches nothing — middleware effectively does not run
};