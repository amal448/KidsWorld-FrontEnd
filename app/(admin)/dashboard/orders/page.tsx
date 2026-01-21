'use client';

import { useState, useEffect } from 'react';
import { orderService } from '@/services/orderService';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { Eye } from 'lucide-react';

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await orderService.getAllOrders();
            setOrders(Array.isArray(data) ? data : data.orders || []);
        } catch (error) {
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            await orderService.updateOrderStatus(orderId, newStatus);
            toast.success(`Order updated to ${newStatus}`);

            // Optimistic update
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder((prev: any) => ({ ...prev, orderStatus: newStatus }));
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    // Filter logic
    const activeOrders = orders.filter(o => ['Placed', 'Processing', 'OutForDelivery'].includes(o.orderStatus));
    const historyOrders = orders.filter(o => ['Delivered', 'Cancelled'].includes(o.orderStatus));

    const displayedOrders = activeTab === 'active' ? activeOrders : historyOrders;

    const statusColors: any = {
        'Placed': 'bg-blue-50 text-blue-700 ring-blue-600/20',
        'Processing': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        'OutForDelivery': 'bg-purple-50 text-purple-700 ring-purple-600/20',
        'Delivered': 'bg-green-50 text-green-700 ring-green-600/20',
        'Cancelled': 'bg-red-50 text-red-700 ring-red-600/20',
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-black text-slate-900">Orders</h1>
                <Button onClick={loadOrders} variant="outline">Refresh</Button>
            </div>

            {/* Custom Tabs */}
            <div className="flex gap-4 border-b border-slate-200 mb-6">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'active'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Active Orders ({activeOrders.length})
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'history'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Order History ({historyOrders.length})
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-bold text-slate-700 font-display'>Order ID</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Customer</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Total</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Status</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Update Status</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display text-right'>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">Loading...</TableCell>
                            </TableRow>
                        ) : displayedOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-slate-500">No {activeTab} orders found.</TableCell>
                            </TableRow>
                        ) : displayedOrders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell className="font-medium text-xs font-mono">{order._id.substring(order._id.length - 6).toUpperCase()}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm">{order.user?.name || 'Guest'}</span>
                                        <span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </TableCell>
                                <TableCell>₹{order.totalAmount?.toFixed(2)}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${statusColors[order.orderStatus] || 'bg-gray-50 text-gray-600 ring-gray-500/10'}`}>
                                        {order.orderStatus}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={order.orderStatus}
                                        onValueChange={(val) => handleStatusUpdate(order._id, val)}
                                    >
                                        <SelectTrigger className="w-[140px] h-8 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Placed">Placed</SelectItem>
                                            <SelectItem value="Processing">Processing</SelectItem>
                                            <SelectItem value="OutForDelivery">Out For Delivery</SelectItem>
                                            <SelectItem value="Delivered">Delivered</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className='h-8 w-8 p-0 hover:bg-slate-100 rounded-full'
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <Eye className="h-4 w-4 text-slate-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Order Details Modal */}
            <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Order Details <span className='text-slate-400 font-mono text-sm ml-2'>#{selectedOrder?._id.substring(selectedOrder?._id.length - 6).toUpperCase()}</span></DialogTitle>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="grid gap-6">
                            {/* Items List */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-sm text-slate-900 mb-3">Items</h4>
                                <div className="space-y-3">
                                    {selectedOrder.items?.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                            <div className="flex gap-3 items-center">
                                                <div className="bg-white h-8 w-8 rounded border flex items-center justify-center text-xs font-bold text-slate-400">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{item.product?.name || 'Product'}</p>
                                                    <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Shipping */}
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900 mb-2">Shipping Address</h4>
                                    <div className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100 h-full">
                                        <p className="font-medium text-slate-900 mb-1">{selectedOrder.user?.name}</p>
                                        <p>{selectedOrder.deliveryAddress?.street}</p>
                                        <p>{selectedOrder.deliveryAddress?.city}, {selectedOrder.deliveryAddress?.state}</p>
                                        <p>{selectedOrder.deliveryAddress?.zipCode}</p>
                                        <p className="mt-2 text-xs text-slate-400">{selectedOrder.user?.email}</p>
                                    </div>
                                </div>

                                {/* Payment */}
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900 mb-2">Payment Info</h4>
                                    <div className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100 h-full">
                                        <div className="flex justify-between mb-1">
                                            <span>Method:</span>
                                            <span className="font-medium text-slate-900">{selectedOrder.paymentMethod}</span>
                                        </div>
                                        <div className="flex justify-between mb-1">
                                            <span>Status:</span>
                                            <span className={`font-medium ${selectedOrder.paymentStatus === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>{selectedOrder.paymentStatus}</span>
                                        </div>
                                        <div className="my-2 border-t border-slate-100"></div>
                                        <div className="flex justify-between font-bold text-slate-900">
                                            <span>Total:</span>
                                            <span>₹{selectedOrder.totalAmount?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
