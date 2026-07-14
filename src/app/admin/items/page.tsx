'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useAdminItems, useAdminDeleteItem } from '@/hooks/useQueries';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import EmptyState from '@/components/shared/EmptyState';
import { formatPrice } from '@/utils';

export default function AdminItemsPage() {
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

  const { data, isLoading } = useAdminItems(page, debouncedSearch);
  const deleteMutation = useAdminDeleteItem();

  const items = (data?.data as any[]) || [];
  const pagination = data?.pagination;

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Item deleted');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete');
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">All Items</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage all listed products on the platform.</p>
      </motion.div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
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
      ) : items.length === 0 ? (
        <EmptyState title="No items found" description="No items match your search." />
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item: any, i: number) => (
              <motion.div key={item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category} &middot; {item.location}</p>
                  <p className="text-xs text-gray-400">by {item.seller?.name || 'Unknown'}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="font-bold text-primary-600">{formatPrice(item.price)}</p>
                  <p className="text-xs text-gray-500">{item.rating?.toFixed(1)} ★ ({item.reviewCount})</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/item/${item._id}`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-primary-600">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleDelete(item._id, item.title)} disabled={deleteMutation.isPending} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-gray-500 hover:text-red-600">
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
