'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = {
  symbol: string;
  locale: string;
  code: string;
  rateToBase: number; // Exchange rate relative to INR (base)
};

export const currencies: Currency[] = [
  { symbol: '₹', locale: 'en-IN', code: 'INR', rateToBase: 1 },
  { symbol: '$', locale: 'en-US', code: 'USD', rateToBase: 83.3 },
  { symbol: '€', locale: 'en-IE', code: 'EUR', rateToBase: 89.6 },
  { symbol: '£', locale: 'en-GB', code: 'GBP', rateToBase: 104.5 },
  { symbol: 'AED', locale: 'en-AE', code: 'AED', rateToBase: 22.6 },
  { symbol: 'SAR', locale: 'en-SA', code: 'SAR', rateToBase: 22.2 },
  { symbol: 'QAR', locale: 'en-QA', code: 'QAR', rateToBase: 22.8 },
  { symbol: 'OMR', locale: 'en-OM', code: 'OMR', rateToBase: 216.5 },
  { symbol: 'KWD', locale: 'en-KW', code: 'KWD', rateToBase: 271.5 },
  { symbol: 'BHD', locale: 'en-BH', code: 'BHD', rateToBase: 221.0 },
];

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencies[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('whatif-currency');
    if (saved) {
      const found = currencies.find(c => c.code === saved);
      if (found) setCurrencyState(found);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('whatif-currency', c.code);
  };

  // Prevent hydration mismatch by rendering default until mounted
  if (!mounted) {
    return <CurrencyContext.Provider value={{ currency: currencies[0], setCurrency }}>{children}</CurrencyContext.Provider>;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
