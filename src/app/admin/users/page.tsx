'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Trash2, Shield, UserCheck, UserX } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useAdminUsers, useAdminDeleteUser, useAdminUpdateRole } from '@/hooks/useQueries';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import EmptyState from '@/components/shared/EmptyState';
import { formatDate } from '@/utils';

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) router.push('/auth/login');
  }, [user, authLoading, router]);

  const { data, isLoading } = useAdminUsers(page, debouncedSearch);
  const deleteMutation = useAdminDeleteUser();
  const updateRoleMutation = useAdminUpdateRole();

  const users = (data?.data as any[]) || [];
  const pagination = data?.pagination;

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete user "${name}"? All their items will also be removed.`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('User deleted');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete');
    }
  };

  const handleRoleToggle = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await updateRoleMutation.mutateAsync({ id, role: newRole });
      toast.success(`Role changed to ${newRole}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update role');
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Manage Users</h1>
        <p className="text-gray-500 dark:text-gray-400">View and manage all registered users.</p>
      </motion.div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="input pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <EmptyState title="No users found" description="No users match your search." />
      ) : (
        <>
          <div className="space-y-3">
            {users.map((u: any, i: number) => (
              <motion.div key={u._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                  {u.avatar ? (
                    <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <span className="text-sm font-semibold text-primary-600">{u.name?.[0]?.toUpperCase()}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{u.name}</h3>
                    {u.role === 'admin' && <Shield className="w-3.5 h-3.5 text-red-500" />}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{u.email}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-red-100 text-red-600 dark:bg-red-950/50' : 'bg-gray-100 text-gray-600 dark:bg-gray-800'}`}>
                    {u.role}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Joined {formatDate(u.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleRoleToggle(u._id, u.role)} disabled={u._id === user?._id} title={u._id === user?._id ? 'Cannot change your own role' : `Toggle role`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed">
                    {u.role === 'admin' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(u._id, u.name)} disabled={u._id === user?._id || deleteMutation.isPending} title={u._id === user?._id ? 'Cannot delete yourself' : 'Delete user'} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-gray-500 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <Pagination currentPage={page} totalPages={pagination?.totalPages || 1} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
