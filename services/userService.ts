import { apiFetch } from './api';

export const userService = {
    getAllUsers: async () => {
        const res = await apiFetch('/user');
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
    },

    updateUser: async (id: string, data: any) => {
        const res = await apiFetch(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update user');
        return res.json();
    },

    deleteUser: async (id: string) => {
        const res = await apiFetch(`/users/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete user');
        return res.json();
    }
};
