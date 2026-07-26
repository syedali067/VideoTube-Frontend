"use client";

import { useEffect } from "react";
import { useToastStore } from "@/store/toastStore";

export default function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    useEffect(() => {
        const timers = toasts.map((toast) =>
            setTimeout(() => removeToast(toast.id), 3000)
        );
        return () => timers.forEach(clearTimeout);
    }, [toasts, removeToast]);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`px-4 py-2 rounded-lg text-sm shadow-lg border ${
                        toast.type === "error"
                            ? "bg-red-500/10 border-red-500/30 text-red-400"
                            : "bg-surface border-border text-text"
                    }`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}