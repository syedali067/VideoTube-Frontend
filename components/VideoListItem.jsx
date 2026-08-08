import Link from "next/link";
import Avatar from "@/components/ui/Avatar";

export default function VideoListItem({ video }) {
    return (
        <Link href={`/watch/${video._id}`} className="flex gap-2 group">
            <div className="w-40 flex-shrink-0 aspect-video bg-surface rounded-lg overflow-hidden border border-border">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
            </div>
            <div className="flex flex-col min-w-0 py-0.5">
                <h3 className="text-sm font-medium text-text line-clamp-2">{video.title}</h3>
                <p className="text-xs text-text-muted mt-1 truncate">{video.owner?.fullName}</p>
                <p className="text-xs text-numeric text-text-muted">{video.views} views</p>
            </div>
        </Link>
    );
}