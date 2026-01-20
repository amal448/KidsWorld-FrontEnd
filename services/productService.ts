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

};