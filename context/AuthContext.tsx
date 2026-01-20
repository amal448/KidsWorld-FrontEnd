'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '@/services/api';
import { tokenStore } from '@/services/tokenStore';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null); // Stores { name, role, id }
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check login status on page refresh
    useEffect(() => {
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
                    // router.replace("/"); // ✅ redirect to home
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
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
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);