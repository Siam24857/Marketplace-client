'use client';

import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', background: '#1f2937', color: '#f9fafb' } }} />;
}
