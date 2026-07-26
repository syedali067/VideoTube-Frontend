import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Server-Component-only version of apiFetch.
 * Reads the visitor's cookies from the incoming request (via next/headers)
 * and forwards them manually as a Cookie header — Node's server-side fetch
 * has no browser session, so `credentials: "include"` alone does nothing here.
 */
export async function apiFetchServer(endpoint, options = {}) {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString(); // "accessToken=...; refreshToken=..."

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            Cookie: cookieHeader,
        },
    });

    let data;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const error = new Error(data?.message || "Something went wrong");
        error.statusCode = response.status;
        error.errors = data?.errors || [];
        throw error;
    }

    return data;
}