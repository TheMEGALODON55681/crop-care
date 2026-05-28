'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV = [
  { name: 'Home',     href: '/' },
  { name: 'About',    href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Sensors',  href: '/moisture-sensors' },
  { name: 'Detect',   href: '/camera' },
  { name: 'Contact',  href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 border-b
        ${scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-green-100'
          : 'bg-white/70 backdrop-blur-sm border-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <Leaf className="h-7 w-7 text-green-600 group-hover:text-green-700 transition-colors" />
            <span className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
              Crop Care
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Button asChild variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 shadow-sm">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(o => !o)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-green-100 shadow-md">
          <div className="px-3 pt-3 pb-3 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="px-3 pb-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
            <Button asChild variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
