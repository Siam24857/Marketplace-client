'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemsAPI } from '@/services/items';
import { manageAPI } from '@/services/user';
import { adminAPI } from '@/services/admin';
import { FilterState } from '@/types';

export function useItems(filters: Partial<FilterState>, page = 1) {
  return useQuery({
    queryKey: ['items', filters, page],
    queryFn: () => itemsAPI.getAll(filters, page),
    placeholderData: (prev) => prev,
  });
}

export function useItem(id: string) {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => itemsAPI.getById(id),
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => itemsAPI.getCategories(),
    staleTime: Infinity,
  });
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => itemsAPI.getStats(),
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['manage-items'] });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<any> }) => itemsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['manage-items'] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => itemsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['manage-items'] });
    },
  });
}

export function useManageItems(page = 1) {
  return useQuery({
    queryKey: ['manage-items', page],
    queryFn: () => manageAPI.getMyItems(page),
  });
}

export function useManageDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => manageAPI.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manage-items'] });
    },
  });
}

export function useItemReviews(id: string, page = 1) {
  return useQuery({
    queryKey: ['reviews', id, page],
    queryFn: () => itemsAPI.getReviews(id, page),
    enabled: !!id,
  });
}

export function useAddReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { rating: number; comment: string } }) =>
      itemsAPI.addReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function useAdminUsers(page = 1, search = '') {
  return useQuery({
    queryKey: ['admin-users', page, search],
    queryFn: () => adminAPI.getAllUsers(page, 10, search),
  });
}

export function useAdminItems(page = 1, search = '') {
  return useQuery({
    queryKey: ['admin-items', page, search],
    queryFn: () => adminAPI.getAllItems(page, 10, search),
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminAPI.getStats(),
  });
}

export function useAdminDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminAPI.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}

export function useAdminDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminAPI.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-items'] });
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}

export function useAdminUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => adminAPI.updateRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}
