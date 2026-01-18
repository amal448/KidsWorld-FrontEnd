'use client';
import React from 'react';
import Link from 'next/link';

const PaymentSuccess = () => {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="bg-white rounded-[2rem] p-10 md:p-14 text-center max-w-lg w-full shadow-xl border border-slate-100 relative overflow-hidden">
                {/* Confetti Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>

                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mb-8 mx-auto shadow-lg shadow-green-100 animate-bounce">
                    ✓
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-slate-900 font-display mb-4">Payment Successful!</h1>
                <p className="text-slate-500 mb-8 text-lg">
                    Hooray! Your order has been placed. We've sent a confirmation email with all the details.
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-2xl font-black text-slate-800 tracking-wider">#KW-{Math.floor(1000 + Math.random() * 9000)}</p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link href="/orders" className="btn-secondary w-full py-4 text-center justify-center">
                        View Order
                    </Link>
                    <Link href="/products" className="btn-primary w-full py-4 text-center justify-center shadow-lg shadow-primary/20">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default PaymentSuccess;
