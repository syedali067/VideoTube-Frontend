import { apiFetch } from "@/lib/api";
import VideoCard from "@/components/VideoCard";

export default async function FeedPage() {
    const response = await apiFetch("/videos", {
        next: { revalidate: 60 }, // refresh this list every 60 seconds
    });

    const videos = response.data.docs;

    return (
        <main className="max-w-6xl mx-auto p-4 sm:p-6">
            <h1 className="text-display text-2xl font-semibold mb-6">Videos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </main>
    );
}