"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function LikeButton({ videoId, initialLiked = false }) {
    const [liked, setLiked] = useState(initialLiked);
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        setLoading(true);
        try {
            const res = await api.post(`/likes/toggle/v/${videoId}`);
            setLiked(res.data.liked);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                liked
                    ? "bg-teal/20 border-teal text-teal"
                    : "bg-surface border-border text-text-muted hover:text-text"
            }`}
        >
            {liked ? "Liked" : "Like"}
        </button>
    );
}