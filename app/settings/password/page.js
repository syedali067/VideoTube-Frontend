"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ChangePasswordPage() {
    const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            await api.post("/users/change-password", form);
            setMessage("Password changed successfully");
            setForm({ oldPassword: "", newPassword: "" });
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="max-w-md mx-auto p-4 sm:p-6">
            <Card className="flex flex-col gap-4">
                <h1 className="text-display text-xl font-semibold">Change Password</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input label="Current Password" id="oldPassword" type="password" value={form.oldPassword} onChange={(e) => setForm({ ...form, oldPassword: e.target.value })} required />
                    <Input label="New Password" id="newPassword" type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required />
                    {message && <p className="text-sm text-text-muted">{message}</p>}
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? "Updating..." : "Update Password"}
                    </Button>
                </form>
            </Card>
        </main>
    );
}