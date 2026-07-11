import api from './api';
import { ApiResponse, AuthData } from '@/types';

export const authAPI = {
  register: async (data: { name: string; email: string; password: string }): Promise<ApiResponse<AuthData>> => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },

  login: async (data: { email: string; password: string }): Promise<ApiResponse<AuthData>> => {
    const res = await api.post('/auth/login', data);
    return res.data;
  },

  logout: async (): Promise<ApiResponse> => {
    const res = await api.post('/auth/logout');
    return res.data;
  },

  getProfile: async (): Promise<ApiResponse> => {
    const res = await api.get('/auth/profile');
    return res.data;
  },

  updateProfile: async (data: { name?: string; phone?: string; bio?: string; avatar?: string }): Promise<ApiResponse> => {
    const res = await api.put('/auth/profile', data);
    return res.data;
  },
};
