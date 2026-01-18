'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Orders = () => {
    // Mock Data
    const orders = [
        {
            id: "#KW-4092",
            date: "Jan 15, 2026",
            status: "Delivered",
            total: 129.98,
            items: [
                { name: "Robot Rex", image: "/images/product-placeholder.png" },
                { name: "Magic Castle", image: "/images/product-placeholder.png" }
            ]
        },
        {
            id: "#KW-3155",
            date: "Dec 22, 2025",
            status: "Processing",
            total: 49.99,
            items: [
                { name: "Space Shuttle", image: "/images/product-placeholder.png" }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h1 className="text-4xl font-black text-slate-900 font-display">My Orders</h1>
                    <Link href="/products" className="btn-secondary text-sm px-6">Start New Order</Link>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 pb-6 border-b border-slate-50">
                                <div>
                                    <p className="font-bold text-lg text-slate-900">{order.id}</p>
                                    <p className="text-slate-500 text-sm">{order.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {order.status}
                                    </span>
                                    <span className="font-black text-xl text-slate-900">${order.total}</span>
                                </div>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="w-16 h-16 relative bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                ))}
                                {order.items.length > 3 && (
                                    <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 text-xs font-bold border border-slate-100">
                                        +{order.items.length - 3}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-50 md:hidden">
                                <button className="w-full py-3 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50">View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Orders;
