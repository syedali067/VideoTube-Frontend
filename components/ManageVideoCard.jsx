"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

export default function ManageVideoCard({ video, onChange }) {
    const [loading, setLoading] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [form, setForm] = useState({ title: video.title, description: video.description });
    const [thumbnail, setThumbnail] = useState(null);

    async function handleTogglePublish() {
        setLoading(true);
        try {
            await api.patch(`/videos/toggle/publish/${video._id}`);
            onChange();
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!confirm(`Delete "${video.title}"? This can't be undone.`)) return;
        setLoading(true);
        try {
            await api.delete(`/videos/${video._id}`);
            onChange();
        } finally {
            setLoading(false);
        }
    }

    async function handleEditSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("description", form.description);
            if (thumbnail) formData.append("thumbnail", thumbnail);

            await api.patch(`/videos/${video._id}`, formData, { isFormData: true });
            setEditOpen(false);
            onChange();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-3 bg-surface border border-border rounded-lg p-3">
            <img src={video.thumbnail} alt={video.title} className="w-32 aspect-video object-cover rounded-md flex-shrink-0" />
            <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                    <h3 className="text-sm font-medium text-text truncate">{video.title}</h3>
                    <p className="text-xs text-numeric text-text-muted">{video.views} views</p>
                    <p className="text-xs text-text-muted">{video.isPublished ? "Published" : "Unpublished"}</p>
                </div>
                <div className="flex gap-2 mt-2">
                    <Button variant="secondary" className="text-xs px-2 py-1" onClick={() => setEditOpen(true)}>
                        Edit
                    </Button>
                    <Button variant="secondary" className="text-xs px-2 py-1" onClick={handleTogglePublish} disabled={loading}>
                        {video.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button variant="danger" className="text-xs px-2 py-1" onClick={handleDelete} disabled={loading}>
                        Delete
                    </Button>
                </div>
            </div>

            <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Video">
                <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                    <Input label="Title" id={`title-${video._id}`} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-text-muted">Description</label>
                        <textarea
                            rows={3}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full rounded-lg bg-surface border border-border px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-teal"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-text-muted">Replace Thumbnail (optional)</label>
                        <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} className="text-sm text-text-muted" />
                    </div>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </Modal>
        </div>
    );
}