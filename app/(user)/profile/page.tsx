'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, User as UserIcon, Wallet, ShoppingBag, ShieldCheck } from 'lucide-react';

const Profile = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    console.log("user profile", user);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">My Profile</h1>

            <Card className="border-slate-100 shadow-lg overflow-hidden bg-white">
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                    <div className="absolute inset-0 bg-white/10 pattern-dots"></div>
                </div>

                <CardContent className="relative pt-0 px-6 sm:px-10 pb-10">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8 text-center sm:text-left">
                        <Avatar className="h-32 w-32 border-[6px] border-white shadow-md bg-white">
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=128`} alt={user.name} />
                            <AvatarFallback className="text-4xl font-bold bg-slate-100 text-slate-500">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 pb-4">
                            <h2 className="text-3xl font-bold text-slate-900 mb-1">{user.name}</h2>
                            <div className="flex items-center justify-center sm:justify-start gap-2">
                                <Badge variant="secondary" className="text-xs px-2 py-0.5 font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border-blue-100">
                                    Customer
                                </Badge>
                                {user.role === 'admin' && (
                                    <Badge variant="outline" className="text-xs px-2 py-0.5 font-bold uppercase tracking-wider border-purple-200 text-purple-600 bg-purple-50">
                                        Admin
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8">
                        {/* Personal Information Section */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <UserIcon className="w-4 h-4" /> Personal Details
                            </h3>
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 border border-slate-100 shrink-0">
                                        <UserIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Full Name</p>
                                        <p className="text-lg font-semibold text-slate-900 break-words">{user.name}</p>
                                    </div>
                                </div>
                                <div className="w-full h-px bg-slate-200/50"></div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 border border-slate-100 shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Email Address</p>
                                        <p className="text-lg font-semibold text-slate-900 break-all">{user.email}</p>
                                    </div>
                                </div>
                                <div className="w-full h-px bg-slate-200/50"></div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 border border-slate-100 shrink-0">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">User ID</p>
                                        <p className="text-sm font-mono font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md break-all">
                                            {user.id || user._id || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Wallet className="w-4 h-4" /> Account Overview
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Wallet Balance */}
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100 flex items-center gap-4 group hover:shadow-sm transition-all duration-300">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm group-hover:scale-110 transition-transform">
                                        <Wallet className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-green-600/80 uppercase tracking-wider mb-0.5">Wallet Balance</p>
                                        <p className="text-2xl font-black text-slate-800">
                                            ₹{user.walletBalance?.toLocaleString('en-IN') || '0'}
                                        </p>
                                    </div>
                                </div>

                                {/* Orders Summary */}
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 flex items-center gap-4 group hover:shadow-sm transition-all duration-300 cursor-pointer" onClick={() => router.push('/orders')}>
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                        <ShoppingBag className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-blue-600/80 uppercase tracking-wider mb-0.5">My Orders</p>
                                        <p className="text-lg font-bold text-slate-800 flex items-center gap-1 group-hover:text-blue-700 transition-colors">
                                            View History <span>→</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;