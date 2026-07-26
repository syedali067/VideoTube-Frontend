"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", email: "", fullName: "", password: "" });
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!avatar) {
            setError("Avatar is required");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => formData.append(key, value));
            formData.append("avatar", avatar);
            if (coverImage) formData.append("coverImage", coverImage);

            await api.post("/users/register", formData, { isFormData: true });
            router.push("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="max-w-md mx-auto px-4 py-12">
            <Card className="flex flex-col gap-4">
                <h1 className="text-display text-2xl font-semibold">Create your account</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input label="Full Name" name="fullName" id="fullName" value={form.fullName} onChange={handleChange} required />
                    <Input label="Username" name="username" id="username" value={form.username} onChange={handleChange} required />
                    <Input label="Email" name="email" id="email" type="email" value={form.email} onChange={handleChange} required />
                    <Input label="Password" name="password" id="password" type="password" value={form.password} onChange={handleChange} required />

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-text-muted">Avatar (required)</label>
                        <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} className="text-sm text-text-muted" required />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-text-muted">Cover Image (optional)</label>
                        <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} className="text-sm text-text-muted" />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? "Creating account..." : "Register"}
                    </Button>
                </form>
            </Card>
        </main>
    );
}