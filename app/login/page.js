"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await api.post("/users/login", form);
            setUser(res.data.user);
            router.push("/feed");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="max-w-md mx-auto px-4 py-12">
            <Card className="flex flex-col gap-4">
                <h1 className="text-display text-2xl font-semibold">Welcome back</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input label="Email" name="email" id="email" type="email" value={form.email} onChange={handleChange} required />
                    <Input label="Password" name="password" id="password" type="password" value={form.password} onChange={handleChange} required />

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <p className="text-sm text-text-muted text-center">
                    No account?{" "}
                    <Link href="/register" className="text-teal hover:underline">
                        Register
                    </Link>
                </p>
            </Card>
        </main>
    );
}