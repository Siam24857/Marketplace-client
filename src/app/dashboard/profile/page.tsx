'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/services/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { getInitials } from '@/utils';

const schema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading: authLoading, updateUser } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [user, authLoading, router]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: { name: user?.name || '', phone: user?.phone || '', bio: user?.bio || '', avatar: user?.avatar || '' },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await authAPI.updateProfile(data);
      if (res.success && res.data) {
        updateUser(res.data as any);
        toast.success('Profile updated!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Manage your account settings.</p>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
            <div className="w-20 h-20 rounded-2xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-primary-600">{getInitials(user.name)}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <span className="inline-flex px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 text-xs font-medium mt-1 capitalize">{user.role}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input label="Full Name" {...register('name')} error={errors.name?.message} />
            <Input label="Phone Number" placeholder="+1 (555) 000-0000" {...register('phone')} error={errors.phone?.message} />
            <Textarea label="Bio" placeholder="Tell us about yourself" {...register('bio')} error={errors.bio?.message} />
            <Input label="Avatar URL" placeholder="https://example.com/avatar.jpg" {...register('avatar')} error={errors.avatar?.message} />

            <Button type="submit" isLoading={isSubmitting}>Save Changes</Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
