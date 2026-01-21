'use client';
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import { resetPasswordSchema, validateForm } from '@/lib/validators';

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const userId = searchParams.get('id');
    const token = searchParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);


        // Validation
        const validation = validateForm(resetPasswordSchema, { password, confirmPassword });
        if (!validation.success) {
            toast.error(validation.error);
            setLoading(false);
            return;
        }

        if (!userId || !token) {
            toast.error("Invalid reset link. Please try requesting a new one.");
            setLoading(false);
            return;
        }

        try {
            await authService.resetPassword(userId, token, password);
            toast.success("Password successfully reset! Redirecting to login...");
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err: any) {
            toast.error(err.message || "Something went wrong. Please try requesting a new link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-4xl shadow-xl border border-slate-100 overflow-hidden relative">
            <div className="p-8 md:p-10 relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-black text-slate-900 mb-2">Reset Password</h1>
                    <p className="text-slate-500">Enter your new password below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="password">New Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-slate-50 focus:bg-white"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-slate-50 focus:bg-white"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-primary hover:bg-secondary cursor-pointer'}`}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const ResetPassword = () => {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </main>
    )
}

export default ResetPassword;
