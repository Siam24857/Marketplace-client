import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from '@/providers/QueryProvider';
import { AuthProvider } from '@/context/AuthContext';
import ToasterProvider from '@/providers/ToasterProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MarketPlace - Discover & Share Exceptional Products',
  description: 'Your trusted marketplace for discovering and sharing exceptional products. Connect with sellers and find exactly what you need.',
  keywords: ['marketplace', 'ecommerce', 'buy', 'sell', 'shop'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ToasterProvider />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
