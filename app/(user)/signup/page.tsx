'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate signup delay
        setTimeout(() => {
            setIsLoading(false);
            alert("Account Created Successfully!");
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden relative">
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl translate-y-1/2 translate-x-1/2"></div>

                <div className="p-8 md:p-10 relative z-10">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block text-3xl font-bold tracking-tighter text-slate-900 mb-2">
                            <span className="text-primary">Kids</span><span className="text-secondary">World</span>
                        </Link>
                        <h1 className="text-2xl font-black text-slate-900 font-display">Join the Fun!</h1>
                        <p className="text-slate-500 mt-2">Create an account to start shopping.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-slate-50 focus:bg-white"
                                placeholder="Super Mom"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-slate-50 focus:bg-white"
                                placeholder="mom@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-slate-50 focus:bg-white"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="confirm-password">Confirm Password</label>
                            <input
                                id="confirm-password"
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-slate-50 focus:bg-white"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg shadow-secondary/30 mt-2 ${isLoading ? 'bg-slate-300 cursor-not-allowed' : 'bg-secondary hover:bg-primary hover:shadow-xl hover:-translate-y-1'}`}
                        >
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500">Or continue with</span></div>
                        </div>

                        <button type="button" className="w-full py-4 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500">
                            Already have an account? {' '}
                            <Link href="/login" className="font-bold text-primary hover:text-secondary transition-colors">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;
