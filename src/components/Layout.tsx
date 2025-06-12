'use client';

import Navigation from './Navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;
  navigation: Array<{ slug: string; title: string }>;
};

export default function Layout({ children, navigation }: LayoutProps) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white shadow-sm">
        <header className="text-center mb-12 py-6 border-b">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-blue-700 mb-2">
            DIY 3-Axis CNC Plotter Using DC Motors with Optical Encoders
          </h1>
          <p className="text-gray-600 italic">A project powered by JLCPCB</p>
        </header>

        <Navigation items={navigation} />

        <main className="prose max-w-none">
          {children}
        </main>

        <footer className="mt-16 pt-6 border-t text-center text-gray-600">
          <p>This project is made possible with PCB manufacturing by <a href="https://jlcpcb.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">JLCPCB</a></p>
          <p>&copy; {currentYear} - All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}
