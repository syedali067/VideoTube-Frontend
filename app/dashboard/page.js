"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Card from "@/components/ui/Card";

export default function DashboardPage() {
    const { data, isLoading } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: () => api.get("/dashboard/stats"),
    });

    const stats = data?.data;

    if (isLoading) return <p className="p-6 text-text-muted">Loading...</p>;

    const items = [
        { label: "Total Videos", value: stats.totalVideos },
        { label: "Total Views", value: stats.totalViews },
        { label: "Subscribers", value: stats.totalSubscribers },
        { label: "Total Likes", value: stats.totalLikes },
    ];

    return (
        <main className="max-w-4xl mx-auto p-4 sm:p-6">
            <h1 className="text-display text-2xl font-semibold mb-6">Channel Dashboard</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {items.map((item) => (
                    <Card key={item.label} className="text-center">
                        <p className="text-numeric text-2xl font-semibold text-gold">{item.value}</p>
                        <p className="text-sm text-text-muted mt-1">{item.label}</p>
                    </Card>
                ))}
            </div>
        </main>
    );
}