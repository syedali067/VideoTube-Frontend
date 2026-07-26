import { apiFetch } from "@/lib/api";
import VideoCard from "@/components/VideoCard";

export default async function SearchPage({ searchParams }) {
    const params = await searchParams;
    const query = params.q || "";

    const response = await apiFetch(
        `/videos?query=${encodeURIComponent(query)}&sortBy=createdAt&sortType=desc`,
        { cache: "no-store" } // search results should always be fresh, not cached
    );

    const videos = response.data.docs;

    return (
        <main className="max-w-6xl mx-auto p-4 sm:p-6">
            <h1 className="text-display text-2xl font-semibold mb-6">
                {query ? `Results for "${query}"` : "Browse Videos"}
            </h1>
            {videos.length === 0 ? (
                <p className="text-text-muted">No videos found.</p>
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