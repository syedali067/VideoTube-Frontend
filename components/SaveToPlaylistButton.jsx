"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

export default function SaveToPlaylistButton({ videoId }) {
    const { user } = useAuthStore();
    const [modalOpen, setModalOpen] = useState(false);

    const { data, refetch } = useQuery({
        queryKey: ["playlists", user?._id],
        queryFn: () => api.get(`/playlists/user/${user._id}`),
        enabled: !!user && modalOpen,
    });

    const playlists = data?.data || [];

    const isSavedAnywhere = playlists.some((p) =>
    (p.videos || []).some((v) => v === videoId || v._id === videoId));

    async function handleToggle(playlistId, videos) {
        const alreadyIn = videos.some((v) => v === videoId || v._id === videoId);
        if (alreadyIn) {
            await api.patch(`/playlists/remove/${videoId}/${playlistId}`);
        } else {
            await api.patch(`/playlists/add/${videoId}/${playlistId}`);
        }
        refetch();
    }

    if (!user) return null;

    

    return (
        <>
            <Button variant={isSavedAnywhere ? "secondary" : "primary"} onClick={() => setModalOpen(true)}>
                {isSavedAnywhere ? "Saved" : "Save"}
            </Button>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Save to playlist">
                <div className="flex flex-col gap-2">
                    {playlists.length === 0 ? (
                        <p className="text-sm text-text-muted">You don't have any playlists yet.</p>
                    ) : (
                        playlists.map((playlist) => {
                            const isIn = (playlist.videos || []).some(
                                (v) => v === videoId || v._id === videoId
                            );
                            return (
                                <label key={playlist._id} className="flex items-center gap-2 text-sm text-text">
                                    <input
                                        type="checkbox"
                                        checked={isIn}
                                        onChange={() => handleToggle(playlist._id, playlist.videos || [])}
                                    />
                                    {playlist.name}
                                </label>
                            );
                        })
                    )}
                </div>
            </Modal>
        </>
    );
}