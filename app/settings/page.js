"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";

export default function SettingsPage() {
    const { user, setUser } = useAuthStore();
    const [form, setForm] = useState({ fullName: user?.fullName || "", email: user?.email || "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleAccountUpdate(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.patch("/users/update-account", form);
            setUser(res.data);
            setMessage("Account updated successfully");
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleImageUpload(field, file) {
        if (!file) return;
        const formData = new FormData();
        formData.append(field, file);
        try {
            const endpoint = field === "avatar" ? "/users/avatar" : "/users/cover-image";
            const res = await api.patch(endpoint, formData, { isFormData: true });
            setUser(res.data);
        } catch (err) {
            setMessage(err.message);
        }
    }

    if (!user) return null;

    return (
        <main className="max-w-md mx-auto p-4 sm:p-6 flex flex-col gap-6">
            <h1 className="text-display text-2xl font-semibold">Channel Settings</h1>

            <Card className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <Avatar src={user.avatar} size="lg" />
                    <div>
                        <label className="text-sm text-teal cursor-pointer">
                            Change avatar
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload("avatar", e.target.files[0])} />
                        </label>
                    </div>
                </div>
                <label className="text-sm text-teal cursor-pointer">
                    Change cover image
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload("coverImage", e.target.files[0])} />
                </label>
            </Card>

            <Card>
                <form onSubmit={handleAccountUpdate} className="flex flex-col gap-4">
                    <Input label="Full Name" id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                    <Input label="Email" id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    {message && <p className="text-sm text-text-muted">{message}</p>}
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </Card>
        </main>
    );
}