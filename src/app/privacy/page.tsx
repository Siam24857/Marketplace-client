'use client';

import { motion } from 'framer-motion';

const sections = [
  { title: 'Information We Collect', content: 'We collect information you provide directly, including your name, email address, phone number, payment information, and any other data you choose to share when using our platform. We also collect usage data such as browsing history, search queries, and device information to improve our services.' },
  { title: 'How We Use Your Information', content: 'Your information is used to provide and improve our services, process transactions, send notifications, and personalize your experience. We use data analytics to understand usage patterns and optimize platform performance. We may also use your information to communicate with you about products, services, and promotions.' },
  { title: 'Information Sharing', content: 'We do not sell your personal information to third parties. We may share your information with service providers who assist us in operating our platform, processing payments, and delivering services. We may also share information when required by law or to protect our rights and safety.' },
  { title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information, including encryption, firewalls, and secure server infrastructure. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.' },
  { title: 'Cookies', content: 'We use cookies and similar technologies to enhance your browsing experience, analyze platform usage, and assist in our marketing efforts. You can control cookie preferences through your browser settings.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information. You can also opt out of certain communications and data collection. Contact our privacy team to exercise these rights.' },
];

export default function PrivacyPage() {
  return (
    <div className="py-12 max-w-3xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: July 11, 2026</p>
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{section.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
