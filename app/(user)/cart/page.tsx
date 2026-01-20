'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '../../context/ShopContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useShop();

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-slate-50 py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-4xl mb-6">🛒</div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">Your Cart is Empty</h1>
                <p className="text-slate-500 mb-8 max-w-md">Looks like you haven't added anything yet. Explore our toys and find something fun!</p>
                <Link href="/products" className="btn-primary">
                    Start Shopping
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                <h1 className="text-4xl font-black text-slate-900 font-display mb-8">Your Cart ({cartItems.length})</h1>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Cart Items List */}
                    <div className="flex-1 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-4 md:gap-6 items-center shadow-sm">
                                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{item.name}</h3>
                                            {item.color && (
                                                <p className="text-sm text-slate-500">Color: {item.color}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-2"
                                            aria-label="Remove item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1 border border-slate-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition-colors font-bold"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition-colors font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="text-xl font-black text-secondary">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={clearCart} className="text-sm text-red-500 hover:underline mt-4">Clear Cart</button>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-lg lg:sticky lg:top-32">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 text-slate-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (Estimated)</span>
                                    <span className="font-bold text-slate-900">${(cartTotal * 0.08).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="border-t border-slate-100 pt-4 mb-8 flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-900">Total</span>
                                <span className="text-3xl font-black text-primary">${(cartTotal * 1.08).toFixed(2)}</span>
                            </div>
                            <Link href="/checkout" className="btn-primary w-full py-4 text-lg justify-center shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 block text-center">
                                Proceed to Checkout
                            </Link>
                            <p className="text-xs text-center text-slate-400 mt-4">
                                Secure Checkout - 100% Satisfaction Guaranteed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cart;
