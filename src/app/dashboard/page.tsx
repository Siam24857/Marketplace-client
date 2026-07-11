'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, TrendingUp, DollarSign, Star, Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useStats, useManageItems } from '@/hooks/useQueries';
import { BarChartComponent, PieChartComponent } from '@/components/charts/DashboardCharts';
import { formatPrice } from '@/utils';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { data: statsData } = useStats();
  const { data: itemsData } = useManageItems(1);

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [user, authLoading, router]);

  if (authLoading || !user) return null;

  const stats = statsData?.data as any;
  const items = (itemsData?.data as any[]) || [];

  const statCards = [
    { label: 'Total Items', value: stats?.totalItems || 0, icon: <Package className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50' },
    { label: 'Total Value', value: formatPrice(stats?.totalValue || 0), icon: <DollarSign className="w-5 h-5" />, color: 'bg-green-50 text-green-600 dark:bg-green-950/50' },
    { label: 'Avg. Price', value: formatPrice(stats?.avgPrice || 0), icon: <TrendingUp className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50' },
    { label: 'My Items', value: items.length, icon: <Star className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50' },
  ];

  const chartData = (stats?.categoryCounts || []).map((c: any) => ({ name: c._id, value: c.count }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, {user.name}!</p>
        </div>
        <Link href="/dashboard/add-item">
          <Button><Plus className="w-4 h-4" /> Add Item</Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className={`p-2 rounded-xl ${stat.color}`}>{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Items by Category</h3>
          {chartData.length > 0 ? <BarChartComponent data={chartData} /> : <p className="text-gray-500 text-center py-8">No data yet</p>}
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Distribution</h3>
          {chartData.length > 0 ? <PieChartComponent data={chartData} /> : <p className="text-gray-500 text-center py-8">No data yet</p>}
        </div>
      </div>

      {/* Recent Items */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Recent Items</h3>
          <Link href="/dashboard/manage-items" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">You have not listed any items yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Title</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Category</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Price</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Rating</th>
                </tr>
              </thead>
              <tbody>
                {items.slice(0, 5).map((item: any) => (
                  <tr key={item._id} className="border-b border-gray-50 dark:border-gray-800/50">
                    <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{item.title}</td>
                    <td className="py-3 text-sm text-gray-500">{item.category}</td>
                    <td className="py-3 text-sm font-medium text-primary-600">{formatPrice(item.price)}</td>
                    <td className="py-3 text-sm text-gray-500">{item.rating.toFixed(1)} ★</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
