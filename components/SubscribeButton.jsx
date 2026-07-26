"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import Button from "@/components/ui/Button";

export default function SubscribeButton({ channelId, initialSubscribed = false }) {
    const [subscribed, setSubscribed] = useState(initialSubscribed);
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        setLoading(true);
        try {
            const res = await api.post(`/subscriptions/c/${channelId}`);
            setSubscribed(res.data.subscribed);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            variant={subscribed ? "secondary" : "primary"}
            onClick={handleClick}
            disabled={loading}
        >
            {subscribed ? "Subscribed" : "Subscribe"}
        </Button>
    );
}