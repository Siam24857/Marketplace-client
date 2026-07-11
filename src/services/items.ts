import api from './api';
import { ApiResponse, Item, FilterState } from '@/types';

export const itemsAPI = {
  getAll: async (filters: Partial<FilterState>, page = 1, limit = 12): Promise<ApiResponse<Item[]>> => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minRating) params.set('minRating', filters.minRating);
    if (filters.location) params.set('location', filters.location);
    if (filters.sort) params.set('sort', filters.sort);
    if (filters.order) params.set('order', filters.order);

    const res = await api.get(`/items?${params.toString()}`);
    return res.data;
  },

  getById: async (id: string): Promise<ApiResponse<Item>> => {
    const res = await api.get(`/items/${id}`);
    return res.data;
  },

  create: async (data: Partial<Item>): Promise<ApiResponse<Item>> => {
    const res = await api.post('/items', data);
    return res.data;
  },

  update: async (id: string, data: Partial<Item>): Promise<ApiResponse<Item>> => {
    const res = await api.put(`/items/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete(`/items/${id}`);
    return res.data;
  },

  getCategories: async (): Promise<ApiResponse<string[]>> => {
    const res = await api.get('/items/categories');
    return res.data;
  },

  getStats: async (): Promise<ApiResponse> => {
    const res = await api.get('/items/stats');
    return res.data;
  },

  getReviews: async (id: string, page = 1): Promise<ApiResponse> => {
    const res = await api.get(`/items/${id}/reviews?page=${page}`);
    return res.data;
  },

  addReview: async (id: string, data: { rating: number; comment: string }): Promise<ApiResponse> => {
    const res = await api.post(`/items/${id}/reviews`, data);
    return res.data;
  },
};
