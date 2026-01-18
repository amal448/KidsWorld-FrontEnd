'use client';
import React from 'react';
import Link from 'next/link';

const PaymentFailure = () => {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="bg-white rounded-[2rem] p-10 md:p-14 text-center max-w-lg w-full shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>

                <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-5xl mb-8 mx-auto shadow-lg shadow-red-100">
                    ✕
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-slate-900 font-display mb-4">Payment Failed</h1>
                <p className="text-slate-500 mb-8 text-lg">
                    Oops! Something went wrong with your transaction. Don't worry, you haven't been charged.
                </p>

                <div className="flex flex-col gap-3">
                    <Link href="/checkout" className="btn-primary w-full py-4 text-center justify-center shadow-lg shadow-primary/20 bg-red-500 hover:bg-red-600">
                        Try Again
                    </Link>
                    <Link href="/contact" className="text-slate-500 hover:text-slate-800 font-bold py-2 transition-colors">
                        Contact Support
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default PaymentFailure;
