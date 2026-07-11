'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, Trash2, Search, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useManageItems, useManageDeleteItem } from '@/hooks/useQueries';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import EmptyState from '@/components/shared/EmptyState';
import { formatPrice } from '@/utils';

export default function ManageItemsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useManageItems(page);
  const deleteMutation = useManageDeleteItem();

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [user, authLoading, router]);

  const items = ((data?.data as any[]) || []).filter((item: any) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  const pagination = data?.pagination;

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Item deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete');
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Manage Items</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage your listed products.</p>
        </div>
        <Link href="/dashboard/add-item">
          <Button><Plus className="w-4 h-4" /> Add Item</Button>
        </Link>
      </motion.div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search your items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="No items found"
          description="You have not listed any items yet. Start selling today!"
          action={<Link href="/dashboard/add-item"><Button>List Your First Item</Button></Link>}
        />
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item: any, i: number) => (
              <motion.div key={item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category} &middot; {item.location}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="font-bold text-primary-600">{formatPrice(item.price)}</p>
                  <p className="text-xs text-gray-500">{item.rating.toFixed(1)} ★ ({item.reviewCount})</p>
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
