'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

function PayPalReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const paypalOrderId = searchParams!.get('token');
    const orderId = searchParams!.get('orderId');

    if (!paypalOrderId) {
      setErrorMessage('Missing payment reference from PayPal.');
      setStatus('error');
      return;
    }

    api
      .post('/payments/paypal/capture', { paypalOrderId, orderId })
      .then(({ data }) => {
        if (data.success) {
          setStatus('success');
        } else {
          setErrorMessage(`Payment not completed (status: ${data.status})`);
          setStatus('error');
        }
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message || 'Payment capture failed.');
        setStatus('error');
      });
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="text-center py-20">
        <div className="w-10 h-10 border-2 border-[#111111] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="text-sm text-[#888]">Confirming your payment with PayPal…</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-20">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#111111] mb-2">Something went wrong</h2>
        <p className="text-sm text-[#888] mb-8">{errorMessage}</p>
        <Link href="/checkout" className="text-sm text-[#111111] font-semibold underline underline-offset-4">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center py-20">
      <div className="w-14 h-14 bg-[#111111] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-[#111111] mb-2">Donation Confirmed!</h2>
      <p className="text-sm text-[#888] mb-2">Thank you for your generosity.</p>
      <p className="text-sm text-[#888] mb-10">A confirmation email will be sent to you shortly.</p>

      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-1">Share the goodness</p>
        <div className="flex justify-center gap-3">
          <a
            href="https://twitter.com/intent/tweet?text=I+just+made+a+donation+to+Mina+Foundation!&url=https://minafoundationtz.org"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1da1f2] text-white text-xs font-semibold hover:opacity-90 transition-opacity rounded"
          >
            Twitter
          </a>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://minafoundationtz.org"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1877f2] text-white text-xs font-semibold hover:opacity-90 transition-opacity rounded"
          >
            Facebook
          </a>
          <a
            href="whatsapp://send?text=I+just+donated+to+Mina+Foundation!+https://minafoundationtz.org"
            className="px-5 py-2.5 bg-[#25d366] text-white text-xs font-semibold hover:opacity-90 transition-opacity rounded"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <Link href="/" className="inline-block mt-10 text-sm text-[#111111] font-semibold underline underline-offset-4">
        Return Home
      </Link>
    </div>
  );
}

export default function PayPalReturnPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <Suspense fallback={
        <div className="text-center py-20">
          <div className="w-10 h-10 border-2 border-[#111111] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-sm text-[#888]">Loading…</p>
        </div>
      }>
        <PayPalReturnContent />
      </Suspense>
    </div>
  );
}
