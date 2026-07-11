'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowLeft, Share2, Heart, User, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { useItem, useItemReviews, useAddReview } from '@/hooks/useQueries';
import { useAuth } from '@/context/AuthContext';
import { formatPrice, formatDate } from '@/utils';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';
import { CardSkeleton } from '@/components/ui/Skeleton';
import ItemCard from '@/components/cards/ItemCard';
import EmptyState from '@/components/shared/EmptyState';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'specs'>('overview');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const { data: itemData, isLoading } = useItem(id);
  const { data: reviewsData } = useItemReviews(id);
  const addReviewMutation = useAddReview();

  const item = itemData?.data;
  const reviews = (reviewsData?.data as any[]) || [];

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to leave a review');
      return;
    }
    try {
      await addReviewMutation.mutateAsync({ id, data: { rating: reviewRating, comment: reviewComment } });
      toast.success('Review submitted successfully');
      setReviewComment('');
      setReviewRating(5);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="h-4 w-full rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="h-4 w-2/3 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return <EmptyState title="Item not found" description="This item does not exist or has been removed." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative rounded-2xl overflow-hidden aspect-square">
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
          <span className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 text-xs font-medium mb-4">
            {item.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{item.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">({item.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{item.location}</span>
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{item.shortDescription}</p>

          <div className="text-4xl font-bold text-primary-600 mb-6">{formatPrice(item.price)}</div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.seller?.name}</p>
                <p className="text-xs text-gray-500">Seller</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="lg" className="flex-1">Contact Seller</Button>
            <Button variant="secondary" size="lg" className="px-4"><Heart className="w-5 h-5" /></Button>
            <Button variant="secondary" size="lg" className="px-4"><Share2 className="w-5 h-5" /></Button>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800 mb-8">
        <div className="flex gap-8">
          {(['overview', 'reviews', 'specs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium capitalize transition-colors border-b-2 ${activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              {tab === 'specs' ? 'Specifications' : tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About this item</h2>
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{item.fullDescription}</div>
        </motion.div>
      )}

      {activeTab === 'specs' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Specifications</h2>
          {item.specifications && item.specifications.length > 0 ? (
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              {item.specifications.map((spec, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-950'} px-6 py-3`}>
                  <span className="w-1/3 text-sm font-medium text-gray-500">{spec.key}</span>
                  <span className="w-2/3 text-sm text-gray-900 dark:text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No specifications available.</p>
          )}
        </motion.div>
      )}

      {activeTab === 'reviews' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Reviews ({reviews.length})</h2>

          {user && (
            <form onSubmit={handleSubmitReview} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Write a Review</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                <StarRating rating={reviewRating} interactive onChange={setReviewRating} size="lg" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="input min-h-[100px]"
                  required
                />
              </div>
              <Button type="submit" isLoading={addReviewMutation.isPending}>Submit Review</Button>
            </form>
          )}

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this item!</p>
            ) : (
              reviews.map((review: any) => (
                <div key={review._id} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary-600">{review.user?.name?.[0] || 'U'}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{review.user?.name || 'Anonymous'}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(review.createdAt)}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 leading-relaxed">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
