"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

export default function PlaylistsPage() {
    const { user } = useAuthStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ name: "", description: "" });

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["playlists", user?._id],
        queryFn: () => api.get(`/playlists/user/${user._id}`),
        enabled: !!user,
    });

    async function handleCreate(e) {
        e.preventDefault();
        await api.post("/playlists", form);
        setForm({ name: "", description: "" });
        setModalOpen(false);
        refetch();
    }

    const playlists = data?.data || [];

    return (
        <main className="max-w-3xl mx-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-display text-2xl font-semibold">My Playlists</h1>
                <Button variant="primary" onClick={() => setModalOpen(true)}>New Playlist</Button>
            </div>

            {isLoading ? (
                <p className="text-text-muted">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {playlists.map((playlist) => (
                        <Link key={playlist._id} href={`/playlists/${playlist._id}`}>
                            <Card>
                                <h3 className="font-medium text-text">{playlist.name}</h3>
                                <p className="text-sm text-text-muted">{playlist.videoCount} videos</p>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Playlist">
                <form onSubmit={handleCreate} className="flex flex-col gap-4">
                    <Input label="Name" id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <Input label="Description" id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                    <Button type="submit" variant="primary">Create</Button>
                </form>
            </Modal>
        </main>
    );
}