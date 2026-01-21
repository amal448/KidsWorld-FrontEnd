import { apiFetch } from "./api";

export const orderService = {
    getMyOrders: async () => {
        const res = await apiFetch('/order/myorders');
        if (!res.ok) {
            throw new Error('Failed to fetch orders');
        }
        return res.json();
    },

    getOrderById: async (id: string) => {
        const res = await apiFetch(`/order/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch order details');
        }
        return res.json();
    },

    cancelOrder: async (orderId: string) => {
        const res = await apiFetch(`/order/cancel/${orderId}`, {
            method: 'POST'
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to cancel order');
        }
        return res.json();
    },
    getAllOrders: async () => {
        const res = await apiFetch('/order/all');
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
    },

    updateOrderStatus: async (id: string, status: string) => {
        const res = await apiFetch(`/order/status/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ orderStatus: status }),
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || 'Failed to update order status');
        }
        return res.json();
    }
};
