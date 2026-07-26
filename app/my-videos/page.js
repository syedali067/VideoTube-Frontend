"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import ManageVideoCard from "@/components/ManageVideoCard";

export default function MyVideosPage() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["my-videos"],
        queryFn: () => api.get("/dashboard/videos"),
    });

    const videos = data?.data || [];

    return (
        <main className="max-w-3xl mx-auto p-4 sm:p-6">
            <h1 className="text-display text-2xl font-semibold mb-6">My Videos</h1>
            {isLoading ? (
                <p className="text-text-muted">Loading...</p>
            ) : videos.length === 0 ? (
                <p className="text-text-muted">You haven't uploaded any videos yet.</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {videos.map((video) => (
                        <ManageVideoCard key={video._id} video={video} onChange={refetch} />
                    ))}
                </div>
            )}
        </main>
    );
}