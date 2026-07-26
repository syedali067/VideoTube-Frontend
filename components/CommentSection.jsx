"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

export default function CommentSection({ videoId }) {
    const [content, setContent] = useState("");
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["comments", videoId],
        queryFn: () => api.get(`/comments/${videoId}`),
    });

    async function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) return;
        await api.post(`/comments/${videoId}`, { content });
        setContent("");
        queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
    }

    const comments = data?.data?.docs || [];

    return (
        <div className="flex flex-col gap-4 mt-6">
            <h2 className="text-display text-lg font-semibold">Comments</h2>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 rounded-lg bg-surface border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                />
                <Button type="submit" variant="primary">Post</Button>
            </form>

            {isLoading ? (
                <p className="text-text-muted text-sm">Loading comments...</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {comments.map((comment) => (
                        <div key={comment._id} className="flex gap-3">
                            <Avatar src={comment.owner?.avatar} size="sm" />
                            <div>
                                <p className="text-sm font-medium text-text">{comment.owner?.username}</p>
                                <p className="text-sm text-text-muted">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}