import { apiFetch } from "@/lib/api";
import Avatar from "@/components/ui/Avatar";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";
import { apiFetchServer } from "@/lib/api-server";
import SaveToPlaylistButton from "@/components/SaveToPlaylistButton";
import Link from "next/link";

export default async function WatchPage({ params }) {
    const { videoId } = await params;
    const response = await apiFetchServer(`/videos/${videoId}`, { cache: "no-store" });
    const video = response.data;

    return (
        <main className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="aspect-video bg-surface rounded-lg overflow-hidden border border-border mb-4">
                <video src={video.videoFile} controls className="w-full h-full" />
            </div>

            <h1 className="text-display text-xl font-semibold mb-2">{video.title}</h1>
            <p className="text-numeric text-sm text-text-muted mb-4">{video.views} views</p>

            <div className="flex items-center justify-between mb-4">
                <Link href={`/channel/${video.owner?.username}`} className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                    <Avatar src={video.owner?.avatar} size="md" />
                    <div>
                        <p className="font-medium text-text">{video.owner?.fullName}</p>
                        <p className="text-sm text-text-muted">@{video.owner?.username}</p>
                    </div>
                </div>
                </Link>
                <LikeButton videoId={video._id} initialLiked={video.isLiked} />
                <SaveToPlaylistButton videoId={video._id} />
            </div>

            <p className="text-text-muted text-sm mb-6">{video.description}</p>

            <CommentSection videoId={video._id} />
        </main>
    );
}