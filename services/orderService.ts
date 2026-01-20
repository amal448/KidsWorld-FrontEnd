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
        const res = await apiFetch(`/orders/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch order details');
        }
        return res.json();
    }
};
