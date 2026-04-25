'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'EUR' | 'USD';

interface Rates {
  base: string;
  rates: Record<string, number>;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  rates: Rates | null;
  convertAmount: (amount: number, fromCurrency?: string) => number;
  formatAmount: (amount: number, fromCurrency?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>('EUR');
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    // load from localStorage
    const saved = localStorage.getItem('mina_currency') as Currency;
    if (saved && (saved === 'EUR' || saved === 'USD')) {
      setCurrencyState(saved);
    }

    // fetch rates
    const fetchRates = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:2222';
        // Note: we can use the environment variable, but it looks like the local API is often at 2222 or similar. 
        // We will stick to the default apiUrl structure seen in campaigns/page.tsx
        const res = await fetch(`${apiUrl}/currency/rates`);
        if (res.ok) {
          const data = await res.json();
          setRates(data);
        }
      } catch (err) {
        console.error('Failed to fetch currency rates', err);
      }
    };
    fetchRates();
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('mina_currency', newCurrency);
  };

  const convertAmount = (amount: number, fromCurrency: string = 'EUR') => {
    if (!rates || fromCurrency === currency) return amount;
    // convert from fromCurrency to base, then base to target
    const rateFrom = rates.rates[fromCurrency] || 1;
    const rateTo = rates.rates[currency] || 1;
    return (amount / rateFrom) * rateTo;
  };

  const formatAmount = (amount: number, fromCurrency: string = 'EUR') => {
    const converted = convertAmount(amount, fromCurrency);
    return new Intl.NumberFormat(currency === 'EUR' ? 'de-DE' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, convertAmount, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
