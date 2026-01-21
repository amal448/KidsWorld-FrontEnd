'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Check, Clock, Package, Truck, XCircle, AlertTriangle } from 'lucide-react';

import { orderService } from '@/services/orderService';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const OrderStatusStepper = ({ status, createdAt, updatedAt }: { status: string, createdAt: string, updatedAt?: string }) => {
    const steps = [
        { label: 'Placed', icon: Clock, key: 'Placed' },
        { label: 'Processing', icon: Package, key: 'Processing' },
        { label: 'Out for Delivery', icon: Truck, key: 'OutForDelivery' },
        { label: 'Delivered', icon: Check, key: 'Delivered' },
    ];

    const currentStepIndex = steps.findIndex(s => s.key === status);
    const isCancelled = status === 'Cancelled';

    if (isCancelled) {
        return (
            <div className="w-full bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-600">
                <XCircle className="w-5 h-5" />
                <div className="flex-1">
                    <p className="font-bold text-sm uppercase tracking-wide">Order Cancelled</p>
                    {updatedAt && <p className="text-xs opacity-75">Updated on {new Date(updatedAt).toLocaleDateString()}</p>}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full py-4">
            <div className="flex items-center justify-between relative">
                {/* Progress Bar Background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full -z-10"></div>

                {/* Active Progress Bar */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full -z-10 transition-all duration-500"
                    style={{ width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isActive = index <= currentStepIndex;
                    const isCompleted = index < currentStepIndex;
                    const Icon = step.icon;

                    return (
                        <div key={step.key} className="flex flex-col items-center gap-2 bg-white px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive ? 'bg-green-500 border-green-500 text-white shadow-md scale-110' : 'bg-white border-slate-200 text-slate-300'
                                }`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <p className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${isActive ? 'text-green-600' : 'text-slate-300'
                                }`}>{step.label}</p>
                            {/* Show date for placed and current status if available */}
                            {index === 0 && <p className="text-[10px] text-slate-400 font-medium hidden md:block">{new Date(createdAt).toLocaleDateString()}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Orders = () => {
    const [orders, setOrders] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [cancellingId, setCancellingId] = React.useState<string | null>(null);
    const { loading: authLoading, user, checkUser } = useAuth();
    const router = useRouter();

    const fetchOrders = React.useCallback(async () => {
        try {
            const data = await orderService.getMyOrders();
            setOrders(Array.isArray(data) ? data : data.orders || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push("/login");
            return;
        }
        fetchOrders();
    }, [authLoading, user, router, fetchOrders]);

    const handleCancelOrder = async (orderId: string) => {
        try {
            setCancellingId(orderId);
            await orderService.cancelOrder(orderId);
            await checkUser(); // Refresh user data to update wallet refund if applicable
            toast.success("Order cancelled successfully");
            fetchOrders(); // Refresh list
        } catch (error: any) {
            toast.error(error.message || "Failed to cancel order");
        } finally {
            setCancellingId(null);
        }
    };

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

                <div className="space-y-8">
                    {orders.map((order) => {
                        const canCancel = ['Placed', 'Processing'].includes(order.orderStatus || order.status) && order.status !== 'Cancelled';

                        return (
                            <div key={order._id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="font-bold text-lg text-slate-900">Order #{order._id.slice(-6).toUpperCase()}</p>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${order.paymentStatus === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' :
                                                order.paymentStatus === 'Failed' ? 'bg-red-50 text-red-600 border-red-100' :
                                                    'bg-yellow-50 text-yellow-600 border-yellow-100'
                                                }`}>
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Amount</p>
                                        <p className="font-black text-2xl text-slate-900">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>

                                <Separator className="mb-6" />

                                {/* Stepper */}
                                <div className="mb-8">
                                    <OrderStatusStepper status={order.orderStatus || order.status} createdAt={order.createdAt} updatedAt={order.updatedAt} />
                                </div>

                                {/* Items */}
                                <div className="space-y-4 mb-6">
                                    {order.items.map((item: any, idx: number) => {
                                        const img = item.product?.images?.[0]?.url || item.image || "/images/product-placeholder.png";
                                        const name = item.product?.name || item.name || "Product";
                                        const price = item.priceAtPurchase || item.price || 0;

                                        return (
                                            <div key={idx} className="flex gap-4 items-center">
                                                <div className="w-16 h-16 relative bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                                                    <Image src={img} alt={name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-slate-900 line-clamp-1">{name}</p>
                                                    <p className="text-sm text-slate-500">Qty: {item.quantity} × ₹{price.toLocaleString('en-IN')}</p>
                                                </div>
                                                <p className="font-bold text-slate-900">₹{(price * item.quantity).toLocaleString('en-IN')}</p>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Footer / Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <p className="text-sm font-medium text-slate-500">
                                        Payment Method: <span className="text-slate-900 font-bold">{order.paymentMethod}</span>
                                    </p>

                                    {canCancel && (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700">
                                                    Cancel Order
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="flex items-center gap-2 text-red-600">
                                                        <AlertTriangle className="w-5 h-5" />
                                                        Cancel Order?
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to cancel this order?
                                                        {order.paymentMethod !== 'COD' && " Any amount paid will be refunded to your wallet."}
                                                        This action cannot be undone.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button variant="outline" onClick={() => { }}>Back</Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => handleCancelOrder(order._id)}
                                                        disabled={cancellingId === order._id}
                                                    >
                                                        {cancellingId === order._id ? "Cancelling..." : "Confirm Cancellation"}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default Orders;
