"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import Button from "@/components/ui/Button";

export default function SubscribeButton({ channelId, initialSubscribed = false }) {
    const [subscribed, setSubscribed] = useState(initialSubscribed);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function handleClick() {
        setLoading(true);
        setErrorMsg("");
        try {
            const res = await api.post(`/subscriptions/c/${channelId}`);
            setSubscribed(res.data.subscribed);
        } catch (err) {
            console.error("Subscribe error:", err.message, err.statusCode);
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-1">
            <Button
                variant={subscribed ? "secondary" : "primary"}
                onClick={handleClick}
                disabled={loading}
            >
                {subscribed ? "Subscribed" : "Subscribed"}
            </Button>
            {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
        </div>
    );
}