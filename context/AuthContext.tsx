'use client';
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { apiFetch } from '@/services/api';
import { tokenStore } from '@/services/tokenStore';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null); // Stores { name, role, id }
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkUser = async () => {
        try {
            const res = await apiFetch("/auth/refresh-token");
            if (res.ok) {
                const data = await res.json();
                console.log("[AuthContext] Refresh response:", data);
                if (data.accessToken) {
                    tokenStore.setToken(data.accessToken);
                } else {
                    console.error("[AuthContext] No accessToken in refresh response!");
                }
                setUser(data.user);
                return true; // Login success
            }
            return false; // Login failed (e.g., 401)
        } catch (err) {
            setUser(null);
            return false; // Login failed
        } finally {
            setLoading(false);
        }
    };
    const isInitialized = useRef(false);

    // Check login status on page refresh
    useEffect(() => {
        const init = async () => {
            // Prevent double-firing in Strict Mode
            if (isInitialized.current) return;
            isInitialized.current = true;

            await checkUser().catch(() => { });
            setLoading(false);
        };
        init();
    }, []);
    const logout = async () => {
        try {
            await authService.logout(); // 1. Call Backend
            setUser(null);              // 2. Clear State
            router.push('/');      // 3. Redirect
        } catch (err) {
            console.error("Logout failed", err);
        }
    };
    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);