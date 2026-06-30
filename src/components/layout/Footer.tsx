'use client';

import Link from 'next/link';
import React, { Suspense } from 'react';
import { siteConfig } from '@/config/site';
import { useSearchParams, usePathname } from 'next/navigation';

function FooterContent() {
  const currentYear = new Date().getFullYear();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isEmbed = searchParams.get('embed') === 'true' || pathname?.startsWith('/embed');
  
  if (isEmbed) return null;
  
  return (
    <footer className="bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 py-12 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">
              What If <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Universe</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm max-w-md">
              {siteConfig.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/category/money" className="hover:text-primary">Money</Link></li>
              <li><Link href="/category/career" className="hover:text-primary">Career</Link></li>
              <li><Link href="/category/health" className="hover:text-primary">Health</Link></li>
              <li><Link href="/category/education" className="hover:text-primary">Education</Link></li>
              <li><Link href="/category/business" className="hover:text-primary">Business</Link></li>
              <li><Link href="/category/lifestyle" className="hover:text-primary">Lifestyle</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Not professional financial, medical, or legal advice.</p>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <Suspense fallback={null}>
      <FooterContent />
    </Suspense>
  );
}
