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
    },

    verifyOtp: async (email: string, otp: string) => {
        return await apiFetch("/auth/verify-otp", {
            method: "POST",
            body: JSON.stringify({ email, otp }),
        });
    },

    forgotPassword: async (email: string) => {
        return await apiFetch("/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({ email }),
        });
    },

    resetPassword: async (userId: string, token: string, newPassword: string) => {
        return await apiFetch("/auth/reset-password", {
            method: "POST",
            body: JSON.stringify({ userId, token, newPassword }),
        });
    }
};