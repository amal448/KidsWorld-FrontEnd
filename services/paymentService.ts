import { apiFetch } from "./api";

export const paymentService = {
    async initiatePayment(payload: {
        items: { product: string; quantity: number }[];
        paymentMethod: 'COD' | 'Card';
        address: any;
        shippingFee: number;
        useWallet?: boolean;
    }) {
        const response = await apiFetch('/payment', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Payment initiation failed');
        }

        return response.json();
    },


};
