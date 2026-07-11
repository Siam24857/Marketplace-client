'use client';

import { motion } from 'framer-motion';

const sections = [
  { title: 'Acceptance of Terms', content: 'By accessing or using MarketPlace, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our platform. We reserve the right to modify these terms at any time.' },
  { title: 'User Accounts', content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 18 years old to create an account. You agree to provide accurate and complete information during registration.' },
  { title: 'Listings and Transactions', content: 'All listings must comply with our content policies. Sellers are responsible for the accuracy of their listings and must honor completed transactions. MarketPlace is not a party to transactions between buyers and sellers.' },
  { title: 'Prohibited Activities', content: 'Users may not engage in fraud, harassment, spamming, or any activity that violates applicable laws. Listing counterfeit, illegal, or harmful items is strictly prohibited and may result in account termination.' },
  { title: 'Intellectual Property', content: 'All content on MarketPlace, including logos, text, and software, is owned by or licensed to MarketPlace and is protected by intellectual property laws. Users retain ownership of their original content but grant us a license to display it.' },
  { title: 'Limitation of Liability', content: 'MarketPlace is provided "as is" without warranties of any kind. We are not liable for damages arising from the use of our platform, including direct, indirect, incidental, or consequential damages.' },
];

export default function TermsPage() {
  return (
    <div className="py-12 max-w-3xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
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
