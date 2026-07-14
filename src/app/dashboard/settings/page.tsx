'use client';

import { useEffect, useState } from 'react';
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
import { Shield, Bell, Palette, Eye, EyeOff, Lock } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().max(20).optional().or(z.literal('')),
  bio: z.string().max(500).optional().or(z.literal('')),
  avatar: z.string().url().optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, updateUser } = useAuth();
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'appearance' | 'security'>('profile');
  const [notifications, setNotifications] = useState({ email: true, push: false, marketing: false });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [user, authLoading, router]);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || '', phone: user?.phone || '', bio: user?.bio || '', avatar: user?.avatar || '' },
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, phone: user.phone || '', bio: user.bio || '', avatar: user.avatar || '' });
    }
  }, [user, reset]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      const clean: Record<string, string> = {};
      if (data.name) clean.name = data.name;
      if (data.phone !== undefined) clean.phone = data.phone;
      if (data.bio !== undefined) clean.bio = data.bio;
      if (data.avatar !== undefined) clean.avatar = data.avatar;
      const res = await authAPI.updateProfile(clean);
      updateUser(res.data as any);
      toast.success('Profile updated!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  if (authLoading || !user) return null;

  const sections = [
    { key: 'profile' as const, icon: <Shield className="w-5 h-5" />, title: 'Profile', desc: 'Manage your profile information' },
    { key: 'notifications' as const, icon: <Bell className="w-5 h-5" />, title: 'Notifications', desc: 'Configure notification preferences' },
    { key: 'appearance' as const, icon: <Palette className="w-5 h-5" />, title: 'Appearance', desc: 'Customize your experience' },
    { key: 'security' as const, icon: <Lock className="w-5 h-5" />, title: 'Security', desc: 'Password and account security' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Configure your account preferences.</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            {sections.map((s) => (
              <button key={s.key} onClick={() => setActiveSection(s.key)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeSection === s.key ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/50 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                {s.icon}
                <span className="text-sm">{s.title}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {activeSection === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
                <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
                  <Input label="Name" error={errors.name?.message} {...register('name')} />
                  <Input label="Phone" placeholder="+1 (555) 000-0000" error={errors.phone?.message} {...register('phone')} />
                  <Input label="Avatar URL" placeholder="https://example.com/avatar.jpg" error={errors.avatar?.message} {...register('avatar')} />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                    <textarea className="input min-h-[100px]" placeholder="Tell us about yourself..." {...register('bio')} />
                    {errors.bio?.message && <p className="text-sm text-red-500">{errors.bio.message}</p>}
                  </div>
                  <Button type="submit" isLoading={isSubmitting}>Save Changes</Button>
                </form>
              </motion.div>
            )}

            {activeSection === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Receive updates about your items via email' },
                    { key: 'push', label: 'Push Notifications', desc: 'Get push notifications for new messages' },
                    { key: 'marketing', label: 'Marketing Emails', desc: 'Receive tips, trends, and marketplace news' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => {
                          setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }));
                          toast.success('Preference saved');
                        }}
                        className={`relative w-11 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : ''}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'appearance' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Dark Mode</p>
                      <p className="text-xs text-gray-500">Switch between light and dark themes</p>
                    </div>
                    <button
                      onClick={() => {
                        setDarkMode(!darkMode);
                        document.documentElement.classList.toggle('dark');
                        toast.success(darkMode ? 'Switched to light mode' : 'Switched to dark mode');
                      }}
                      className={`relative w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-5' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Password</p>
                        <p className="text-xs text-gray-500">Last changed: Never</p>
                      </div>
                      <Button variant="secondary" size="sm">Change Password</Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500">Add an extra layer of security</p>
                      </div>
                      <Button variant="secondary" size="sm">Enable 2FA</Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Active Sessions</p>
                        <p className="text-xs text-gray-500">Manage your active sessions</p>
                      </div>
                      <Button variant="secondary" size="sm">View Sessions</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
