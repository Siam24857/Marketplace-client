'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Users, Award } from 'lucide-react';

const values = [
  { icon: <Target className="w-6 h-6" />, title: 'Our Mission', desc: 'To create a trusted global marketplace connecting buyers and sellers through seamless, secure transactions.' },
  { icon: <Eye className="w-6 h-6" />, title: 'Our Vision', desc: 'To become the worlds most trusted and user-friendly marketplace platform, empowering communities worldwide.' },
  { icon: <Users className="w-6 h-6" />, title: 'Community First', desc: 'We believe in putting our users first. Every feature we build starts with the question: how does this help our community?' },
  { icon: <Award className="w-6 h-6" />, title: 'Quality & Trust', desc: 'We maintain the highest standards of quality and trust through rigorous verification and review systems.' },
];

const team = [
  { name: 'Alex Morgan', role: 'Founder & CEO', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' },
  { name: 'Jordan Lee', role: 'CTO', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan' },
  { name: 'Taylor Swift', role: 'Head of Design', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=taylor' },
  { name: 'Casey Kim', role: 'Head of Marketing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=casey' },
];

export default function AboutPage() {
  return (
    <div className="py-12">
      <section className="max-w-7xl mx-auto px-4 text-center mb-20">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">About MarketPlace</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          We are on a mission to create the most trusted and user-friendly marketplace in the world, connecting people through the joy of discovery.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950/50 flex items-center justify-center text-primary-600 mb-4">{v.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
