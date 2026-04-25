'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { I18nProvider } from '@/lib/i18n';

import { CurrencyProvider } from '@/context/CurrencyContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      // locale initialization
      const stored = localStorage.getItem('locale');
      const nav = typeof navigator !== 'undefined' ? (navigator.language || (navigator.languages && navigator.languages[0]) || '') : '';
      const detected = stored || (nav ? nav.split('-')[0] : 'en');
      const lang = ['en', 'ar', 'tr', 'es'].includes(detected) ? detected : 'en';
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

      // theme initialization
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = (storedTheme as 'light' | 'dark') || (prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (e) {
      // ignore in non-browser environments
    }
  }, []);
  return (
    <AuthProvider>
      <CartProvider>
        <I18nProvider>
          <CurrencyProvider>
            <Toaster position="bottom-right" richColors />
            <CartDrawer />
            {children}
          </CurrencyProvider>
        </I18nProvider>
      </CartProvider>
    </AuthProvider>
  );
}
