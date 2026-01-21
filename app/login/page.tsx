'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/services/api';
import { toast } from "sonner";
import { loginSchema, validateForm } from '@/lib/validators';

import Link from 'next/link';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();
    const router = useRouter();
    const [error, setError] = useState("");

    const handleGoogleLogin = () => {
        // We use window.location.href because we need to LEAVE the app 
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents native HTML refresh
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData);

        // Zod Validation
        const validation = validateForm(loginSchema, data);
        if (!validation.success) {
            toast.error(validation.error);
            setLoading(false);
            return;
        }

        try {
            const res = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify(validation.data),
            });

            if (res.ok) {
                const data = await res.json();
                router.refresh();
                setUser(data.user); // Update global state
                toast.success("Welcome back!");

                if (data.user.role === 'admin') {
                    router.push("/dashboard");
                } else {
                    router.push("/");
                }
            } else {
                toast.error("Login Failed. Please check your credentials.");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-md bg-white rounded-4xl shadow-xl border border-slate-100 overflow-hidden relative">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="p-8 md:p-10 relative z-10">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block text-3xl font-bold tracking-tighter text-slate-900 mb-2">
                            <span className="text-primary">Kids</span><span className="text-secondary">World</span>
                        </Link>
                        <h1 className="text-2xl font-black text-slate-900">Welcome Back!</h1>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="email">Email Address</label>
                            <input
                                name="email" // Added name prop
                                id="email"
                                type="email"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-slate-50 focus:bg-white"
                                placeholder="mom@example.com"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-slate-700" htmlFor="password">Password</label>
                                <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:text-secondary transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                            <input
                                name="password" // Added name prop
                                id="password"
                                type="password"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-slate-50 focus:bg-white"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${loading ? 'bg-slate-300' : 'bg-primary hover:bg-secondary'}`}
                        >
                            {loading ? 'Logging In...' : 'Log In'}
                        </button>

                        {/* Google Button */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full py-4 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">...</svg>
                            Google
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500">
                            Don't have an account? {' '}
                            <Link href="/signup" className="font-bold text-primary hover:text-secondary transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;