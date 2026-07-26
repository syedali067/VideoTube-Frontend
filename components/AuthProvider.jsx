"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({ children }) {
    const setUser = useAuthStore((state) => state.setUser);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        async function loadUser() {
            try {
                const res = await api.get("/users/current-user");
                setUser(res.data);
            } catch {
                // not logged in — that's fine, just continue as anonymous
            } finally {
                setChecked(true);
            }
        }
        loadUser();
    }, [setUser]);

    if (!checked) return null; // avoids a flash of "logged out" navbar before the check finishes

    return children;
}