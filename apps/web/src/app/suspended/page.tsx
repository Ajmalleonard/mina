'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuspendedContent() {
  const searchParams = useSearchParams();
  const domain = searchParams ? (searchParams.get('domain') || 'your domain') : 'your domain';
  const billingUrl = `https://billing.squareexp.com?domain=${encodeURIComponent(domain)}`;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '440px',
        textAlign: 'center',
        padding: '40px 24px',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Generic Minimalist Warning Icon */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#f5f5f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1d1d1f"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h1
        style={{
          fontSize: '22px',
          fontWeight: '600',
          color: '#1d1d1f',
          marginBottom: '10px',
          letterSpacing: '-0.01em',
        }}
      >
        Website Offline
      </h1>

      <span
        style={{
          display: 'inline-block',
          fontSize: '13px',
          color: '#86868b',
          backgroundColor: '#f5f5f7',
          padding: '4px 12px',
          borderRadius: '16px',
          marginBottom: '20px',
          fontWeight: '500',
        }}
      >
        {domain}
      </span>

      <p
        style={{
          fontSize: '14px',
          color: '#515154',
          lineHeight: '1.5',
          marginBottom: '28px',
        }}
      >
        This website has been suspended. If you are the administrator of this domain, please check your billing portal to resolve any pending invoices.
      </p>

      <a
        href={billingUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: '#1d1d1f',
          color: '#ffffff',
          fontWeight: '500',
          fontSize: '14px',
          textDecoration: 'none',
          transition: 'background-color 0.2s',
          cursor: 'pointer',
        }}
      >
        Check Status
      </a>
    </div>
  );
}

export default function SuspendedPage() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: '#1d1d1f',
        zIndex: 999999,
        padding: '20px',
      }}
    >
      <Suspense fallback={<div style={{ color: '#86868b' }}>Loading...</div>}>
        <SuspendedContent />
      </Suspense>
    </div>
  );
}
