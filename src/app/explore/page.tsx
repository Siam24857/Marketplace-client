'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useItems } from '@/hooks/useQueries';
import ItemCard from '@/components/cards/ItemCard';
import { CardSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/shared/EmptyState';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import { CATEGORIES, SORT_OPTIONS } from '@/constants';
import { FilterState } from '@/types';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [filters, setFilters] = useState<Partial<FilterState>>({
    search: '',
    category: initialCategory,
    minPrice: '',
    maxPrice: '',
    minRating: '',
    location: '',
    sort: 'createdAt',
    order: 'desc',
  });
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, isLoading } = useItems(filters, page);
  const items = data?.data || [];
  const pagination = data?.pagination;

  const categoryOptions = [
    { label: 'All Categories', value: '' },
    ...CATEGORIES.map((c) => ({ label: c, value: c })),
  ];

  const ratingOptions = [
    { label: 'Any Rating', value: '' },
    { label: '4+ Stars', value: '4' },
    { label: '3+ Stars', value: '3' },
    { label: '2+ Stars', value: '2' },
  ];

  const sortOptions = [
    { label: 'Newest First', value: 'createdAt-desc' },
    { label: 'Oldest First', value: 'createdAt-asc' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Rating: High to Low', value: 'rating-desc' },
  ];

  const updateFilter = (key: keyof FilterState, value: string) => {
    if (key === 'sort') {
      const [sort, order] = value.split('-') as [string, 'asc' | 'desc'];
      setFilters((prev) => ({ ...prev, sort, order }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', minPrice: '', maxPrice: '', minRating: '', location: '', sort: 'createdAt', order: 'desc' });
    setSearchInput('');
    setPage(1);
  };

  const hasActiveFilters = filters.search || filters.category || filters.minPrice || filters.maxPrice || filters.minRating || filters.location;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Explore Products</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Discover {pagination?.total || 0} amazing products from our community.
        </p>
      </motion.div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Select options={categoryOptions} value={filters.category || ''} onChange={(e) => updateFilter('category', e.target.value)} className="w-full md:w-48" />
            <Select options={sortOptions} value={`${filters.sort}-${filters.order}`} onChange={(e) => updateFilter('sort', e.target.value)} className="w-full md:w-48" />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${showFilters ? 'bg-primary-50 border-primary-300 text-primary-600 dark:bg-primary-950/50' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Min Price</label>
              <input type="number" placeholder="$0" value={filters.minPrice || ''} onChange={(e) => updateFilter('minPrice', e.target.value)} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Max Price</label>
              <input type="number" placeholder="No limit" value={filters.maxPrice || ''} onChange={(e) => updateFilter('maxPrice', e.target.value)} className="input" />
            </div>
            <Select label="Minimum Rating" options={ratingOptions} value={filters.minRating || ''} onChange={(e) => updateFilter('minRating', e.target.value)} />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
              <input type="text" placeholder="Any location" value={filters.location || ''} onChange={(e) => updateFilter('location', e.target.value)} className="input" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-500">Active filters:</span>
          {filters.search && <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-medium flex items-center gap-1 dark:bg-primary-950/50">Search: {filters.search} <X className="w-3 h-3 cursor-pointer" onClick={() => { setSearchInput(''); updateFilter('search', ''); }} /></span>}
          {filters.category && <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-medium flex items-center gap-1 dark:bg-primary-950/50">{filters.category} <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('category', '')} /></span>}
          {filters.minPrice && <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-medium flex items-center gap-1 dark:bg-primary-950/50">Min: ${filters.minPrice} <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('minPrice', '')} /></span>}
          {filters.maxPrice && <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-medium flex items-center gap-1 dark:bg-primary-950/50">Max: ${filters.maxPrice} <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('maxPrice', '')} /></span>}
          <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-600 font-medium">Clear all</button>
        </div>
      )}

      {/* Results Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState title="No products found" description="Try adjusting your filters or search terms." />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <ItemCard key={item._id} item={item} index={i} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={pagination?.totalPages || 1} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><div className="space-y-6"><div className="h-10 w-64 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" /><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-80 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />)}</div></div></div>}>
      <ExploreContent />
    </Suspense>
  );
}
