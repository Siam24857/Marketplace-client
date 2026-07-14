import api from './api';
import { ApiResponse } from '@/types';

export const adminAPI = {
  getAllUsers: async (page = 1, limit = 10, search = ''): Promise<ApiResponse> => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set('search', search);
    const res = await api.get(`/admin/users?${params.toString()}`);
    return res.data;
  },

  getAllItems: async (page = 1, limit = 10, search = ''): Promise<ApiResponse> => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set('search', search);
    const res = await api.get(`/admin/items?${params.toString()}`);
    return res.data;
  },

  getStats: async (): Promise<ApiResponse> => {
    const res = await api.get('/admin/stats');
    return res.data;
  },

  deleteUser: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data;
  },

  deleteItem: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete(`/admin/items/${id}`);
    return res.data;
  },

  updateRole: async (id: string, role: string): Promise<ApiResponse> => {
    const res = await api.put(`/admin/users/${id}/role`, { role });
    return res.data;
  },

  contact: async (data: { name: string; email: string; subject: string; message: string }): Promise<ApiResponse> => {
    const res = await api.post('/admin/contact', data);
    return res.data;
  },

  subscribe: async (email: string): Promise<ApiResponse> => {
    const res = await api.post('/admin/newsletter', { email });
    return res.data;
  },
};
