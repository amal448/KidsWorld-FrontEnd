'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import { forgotPasswordSchema, validateForm } from '@/lib/validators';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        const validation = validateForm(forgotPasswordSchema, { email });
        if (!validation.success) {
            toast.error(validation.error);
            setLoading(false);
            return;
        }

        try {
            await authService.forgotPassword(email);
            // Always show success message for security reasons
            toast.success("If an account exists, a reset link has been sent to your email.");
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-md bg-white rounded-4xl shadow-xl border border-slate-100 overflow-hidden relative">
                <div className="p-8 md:p-10 relative z-10">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black text-slate-900 mb-2">Forgot Password?</h1>
                        <p className="text-slate-500">Enter your email and we'll send you a link to reset your password.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-slate-50 focus:bg-white"
                                placeholder="mom@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-primary hover:bg-secondary cursor-pointer'}`}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link href="/login" className="font-bold text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-2">
                            <span>←</span> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ForgotPassword;
