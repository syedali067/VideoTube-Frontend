import Link from "next/link";
import Avatar from "@/components/ui/Avatar";

export default function VideoCard({ video }) {
    return (
        <Link href={`/watch/${video._id}`} className="flex flex-col gap-2 group">
            <div className="aspect-video bg-surface rounded-lg overflow-hidden border border-border">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
            </div>
            <div className="flex gap-2">
                <Avatar src={video.owner?.avatar} size="sm" />
                <div className="flex flex-col min-w-0">
                    <h3 className="text-sm font-medium text-text truncate">{video.title}</h3>
                    <p className="text-xs text-text-muted truncate">{video.owner?.fullName}</p>
                    <p className="text-xs text-numeric text-text-muted">{video.views} views</p>
                </div>
            </div>
        </Link>
    );
}