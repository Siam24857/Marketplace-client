'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Item } from '@/types';
import { formatPrice, truncate } from '@/utils';

interface ItemCardProps {
  item: Item;
  index?: number;
}

export default function ItemCard({ item, index = 0 }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/item/${item._id}`}>
        <div className="card group cursor-pointer">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={index < 4}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 right-3">
              <span className="glass px-3 py-1 rounded-full text-xs font-semibold">
                {item.category}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">
              {truncate(item.title, 40)}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {truncate(item.shortDescription, 80)}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-400">({item.reviewCount})</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{item.location}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary-600">{formatPrice(item.price)}</span>
              <span className="text-sm font-medium text-primary-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View Details
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
