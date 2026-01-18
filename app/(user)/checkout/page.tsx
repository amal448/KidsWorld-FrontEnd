'use client';
import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useShop();
    const router = useRouter(); // Use App Router

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            clearCart();
            router.push('/success');
        }, 1500);
    };



    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-slate-50 py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-black text-slate-900 mb-4">Your Cart is Empty</h1>
                <Link href="/products" className="btn-primary">Go to Shop</Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
                <h1 className="text-4xl font-black text-slate-900 font-display mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Billing Form */}
                    <div className="flex-1 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Billing Details</h2>
                        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Street Address</label>
                                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" placeholder="123 Happy St" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">State</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Zip Code</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6">Payment</h2>
                            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 text-sm">
                                🔒 This is a demo. No payment is actually processed.
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Card Number (Demo)</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl sticky top-32">
                            <h3 className="text-xl font-black text-slate-900 mb-6">Your Order</h3>
                            <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-12 h-12 bg-slate-100 rounded-lg relative overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 text-sm">
                                            <p className="font-bold text-slate-900 line-clamp-1">{item.name}</p>
                                            <p className="text-slate-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-2 mb-6 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-black text-slate-900 pt-2 border-t border-slate-100 mt-2">
                                    <span>Total</span>
                                    <span className="text-primary">${(cartTotal * 1.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                className="width-full btn-primary w-full py-4 text-center justify-center shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;