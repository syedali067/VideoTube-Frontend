"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";

export default function TweetsPage() {
    const { user } = useAuthStore();
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["tweets", user?._id],
        queryFn: () => api.get(`/tweets/user/${user._id}`),
        enabled: !!user,
    });

    function invalidate() {
        queryClient.invalidateQueries({ queryKey: ["tweets", user._id] });
    }

    async function handleCreate(e) {
        e.preventDefault();
        if (!content.trim()) return;
        await api.post("/tweets", { content });
        setContent("");
        invalidate();
    }

    async function handleUpdate(tweetId) {
        await api.patch(`/tweets/${tweetId}`, { content: editContent });
        setEditingId(null);
        invalidate();
    }

    async function handleDelete(tweetId) {
        if (!confirm("Delete this tweet?")) return;
        await api.delete(`/tweets/${tweetId}`);
        invalidate();
    }

    async function handleLike(tweetId) {
        await api.post(`/likes/toggle/t/${tweetId}`);
    }

    const tweets = data?.data || [];

    return (
        <main className="max-w-2xl mx-auto p-4 sm:p-6">
            <h1 className="text-display text-2xl font-semibold mb-6">Tweets</h1>

            <Card className="mb-6">
                <form onSubmit={handleCreate} className="flex gap-2">
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        className="flex-1 rounded-lg bg-surface border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                    <Button type="submit" variant="primary">Post</Button>
                </form>
            </Card>

            {isLoading ? (
                <p className="text-text-muted">Loading...</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {tweets.map((tweet) => (
                        <Card key={tweet._id} className="flex gap-3">
                            <Avatar src={tweet.owner?.avatar} size="sm" />
                            <div className="flex-1">
                                {editingId === tweet._id ? (
                                    <div className="flex gap-2">
                                        <input
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="flex-1 rounded-lg bg-canvas border border-border px-2 py-1 text-sm"
                                        />
                                        <Button variant="primary" className="text-xs" onClick={() => handleUpdate(tweet._id)}>Save</Button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-text">{tweet.content}</p>
                                )}
                                <div className="flex gap-3 mt-2 text-xs text-text-muted">
                                    <button onClick={() => handleLike(tweet._id)} className="hover:text-teal">Like</button>
                                    <button onClick={() => { setEditingId(tweet._id); setEditContent(tweet.content); }} className="hover:text-text">Edit</button>
                                    <button onClick={() => handleDelete(tweet._id)} className="hover:text-red-400">Delete</button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    );
}