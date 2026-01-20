import { apiFetch } from "./api";

export const categoryService = {
    getCategories: async () => {
        const res = await apiFetch(`/category`);
        const categories = res.json();
        return categories; // ✅ ARRAY
    }

};