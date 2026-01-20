import { apiFetch } from "./api";

export const authService = {
    // Current refresh logic
    refreshSession: async () => {
        return await apiFetch("/auth/refresh-token");
    },

    // New Logout logic
    logout: async () => {
        // This calls your Node.js backend to clear cookies or blacklist tokens
        return await apiFetch("/auth/logout", { method: "POST" });
    }
};