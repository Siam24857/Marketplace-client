'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useCreateItem, useCategories } from '@/hooks/useQueries';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { CATEGORIES } from '@/constants';

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  shortDescription: z.string().min(1, 'Short description is required').max(200),
  fullDescription: z.string().min(1, 'Full description is required').max(2000),
  price: z.string().min(1, 'Price is required').refine((v) => parseFloat(v) >= 0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  image: z.string().url('Please enter a valid URL'),
});

type FormData = z.infer<typeof schema>;

export default function AddItemPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const createItem = useCreateItem();

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [user, authLoading, router]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', shortDescription: '', fullDescription: '', price: '', category: '', location: '', image: '' },
  });

  const categoryOptions = [
    { label: 'Select Category', value: '' },
    ...CATEGORIES.map((c) => ({ label: c, value: c })),
  ];

  const onSubmit = async (data: FormData) => {
    try {
      await createItem.mutateAsync({ ...data, price: parseFloat(data.price) } as any);
      toast.success('Item created successfully!');
      reset();
      router.push('/dashboard/manage-items');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create item');
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Item</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">List your product on MarketPlace.</p>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input label="Title" placeholder="Enter product title" error={errors.title?.message} {...register('title')} />

            <Textarea label="Short Description" placeholder="Brief description (max 200 chars)" error={errors.shortDescription?.message} {...register('shortDescription')} />

            <Textarea label="Full Description" placeholder="Detailed description of the product" error={errors.fullDescription?.message} className="min-h-[200px]" {...register('fullDescription')} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Price ($)" type="number" step="0.01" placeholder="0.00" error={errors.price?.message} {...register('price')} />
              <Select label="Category" options={categoryOptions} error={errors.category?.message} {...register('category')} />
            </div>

            <Input label="Location" placeholder="City, State" error={errors.location?.message} {...register('location')} />

            <Input label="Image URL" placeholder="https://example.com/image.jpg" error={errors.image?.message} {...register('image')} />

            <div className="flex gap-4">
              <Button type="submit" isLoading={createItem.isPending} className="flex-1">Publish Item</Button>
              <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
