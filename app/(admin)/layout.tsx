'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Users, ShoppingBag, Layers, CreditCard, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAuth();

    // Simple verification check to ensure user is admin (client-side)
    // In a real app, middleware should also protect this route
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    // Protect render until redirect happens
    if (!user || user.role !== 'admin') return null;

    const links = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/users', label: 'Users', icon: Users },
        { href: '/dashboard/products', label: 'Products', icon: ShoppingBag },
        { href: '/dashboard/categories', label: 'Categories', icon: Layers },
        { href: '/dashboard/orders', label: 'Orders', icon: CreditCard },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white transition-transform">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-slate-900">
                        <span className="text-primary">Kids</span>World <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">Admin</span>
                    </Link>
                </div>

                <div className="flex flex-col h-[calc(100vh-64px)] justify-between py-6 px-3">
                    <nav className="space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="space-y-1 border-t pt-4">
                        <Link
                            href="/"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        >
                            <Home className="h-4 w-4" />
                            Back to Store
                        </Link>
                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 w-full p-8">
                {children}
            </main>
        </div>
    );
}
