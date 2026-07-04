'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuspendedContent() {
  const searchParams = useSearchParams();
  const domain = searchParams ? (searchParams.get('domain') || 'your domain') : 'your domain';
  const billingUrl = `https://billing.squareexp.com?domain=${encodeURIComponent(domain)}`;

  return (
    <div style={{
      width: '100%',
      maxWidth: '390px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
    }}>
      {/* Icon */}
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        backgroundColor: '#f2f2f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4px',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '22px',
        fontWeight: '600',
        color: '#000000',
        margin: '0',
        letterSpacing: '-0.3px',
        textAlign: 'center',
      }}>
        Service Suspended
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '15px',
        color: '#6d6d72',
        lineHeight: '1.5',
        textAlign: 'center',
        margin: '0 0 8px 0',
        fontWeight: '400',
        maxWidth: '300px',
      }}>
        Your website is temporarily paused. Visit the billing portal to get it back online quickly.
      </p>

      {/* Card */}
      <div style={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          borderBottom: '0.5px solid #e5e5ea',
        }}>
          <span style={{ fontSize: '15px', color: '#6d6d72', fontWeight: '400' }}>Domain</span>
          <span style={{ fontSize: '15px', color: '#000000', fontWeight: '400' }}>{domain}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
        }}>
          <span style={{ fontSize: '15px', color: '#6d6d72', fontWeight: '400' }}>Status</span>
          <span style={{ fontSize: '13px', color: '#ff3b30', fontWeight: '500', backgroundColor: '#fff1f0', padding: '3px 10px', borderRadius: '20px' }}>Suspended</span>
        </div>
      </div>

      {/* Primary CTA */}
      <a
        href={billingUrl}
        style={{
          display: 'block',
          width: '100%',
          padding: '16px',
          borderRadius: '999px',
          backgroundColor: '#000000',
          color: '#ffffff',
          fontWeight: '500',
          fontSize: '15px',
          textAlign: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
          boxSizing: 'border-box',
          marginTop: '4px',
        }}
      >
        Go to Billing Portal
      </a>

      {/* Footer */}
      <p style={{
        fontSize: '12px',
        color: '#aeaeb2',
        marginTop: '8px',
        fontWeight: '400',
        textAlign: 'center',
      }}>
        Squareexp Hosting
      </p>
    </div>
  );
}

export default function SuspendedPage() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f2f2f7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
      color: '#000000',
      zIndex: 999999,
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <Suspense fallback={<div style={{ color: '#6d6d72', fontSize: '15px' }}>Loading…</div>}>
        <SuspendedContent />
      </Suspense>
    </div>
  );
}
