import { apiFetch } from "@/lib/api";
import Avatar from "@/components/ui/Avatar";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";
import { apiFetchServer } from "@/lib/api-server";
import SaveToPlaylistButton from "@/components/SaveToPlaylistButton";
import SubscribeButton from "@/components/SubscribeButton";
import VideoListItem from "@/components/VideoListItem";
import Link from "next/link";

export default async function WatchPage({ params }) {
    const { videoId } = await params;
    const response = await apiFetchServer(`/videos/${videoId}`, { cache: "no-store" });
    const video = response.data;

    const suggestedRes = await apiFetch(`/videos?limit=12&sortBy=createdAt&sortType=desc`, {
        next: { revalidate: 60 },
    });
    const suggestedVideos = suggestedRes.data.docs.filter((v) => v._id !== videoId);

    return (
        <main className="max-w-6xl mx-auto p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0">
                    <div className="aspect-video bg-surface rounded-lg overflow-hidden border border-border mb-4">
                        <video src={video.videoFile} controls className="w-full h-full" />
                    </div>

                    <h1 className="text-display text-xl font-semibold mb-2">{video.title}</h1>
                    <p className="text-numeric text-sm text-text-muted mb-4">{video.views} views</p>

                    <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                        <Link href={`/channel/${video.owner?.username}`} className="flex items-center gap-3">
                            <Avatar src={video.owner?.avatar} size="md" />
                            <div>
                                <p className="font-medium text-text">{video.owner?.fullName}</p>
                                <p className="text-sm text-text-muted">@{video.owner?.username}</p>
                            </div>
                        </Link>
                        <div className="flex items-center gap-2">
                            <SubscribeButton channelId={video.owner?._id} initialSubscribed={video.isSubscribedToOwner} />
                            <LikeButton videoId={video._id} initialLiked={video.isLiked} />
                            <SaveToPlaylistButton videoId={video._id} />
                        </div>
                    </div>

                    <p className="text-text-muted text-sm mb-6">{video.description}</p>

                    <CommentSection videoId={video._id} />
                </div>

                <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-3">
                    <h2 className="text-sm font-medium text-text-muted mb-1">More videos</h2>
                    {suggestedVideos.map((v) => (
                        <VideoListItem key={v._id} video={v} />
                    ))}
                </div>
            </div>
        </main>
    );
}