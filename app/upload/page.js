"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function UploadPage() {
    const router = useRouter();
    const [form, setForm] = useState({ title: "", description: "" });
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!videoFile || !thumbnail) {
            setError("Both video file and thumbnail are required");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("videoFile", videoFile);
            formData.append("thumbnail", thumbnail);

            const res = await api.post("/videos", formData, { isFormData: true });
            router.push(`/watch/${res.data._id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="max-w-lg mx-auto p-4 sm:p-6">
            <Card className="flex flex-col gap-4">
                <h1 className="text-display text-2xl font-semibold">Upload a Video</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input label="Title" id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="description" className="text-sm text-text-muted">Description</label>
                        <textarea
                            id="description"
                            rows={4}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full rounded-lg bg-surface border border-border px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-teal"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-text-muted">Video File</label>
                        <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} className="text-sm text-text-muted" required />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-text-muted">Thumbnail</label>
                        <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} className="text-sm text-text-muted" required />
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? "Uploading..." : "Publish Video"}
                    </Button>
                </form>
            </Card>
        </main>
    );
}