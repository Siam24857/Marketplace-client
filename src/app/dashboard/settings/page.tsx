'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { Shield, Bell, Palette, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [user, authLoading, router]);

  if (authLoading || !user) return null;

  const settingsSections = [
    { icon: <Shield className="w-5 h-5" />, title: 'Security', desc: 'Manage your password and security settings', href: '/dashboard/profile' },
    { icon: <Bell className="w-5 h-5" />, title: 'Notifications', desc: 'Configure email and push notification preferences', href: '/dashboard/profile' },
    { icon: <Palette className="w-5 h-5" />, title: 'Appearance', desc: 'Customize how MarketPlace looks on your device', href: '/dashboard/profile' },
    { icon: <CreditCard className="w-5 h-5" />, title: 'Billing', desc: 'Manage your subscription and payment methods', href: '/dashboard/profile' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Configure your account preferences.</p>

        <div className="space-y-4">
          {settingsSections.map((section, i) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={section.href} className="flex items-center gap-4 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center text-primary-600 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                  <p className="text-sm text-gray-500">{section.desc}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
