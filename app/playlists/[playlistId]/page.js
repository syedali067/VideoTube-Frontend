"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import { api } from "@/lib/api";
import VideoCard from "@/components/VideoCard";
import Button from "@/components/ui/Button";

export default function PlaylistDetailPage({ params }) {
    const { playlistId } = use(params);
    const queryClient = useQueryClient();
    const [showAdd, setShowAdd] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["playlist", playlistId],
        queryFn: () => api.get(`/playlists/${playlistId}`),
    });

    const { data: myVideosData } = useQuery({
        queryKey: ["my-videos"],
        queryFn: () => api.get("/dashboard/videos"),
        enabled: showAdd, // only fetch once you actually open the "add" panel
    });

    function invalidate() {
        queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
    }

    async function handleRemove(videoId) {
        await api.patch(`/playlists/remove/${videoId}/${playlistId}`);
        invalidate();
    }

    async function handleAdd(videoId) {
        await api.patch(`/playlists/add/${videoId}/${playlistId}`);
        invalidate();
    }

    if (isLoading) return <p className="p-6 text-text-muted">Loading...</p>;

    const playlist = data.data;
    const playlistVideoIds = playlist.videos.map((v) => v._id);
    const myVideos = myVideosData?.data || [];
    const availableToAdd = myVideos.filter((v) => !playlistVideoIds.includes(v._id));

    return (
        <main className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-1">
                <h1 className="text-display text-2xl font-semibold">{playlist.name}</h1>
                <Button variant="primary" onClick={() => setShowAdd(!showAdd)}>
                    {showAdd ? "Close" : "Add Videos"}
                </Button>
            </div>
            <p className="text-text-muted mb-6">{playlist.description}</p>

            {showAdd && (
                <div className="bg-surface border border-border rounded-lg p-4 mb-6 flex flex-col gap-2">
                    <h2 className="text-sm font-medium text-text-muted mb-2">Your videos not yet in this playlist</h2>
                    {availableToAdd.length === 0 ? (
                        <p className="text-sm text-text-muted">Nothing left to add — all your videos are already here.</p>
                    ) : (
                        availableToAdd.map((video) => (
                            <div key={video._id} className="flex items-center justify-between gap-2">
                                <span className="text-sm text-text truncate">{video.title}</span>
                                <Button variant="secondary" className="text-xs px-2 py-1" onClick={() => handleAdd(video._id)}>
                                    Add
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlist.videos.map((video) => (
                    <div key={video._id} className="flex flex-col gap-2">
                        <VideoCard video={video} />
                        <Button variant="danger" className="text-xs" onClick={() => handleRemove(video._id)}>
                            Remove from playlist
                        </Button>
                    </div>
                ))}
            </div>
        </main>
    );
}