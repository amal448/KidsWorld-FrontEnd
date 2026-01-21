'use client';
import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { paymentService } from '@/services/paymentService';
import { checkoutSchema, validateForm } from '@/lib/validators';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useShop();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Card'>('COD');
    const [useWallet, setUseWallet] = useState(false);
    const [loading, setLoading] = useState(false);
    const { loading: authLoading, user, checkUser } = useAuth();

    const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (authLoading) {
        //     alert("Please wait, verifying session...");
        //     return;
        // }

        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const rawData = {
            ...Object.fromEntries(formData),
            paymentMethod
        };

        // Zod Validation
        const validation = validateForm(checkoutSchema, rawData);
        if (!validation.success) {
            toast.error(validation.error);
            setLoading(false);
            return;
        }

        const address = {
            firstName: validation.data.firstName,
            lastName: validation.data.lastName,
            email: validation.data.email,
            street: validation.data.street,
            city: validation.data.city,
            state: validation.data.state,
            zipCode: validation.data.zipCode,
        };

        const items = cartItems.map(item => ({
            product: item.id,
            quantity: item.quantity
        }));

        try {
            const result = await paymentService.initiatePayment({
                items,
                paymentMethod,
                address,
                shippingFee: 0, // Free shipping
                useWallet
            });

            if (paymentMethod === 'COD') {
                await checkUser(); // Refresh user data (wallet balance)
                clearCart();
                router.push(`/success?orderId=${result.order._id}`);
            } else {
                // Stripe or other online payment
                if (result.url) {
                    window.location.href = result.url;
                }
            }
        } catch (error: any) {
            console.error("Payment Error:", error);
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-slate-50 py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-black text-slate-900 mb-4">Your Cart is Empty</h1>
                <Link href="/products" className="btn-primary">Go to Shop</Link>
            </main>
        );
    }

    // Price Calculations
    const taxRate = 0.08;
    // Calculate rounded tax as per previous requirement
    const taxAmount = Math.round(cartTotal * taxRate);
    const orderTotal = cartTotal + taxAmount;

    // Wallet Calculations
    const walletBalance = user?.walletBalance || 0;
    console.log("user:", user);
    console.log("Wallet Balance:", walletBalance);

    const walletDeduction = useWallet ? Math.min(walletBalance, orderTotal) : 0;
    const finalAmountToPay = orderTotal - walletDeduction;

    return (
        <main className="min-h-screen bg-slate-50 py-12 md:py-16">
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
                                    <input name="firstName" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                    <input name="lastName" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input name="email" type="email" defaultValue={user?.email || ''} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Street Address</label>
                                <input name="street" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" placeholder="123 Happy St" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                                    <input name="city" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">State</label>
                                    <input name="state" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Zip Code</label>
                                    <input name="zipCode" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6">Payment Method</h2>
                            <div className="space-y-4">
                                <label className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 hover:border-primary/50'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={paymentMethod === 'COD'}
                                        onChange={() => setPaymentMethod('COD')}
                                        className="w-5 h-5 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <span className="ml-3 font-bold text-slate-900">Cash on Delivery</span>
                                    <span className="ml-auto text-sm text-slate-500">Pay when you receive</span>
                                </label>

                                <label className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'Card' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 hover:border-primary/50'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Card"
                                        checked={paymentMethod === 'Card'}
                                        onChange={() => setPaymentMethod('Card')}
                                        className="w-5 h-5 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <span className="ml-3 font-bold text-slate-900">Online Payment (Card)</span>
                                    <span className="ml-auto text-sm text-slate-500">Secured by Stripe</span>
                                </label>
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
                                        <p className="font-bold text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Wallet Toggle */}
                            <div className={`p-4 rounded-2xl border-2 transition-all mb-6 ${useWallet ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-lg">
                                            💰
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">Use Wallet Balance</p>
                                            <p className="text-xs text-slate-500">Available: ₹{walletBalance?.toFixed(2) || '0.00'}</p>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 accent-primary cursor-pointer"
                                        checked={useWallet}
                                        onChange={(e) => setUseWallet(e.target.checked)}
                                        disabled={!walletBalance || walletBalance <= 0}
                                    />
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-2 mb-6 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (Estimated)</span>
                                    <span>₹{taxAmount.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-slate-800">
                                    <span>Order Total</span>
                                    <span>₹{orderTotal.toFixed(2)}</span>
                                </div>

                                {useWallet && walletDeduction > 0 && (
                                    <div className="flex justify-between text-sm font-bold text-green-600">
                                        <span>KidsWorld Wallet</span>
                                        <span>- ₹{walletDeduction.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-lg font-black text-slate-900 pt-3 border-t-2 border-dashed border-slate-100 mt-2">
                                    <span>Final to Pay</span>
                                    <span className="text-primary">₹{finalAmountToPay.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className="width-full btn-primary w-full py-4 text-center justify-center shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : `Pay ₹${finalAmountToPay.toFixed(2)}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;