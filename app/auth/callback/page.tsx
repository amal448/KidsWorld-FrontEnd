'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function AuthCallback() {
    const router = useRouter();
    const { user, loading } = useAuth(); // Use global state instead of calling checkUser again

    useEffect(() => {
        if (!loading) {
            if (user) {
                toast.success("Welcome back!");
                router.replace('/');
            } else {
                // Only redirect to login if we explicitly failed to load a user
                // after the loading phase is done.
                toast.error("Authentication failed. Please try again.");
                router.replace('/login');
            }
        }
    }, [user, loading, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-600 font-bold italic">Securely logging you in...</p>
            </div>
        </div>
    );
}