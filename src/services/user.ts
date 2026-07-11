import api from './api';
import { ApiResponse, Item } from '@/types';

export const manageAPI = {
  getMyItems: async (page = 1, limit = 10): Promise<ApiResponse<Item[]>> => {
    const res = await api.get(`/manage/items?page=${page}&limit=${limit}`);
    return res.data;
  },

  deleteItem: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete(`/manage/items/${id}`);
    return res.data;
  },
};
