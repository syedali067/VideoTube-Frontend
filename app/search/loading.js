import Skeleton from "@/components/Skeleton";

export default function SearchLoading() {
    return (
        <main className="max-w-6xl mx-auto p-4 sm:p-6">
            <Skeleton className="h-8 w-40 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="aspect-video w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                ))}
            </div>
        </main>
    );
}