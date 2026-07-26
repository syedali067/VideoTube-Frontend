const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Core fetch wrapper for calling the VideoTube Express API.
 * Works in both Server Components and Client Components.
 *
 * @param {string} endpoint - e.g. "/videos" or "/users/login"
 * @param {object} options - standard fetch options, plus:
 *   - isFormData: true if sending FormData (file uploads) — skips JSON stringify
 *   - next: Next.js cache config, e.g. { revalidate: 60 } (server-side only)
 */
export async function apiFetch(endpoint, options = {}) {
    const { isFormData, body, ...restOptions } = options;

    const config = {
        ...restOptions,
        credentials: "include", // sends httpOnly cookies automatically
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...options.headers,
        },
    };

    if (body) {
        config.body = isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);

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

// Convenience shortcuts — use these instead of apiFetch directly where possible
export const api = {
    get: (endpoint, options) => apiFetch(endpoint, { ...options, method: "GET" }),
    post: (endpoint, body, options) => apiFetch(endpoint, { ...options, method: "POST", body }),
    patch: (endpoint, body, options) => apiFetch(endpoint, { ...options, method: "PATCH", body }),
    delete: (endpoint, options) => apiFetch(endpoint, { ...options, method: "DELETE" }),
};