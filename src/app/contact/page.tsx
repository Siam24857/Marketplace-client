'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { adminAPI } from '@/services/admin';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await adminAPI.contact(data);
      toast.success('Message sent! We will get back to you soon.');
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Have a question or feedback? We would love to hear from you.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          {[
            { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'support@marketplace.com' },
            { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+1 (555) 123-4567' },
            { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: 'San Francisco, CA 94102' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center text-primary-600 flex-shrink-0">{item.icon}</div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">{item.label}</p>
                <p className="text-gray-500 text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Name" placeholder="Your name" error={errors.name?.message as string} {...register('name', { required: 'Name is required' })} />
              <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message as string} {...register('email', { required: 'Email is required' })} />
            </div>
            <Input label="Subject" placeholder="How can we help?" error={errors.subject?.message as string} {...register('subject', { required: 'Subject is required' })} />
            <Textarea label="Message" placeholder="Your message..." error={errors.message?.message as string} {...register('message', { required: 'Message is required' })} className="min-h-[150px]" />
            <Button type="submit" isLoading={isSubmitting}><Send className="w-4 h-4" /> Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
