import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Crop Care — Smart Farming, Accessible',
    template: '%s · Crop Care',
  },
  description:
    'A precision-agriculture prototype: vision-based plant disease detection, soil-moisture monitoring, and an interactive farm map. Built around a Hugging Face classifier and accessible to farmers with a phone.',
  keywords: ['precision agriculture', 'crop monitoring', 'plant disease detection', 'soil moisture', 'smart farming', 'Next.js'],
  authors: [{ name: 'Crop Care' }],
  openGraph: {
    title: 'Crop Care — Smart Farming, Accessible',
    description: 'Plant disease detection, soil-moisture monitoring, and an interactive farm map — built for smallholder farmers.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900 antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
