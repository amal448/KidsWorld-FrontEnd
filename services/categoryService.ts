import { apiFetch } from "./api";

export const categoryService = {
    getCategories: async () => {
        const res = await apiFetch(`/category`);
        const categories = res.json();
        return categories; // ✅ ARRAY
    },

    createCategory: async (data: any) => {
        const res = await apiFetch('/category', {
            method: 'POST',
            body: data instanceof FormData ? data : JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create category');
        return res.json();
    },

    updateCategory: async (id: string, data: any) => {
        const res = await apiFetch(`/category/${id}`, {
            method: 'PATCH',
            body: data instanceof FormData ? data : JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update category');
        return res.json();
    },

    deleteCategory: async (id: string) => {
        const res = await apiFetch(`/category/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete category');
        return res.json();
    }
};