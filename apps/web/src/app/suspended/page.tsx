'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuspendedContent() {
  const searchParams = useSearchParams();
  const domain = searchParams ? (searchParams.get('domain') || 'your domain') : 'your domain';

  // Construct the redirect URL to the billing dashboard with the client domain details
  const billingUrl = `https://billing.squareexp.com?domain=${encodeURIComponent(domain)}`;

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: '24px',
        padding: '48px 32px',
        width: '100%',
        maxWidth: '480px',
        textAlign: 'center',
        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Animated Accent Line at the Top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          width: '80%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #6e44ff, #00b4d8, transparent)',
        }}
      />

      {/* Glow Icon Container */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(110, 68, 255, 0.1)',
          border: '1px solid rgba(110, 68, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 28px auto',
          boxShadow: '0 8px 32px rgba(110, 68, 255, 0.15)',
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00b4d8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>

      {/* Status Title */}
      <h1
        style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '12px',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 60%, #a3a3a3 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Service Temporarily Offline
      </h1>

      {/* Show the domain we are evaluating */}
      <span
        style={{
          display: 'inline-block',
          fontSize: '13px',
          color: '#00b4d8',
          backgroundColor: 'rgba(0, 180, 216, 0.08)',
          border: '1px solid rgba(0, 180, 216, 0.15)',
          padding: '4px 12px',
          borderRadius: '20px',
          marginBottom: '20px',
          fontWeight: '500',
        }}
      >
        {domain}
      </span>

      {/* Status Message */}
      <p
        style={{
          fontSize: '15px',
          color: '#a0a0a5',
          lineHeight: '1.6',
          marginBottom: '32px',
        }}
      >
        This website has been temporarily suspended. If you are the site owner, please click below to view your account status and settle outstanding invoices.
      </p>

      {/* Check Status / Pay Now Button */}
      <a
        href={billingUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6e44ff 0%, #00b4d8 100%)',
          color: '#ffffff',
          fontWeight: '600',
          fontSize: '15px',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(110, 68, 255, 0.25)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
        }}
      >
        Check Status & Pay Invoice
      </a>

      {/* Separator */}
      <div
        style={{
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          width: '100%',
          marginTop: '32px',
          marginBottom: '20px',
        }}
      />

      {/* Footer Support Notice */}
      <span
        style={{
          display: 'block',
          fontSize: '11px',
          color: '#6b6b75',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        Powered by Squareexp Platform
      </span>
    </div>
  );
}

export default function SuspendedPage() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0a0a0c',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#ffffff',
        padding: '24px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Premium background radial glowing gradients */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(110,68,255,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(0,180,216,0.12) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      {/* Wrapped Content in Suspense Boundary */}
      <Suspense fallback={<div>Loading status details...</div>}>
        <SuspendedContent />
      </Suspense>
    </div>
  );
}
