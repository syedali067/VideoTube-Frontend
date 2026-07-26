"use client";

import Button from "@/components/ui/Button";

export default function GlobalError({ error, reset }) {
    return (
        <main className="max-w-md mx-auto p-6 text-center flex flex-col items-center gap-4 mt-20">
            <h1 className="text-display text-xl font-semibold">Something went wrong</h1>
            <p className="text-text-muted text-sm">{error.message || "Please try again."}</p>
            <Button variant="primary" onClick={reset}>Try again</Button>
        </main>
    );
}