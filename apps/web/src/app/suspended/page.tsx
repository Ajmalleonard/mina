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
      maxWidth: '480px',
      textAlign: 'center',
      padding: '0 24px',
    }}>
      {/* Status Bar */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '6px 14px',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '40px',
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          display: 'inline-block',
        }} />
        Service Suspended
      </div>

      {/* Big Bold Heading */}
      <h1 style={{
        fontSize: '52px',
        fontWeight: '900',
        color: '#000000',
        lineHeight: '1',
        letterSpacing: '-0.03em',
        marginBottom: '8px',
        marginTop: 0,
      }}>
        OFFLINE
      </h1>

      {/* Domain pill */}
      <div style={{
        display: 'inline-block',
        border: '2px solid #000000',
        padding: '4px 16px',
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: '0.04em',
        color: '#000000',
        marginBottom: '32px',
      }}>
        {domain}
      </div>

      {/* Divider */}
      <div style={{ width: '100%', height: '2px', backgroundColor: '#000000', marginBottom: '32px' }} />

      {/* Message */}
      <p style={{
        fontSize: '15px',
        fontWeight: '500',
        color: '#000000',
        lineHeight: '1.65',
        marginBottom: '40px',
        marginTop: 0,
      }}>
        This website has been suspended due to an outstanding invoice.
        If you are the site owner, please visit the billing portal to
        settle your balance and restore service.
      </p>

      {/* CTA */}
      <a
        href={billingUrl}
        style={{
          display: 'block',
          width: '100%',
          padding: '16px',
          backgroundColor: '#000000',
          color: '#ffffff',
          fontWeight: '800',
          fontSize: '14px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >
        Go to Billing Portal →
      </a>

      {/* Footer */}
      <p style={{
        fontSize: '11px',
        color: '#888888',
        marginTop: '24px',
        fontWeight: '500',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        Squareexp Hosting Platform
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
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#000000',
      zIndex: 999999,
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <Suspense fallback={<div style={{ color: '#000000', fontWeight: '700' }}>Loading...</div>}>
        <SuspendedContent />
      </Suspense>
    </div>
  );
}
