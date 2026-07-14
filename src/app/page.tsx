'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, Users, Star, TrendingUp, Package, ChevronRight, CheckCircle, Heart, Clock, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import ItemCard from '@/components/cards/ItemCard';
import { useItems } from '@/hooks/useQueries';
import { formatPrice } from '@/utils';
import { adminAPI } from '@/services/admin';

const features = [
  { icon: <Zap className="w-6 h-6" />, title: 'Lightning Fast', desc: 'List and discover products in seconds with our optimized platform.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Secure Trading', desc: 'Every transaction is protected with enterprise-grade security.' },
  { icon: <Globe className="w-6 h-6" />, title: 'Global Reach', desc: 'Connect with buyers and sellers from around the world.' },
  { icon: <Users className="w-6 h-6" />, title: 'Community Driven', desc: 'Join a vibrant community of buyers and sellers.' },
  { icon: <Star className="w-6 h-6" />, title: 'Verified Reviews', desc: 'Trust every purchase with authentic buyer reviews.' },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'Smart Analytics', desc: 'Track your listings with powerful dashboard insights.' },
];

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '120K+', label: 'Products Listed' },
  { value: '$2M+', label: 'Total Sales' },
  { value: '99.9%', label: 'Uptime' },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Frequent Buyer', text: 'MarketPlace has completely transformed how I shop. The variety of products and secure payment system gives me confidence in every purchase.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
  { name: 'Michael Chen', role: 'Seller', text: 'As a seller, the dashboard analytics help me track performance. I have increased my sales by 40% since joining the platform.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
  { name: 'Emily Davis', role: 'Power User', text: 'The search and filter capabilities make finding exactly what I need effortless. The user experience is truly world-class.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily' },
];

const pricingPlans = [
  { name: 'Starter', price: 0, features: ['5 Listings/month', 'Basic analytics', 'Community support', 'Standard visibility'], cta: 'Start Free' },
  { name: 'Professional', price: 29, features: ['Unlimited listings', 'Advanced analytics', 'Priority support', 'Featured listings', 'Custom branding'], cta: 'Go Pro', popular: true },
  { name: 'Enterprise', price: 99, features: ['Everything in Pro', 'API access', 'Dedicated support', 'Custom integrations', 'White-label option'], cta: 'Contact Sales' },
];

const faqs = [
  { q: 'How do I list a product?', a: 'Simply create an account, click "Add Item", fill in the details, and publish. Your listing goes live instantly.' },
  { q: 'What payment methods are accepted?', a: 'We support all major credit cards, PayPal, Apple Pay, and bank transfers for verified sellers.' },
  { q: 'Is my personal information safe?', a: 'Absolutely. We use bank-level encryption and never share your data with third parties.' },
  { q: 'How do returns work?', a: 'Each seller sets their own return policy. Most offer a 30-day satisfaction guarantee.' },
];

const categories = [
  { name: 'Electronics', icon: '💻', count: '2.4K items' },
  { name: 'Furniture', icon: '🛋️', count: '1.8K items' },
  { name: 'Fashion', icon: '👗', count: '3.1K items' },
  { name: 'Books', icon: '📚', count: '5.2K items' },
  { name: 'Sports', icon: '⚽', count: '1.5K items' },
  { name: 'Home & Garden', icon: '🏡', count: '2.1K items' },
];

export default function HomePage() {
  const { data } = useItems({}, 1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    try {
      await adminAPI.subscribe(newsletterEmail);
      toast.success('Subscribed successfully!');
      setNewsletterEmail('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Subscription failed');
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                <Zap className="w-3 h-3 text-yellow-400" /> The Future of Marketplace
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover & Share{' '}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Exceptional Products
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              Your trusted marketplace for buying and selling premium products. Join thousands of satisfied users who have found exactly what they need.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-4">
              <Link href="/explore">
                <Button size="lg" className="text-base">
                  Explore Products <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="secondary" size="lg" className="text-base bg-white/10 hover:bg-white/20 text-white border border-white/10">
                  Start Selling
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title mb-4">
              Why Choose MarketPlace?
            </motion.h2>
            <p className="section-subtitle mx-auto">
              Everything you need to buy, sell, and manage your products in one powerful platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gray-50 dark:bg-gray-900">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950/50 flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title mb-4">Browse Categories</h2>
              <p className="section-subtitle">Find what you are looking for in our popular categories.</p>
            </div>
            <Link href="/explore" className="hidden md:flex items-center gap-1 text-primary-600 font-medium hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={`/explore?category=${cat.name}`}>
                  <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div className="text-4xl mb-3">{cat.icon}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{cat.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{cat.count}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title mb-4">Featured Products</h2>
              <p className="section-subtitle">Handpicked products curated just for you.</p>
            </div>
            <Link href="/explore" className="hidden md:flex items-center gap-1 text-primary-600 font-medium hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.data?.slice(0, 8).map((item, i) => (
              <ItemCard key={item._id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-primary-100 max-w-xl mx-auto">Our numbers speak for themselves. Join the growing community today.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">What Our Users Say</h2>
            <p className="section-subtitle mx-auto">Real stories from real people who love MarketPlace.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Simple, Transparent Pricing</h2>
            <p className="section-subtitle mx-auto">No hidden fees. Choose the plan that fits your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`p-8 rounded-2xl border ${plan.popular ? 'border-primary-500 shadow-xl shadow-primary-500/10 relative' : 'border-gray-200 dark:border-gray-800'}`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-4 py-1 rounded-full">Most Popular</span>}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                  {plan.price > 0 && <span className="text-gray-500">/month</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register">
                  <Button variant={plan.popular ? 'primary' : 'secondary'} className="w-full">{plan.cta}</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto">Got questions? We have got answers.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Subscribe to our newsletter for the latest products, deals, and marketplace insights.
            </p>
            <form className="flex gap-3 max-w-md mx-auto" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                required
              />
              <Button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold" isLoading={newsletterLoading}>Subscribe</Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title mb-4">Ready to Get Started?</h2>
            <p className="section-subtitle mx-auto mb-8">
              Join thousands of satisfied users. Start buying and selling on MarketPlace today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg">Create Free Account <ArrowRight className="w-5 h-5" /></Button>
              </Link>
              <Link href="/explore">
                <Button variant="secondary" size="lg">Browse Products</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
