'use client';

import Link from 'next/link';
import React, { Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { CurrencySelector } from './CurrencySelector';
import { ThemeToggle } from './ThemeToggle';

function HeaderContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isEmbed = searchParams.get('embed') === 'true' || pathname?.startsWith('/embed');

  if (isEmbed) return null;

  return (
    <header className="border-b border-gray-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-2xl tracking-tighter text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
          What If <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Universe</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/category/money" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Money</Link>
          <Link href="/category/career" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Career</Link>
          <Link href="/category/health" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Health</Link>
          <Link href="/category/education" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Education</Link>
          <Link href="/category/business" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Business</Link>
          <Link href="/guides" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">Guides</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <CurrencySelector />
          <ThemeToggle />
        </div>
      </div>
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
