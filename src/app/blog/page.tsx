'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const posts = [
  { id: '1', title: 'How to Succeed as a Seller on MarketPlace', excerpt: 'Discover proven strategies to optimize your listings, attract buyers, and grow your sales on our platform.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', date: 'Jul 8, 2026', category: 'Seller Tips' },
  { id: '2', title: 'The Future of E-Commerce: Trends to Watch', excerpt: 'Explore the emerging technologies and consumer behaviors shaping the future of online marketplaces.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', date: 'Jul 5, 2026', category: 'Industry' },
  { id: '3', title: 'Building Trust: Our Verification Process', excerpt: 'Learn how MarketPlace ensures every transaction is safe and every seller is verified through our rigorous process.', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800', date: 'Jul 1, 2026', category: 'Security' },
  { id: '4', title: '5 Tips for Writing Better Product Descriptions', excerpt: 'Great descriptions sell products. Here are five actionable tips to write descriptions that convert visitors into buyers.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800', date: 'Jun 28, 2026', category: 'Writing' },
  { id: '5', title: 'MarketPlace vs. Traditional Marketplaces', excerpt: 'See why thousands of sellers are choosing MarketPlace over traditional e-commerce platforms for their online business.', image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800', date: 'Jun 24, 2026', category: 'Comparison' },
  { id: '6', title: 'Maximizing Your Reach with Social Media', excerpt: 'Use social media to amplify your MarketPlace listings and drive more traffic to your products.', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800', date: 'Jun 20, 2026', category: 'Marketing' },
];

export default function BlogPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Insights, tips, and stories from the MarketPlace community.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card group cursor-pointer">
            <div className="relative h-48 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-gray-700">{post.category}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-2"><Calendar className="w-3 h-3" /> {post.date}</div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">{post.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
              <span className="text-sm font-medium text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight className="w-3 h-3" /></span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
