import { NextResponse } from "next/server";

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
};