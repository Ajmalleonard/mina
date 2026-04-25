"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCurrency } from '@/context/CurrencyContext';
import { useI18n } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";

type Currency = 'EUR' | 'USD';

const CURRENCIES: { code: Currency; label: string; symbol: string }[] = [
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "USD", label: "US Dollar", symbol: "$" },
];

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const { locale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const current = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full p-3  bg-white text-sm"
      >
        <span className="font-bold">{current.symbol}</span>
        <span className="hidden sm:inline">{current.code}</span>
        <ChevronDown className="w-4 h-4 opacity-70" />
      </button>

      {open && (
        // if language is arabic right-0 - else left-0
        <div className={cn("absolute mt-2 w-36 bg-white rounded-md z-500 overflow-hidden", locale === 'ar' ? 'right-0' : 'left-0')}>
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-3 ${currency === c.code ? 'font-semibold' : 'font-normal'}`}
            >
              <span className="font-bold w-4 text-center">{c.symbol}</span>
              <span>{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
