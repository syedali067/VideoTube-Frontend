import Link from "next/link";
import Button from "@/components/ui/Button";

export default function LandingPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-6">
            <h1 className="text-display text-4xl sm:text-5xl font-semibold">
                Share your story. <span className="text-gold">Build your channel.</span>
            </h1>
            <p className="text-text-muted text-base sm:text-lg max-w-xl">
                VideoTube is a place to upload, share, and discover videos from creators around the world.
            </p>
            <div className="flex gap-3">
                <Link href="/register">
                    <Button variant="primary">Get Started</Button>
                </Link>
                <Link href="/feed">
                    <Button variant="secondary">Browse Videos</Button>
                </Link>
            </div>
        </main>
    );
}