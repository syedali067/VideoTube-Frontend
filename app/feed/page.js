import { apiFetch } from "@/lib/api";
import VideoCard from "@/components/VideoCard";

// This page depends on live, frequently-changing data and calls an external API
// with credentials, so it must never be statically pre-rendered at build time —
// force-dynamic makes Next.js render it fresh on every request instead of trying
// to fetch data during `next build` (which fails the whole build if the API is
// briefly unreachable, e.g. mid-restart on the backend host).
export const dynamic = "force-dynamic";

export default async function FeedPage() {
    let videos = [];
    let loadError = null;

    try {
        const response = await apiFetch("/videos");
        videos = response?.data?.docs ?? [];
    } catch (error) {
        // Don't let a backend hiccup crash the whole page — show an empty/error
        // state instead so the rest of the app stays usable.
        loadError = error?.message || "Something went wrong while loading videos.";
    }

    return (
        <main className="max-w-6xl mx-auto p-4 sm:p-6">
            <h1 className="text-display text-2xl font-semibold mb-6">Videos</h1>
            {loadError ? (
                <p className="text-sm text-neutral-500">{loadError}</p>
            ) : videos.length === 0 ? (
                <p className="text-sm text-neutral-500">No videos yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            )}
        </main>
    );
}