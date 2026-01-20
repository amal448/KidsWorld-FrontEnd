'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { orderService } from '@/services/orderService';
import { useAuth } from '@/context/AuthContext';

const Orders = () => {
    const [orders, setOrders] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const { loading: authLoading, user } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (authLoading) return; // Wait for auth check to complete

        if (!user) {
            router.push("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const data = await orderService.getMyOrders();
                // Depending on backend structure, data might be { orders: [...] } or just [...]
                setOrders(Array.isArray(data) ? data : data.orders || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [authLoading]);

    if (authLoading || loading) {
        return (
            <main className="min-h-screen bg-slate-50 py-24 md:py-32 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </main>
        );
    }

    if (orders.length === 0) {
        return (
            <main className="min-h-screen bg-slate-50 py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-3xl font-black text-slate-900 mb-4">No Orders Yet</h1>
                    <p className="text-slate-500 mb-8">Looks like you haven't placed any orders yet.</p>
                    <Link href="/products" className="btn-primary">Start Shopping</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h1 className="text-4xl font-black text-slate-900 font-display">My Orders</h1>
                    <Link href="/products" className="btn-secondary text-sm px-6">Start New Order</Link>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 pb-6 border-b border-slate-50">
                                <div>
                                    <p className="font-bold text-lg text-slate-900">Order #{order._id.slice(-6).toUpperCase()}</p>
                                    <p className="text-slate-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {order.orderStatus || order.status || 'Processing'}
                                    </span>
                                    <span className="font-black text-xl text-slate-900">₹{order.totalAmount}</span>
                                </div>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {order.items.map((item: any, idx: number) => {
                                    // Handle cases where product details might be populated or embedded
                                    const img = item.product?.images?.[0]?.url || item.image || "/images/product-placeholder.png";
                                    const name = item.product?.name || item.name || "Product";

                                    return (
                                        <div key={idx} className="w-16 h-16 relative bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                                            <Image src={img} alt={name} fill className="object-cover" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Orders;
