"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import VideoCard from "@/components/VideoCard";

export default function HistoryPage() {
    const { data, isLoading } = useQuery({
        queryKey: ["history"],
        queryFn: () => api.get("/users/history"),
    });

    const videos = data?.data || [];

    return (
        <main className="max-w-6xl mx-auto p-4 sm:p-6">
            <h1 className="text-display text-2xl font-semibold mb-6">Watch History</h1>
            {isLoading ? (
                <p className="text-text-muted">Loading...</p>
            ) : videos.length === 0 ? (
                <p className="text-text-muted">No watch history yet.</p>
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