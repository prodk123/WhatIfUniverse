'use client';

import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { CurrencySelector } from './CurrencySelector';
import { ThemeToggle } from './ThemeToggle';

function HeaderContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isEmbed = searchParams.get('embed') === 'true' || pathname?.startsWith('/embed');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isEmbed) return null;

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="border-b border-gray-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
          <Link href="/" onClick={closeMenu} className="font-extrabold text-2xl tracking-tighter text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
            What If <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Universe</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/category/money" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Money</Link>
          <Link href="/category/career" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Career</Link>
          <Link href="/category/health" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Health</Link>
          <Link href="/category/education" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Education</Link>
          <Link href="/category/business" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Business</Link>
          <Link href="/guides" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Guides</Link>
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          <CurrencySelector />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-4">
          <Link href="/category/money" onClick={closeMenu} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Money</Link>
          <Link href="/category/career" onClick={closeMenu} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Career</Link>
          <Link href="/category/health" onClick={closeMenu} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Health</Link>
          <Link href="/category/education" onClick={closeMenu} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Education</Link>
          <Link href="/category/business" onClick={closeMenu} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Business</Link>
          <Link href="/guides" onClick={closeMenu} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Guides</Link>
        </div>
      )}
    </header>
  );
}

export function Header() {
  return (
    <Suspense fallback={<div className="h-16 border-b border-gray-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 sticky top-0" />}>
      <HeaderContent />
    </Suspense>
  );
}
