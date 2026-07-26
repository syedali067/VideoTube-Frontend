import { apiFetch } from "@/lib/api";
import Avatar from "@/components/ui/Avatar";
import VideoCard from "@/components/VideoCard";
import { apiFetchServer } from "@/lib/api-server";
import SubscribeButton from "@/components/SubscribeButton";

export default async function ChannelPage({ params }) {
    const { username } = await params;

    const channelRes = await apiFetchServer(`/users/c/${username}`, { cache: "no-store" });
    const channel = channelRes.data;

    const videosRes = await apiFetch(`/videos?userId=${channel._id}`, {
        next: { revalidate: 60 },
    });
    const videos = videosRes.data.docs;

    return (
        <main>
            <div
                className="h-36 sm:h-48 bg-surface bg-cover bg-center"
                style={{ backgroundImage: `url(${channel.coverImage})` }}
            />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 -mt-10 sm:-mt-12">
                     <Avatar src={channel.avatar} size="xl" />
                     <div className="flex-1">
                        <h1 className="text-display text-xl font-semibold">{channel.fullName}</h1>
                        <p className="text-text-muted text-sm">
                        @{channel.username} • {channel.subscribersCount} subscribers
                        </p>
                     </div>
                     <SubscribeButton channelId={channel._id} initialSubscribed={channel.isSubscribed} />
                </div>

                <h2 className="text-display text-lg font-semibold mt-8 mb-4">Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            </div>
        </main>
    );
}