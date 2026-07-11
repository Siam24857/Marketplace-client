'use client';

import { motion } from 'framer-motion';
import { Book, MessageCircle, CreditCard, Shield, Truck, Settings } from 'lucide-react';
import Link from 'next/link';

const topics = [
  { icon: <Book className="w-6 h-6" />, title: 'Getting Started', desc: 'Learn the basics of buying and selling on MarketPlace.', items: ['Creating an account', 'Listing your first item', 'Making a purchase'] },
  { icon: <CreditCard className="w-6 h-6" />, title: 'Payments & Billing', desc: 'Understand payment methods, refunds, and billing.', items: ['Accepted payment methods', 'How refunds work', 'Subscription plans'] },
  { icon: <Shield className="w-6 h-6" />, title: 'Safety & Security', desc: 'Stay safe while using our platform.', items: ['Account security tips', 'Reporting suspicious activity', 'Verification process'] },
  { icon: <Truck className="w-6 h-6" />, title: 'Shipping & Delivery', desc: 'Everything about shipping and delivery.', items: ['Shipping options', 'Tracking orders', 'International shipping'] },
  { icon: <Settings className="w-6 h-6" />, title: 'Account Settings', desc: 'Manage your account preferences.', items: ['Updating your profile', 'Notification settings', 'Deleting your account'] },
  { icon: <MessageCircle className="w-6 h-6" />, title: 'Contact Support', desc: 'Get help from our support team.', items: ['Live chat support', 'Email support', 'Community forums'] },
];

export default function HelpPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Help Center</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Find answers to your questions and get the help you need.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic, i) => (
          <motion.div key={topic.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950/50 flex items-center justify-center text-primary-600 mb-4">{topic.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{topic.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{topic.desc}</p>
            <ul className="space-y-2">
              {topic.items.map((item) => (
                <li key={item} className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-400" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
