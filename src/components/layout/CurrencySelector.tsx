'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useCurrency, currencies } from '@/context/CurrencyContext';

export function CurrencySelector() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();

  if (pathname === '/') return null;

  return (
    <div className="flex items-center space-x-2">
      <select
        value={currency.code}
        onChange={(e) => {
          const found = currencies.find(c => c.code === e.target.value);
          if (found) setCurrency(found);
        }}
        className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 transition-colors"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} ({c.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}
