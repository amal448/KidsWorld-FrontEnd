import { apiFetch } from "./api";

export const productService = {
    getProductById: async (id: string) => {
        try {
            const res = await apiFetch(`/product/${id}`, {
                cache: 'no-store' // Ensures you get the latest price/stock from the server
            });

            if (!res.ok) return null;

            const data = await res.json();

            // Standard: Return the single product object. 
            // Most backends wrap it in a 'product' key, e.g., { success: true, product: { ... } }
            return data.product || data;
        } catch (error) {
            console.error("Error in getProductById:", error);
            return null;
        }
    },
    getProducts: async (filters: {
        category?: string;
        color?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string
    } = {}) => {
        // Build query string: ?category=id&color=Red&minPrice=10
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value.toString());
        });

        const res = await apiFetch(`/product?${params.toString()}`);
        const data = await res.json();
        return data.products || [];
    },

    createProduct: async (data: any) => {
        const res = await apiFetch('/product/new', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create product');
        return res.json();
    },

    updateProduct: async (id: string, data: any) => {
        const res = await apiFetch(`/product/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update product');
        return res.json();
    },

    deleteProduct: async (id: string) => {
        const res = await apiFetch(`/product/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete product');
        return res.json();
    }
};