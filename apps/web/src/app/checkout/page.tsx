'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '@/lib/api';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DonorDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
}

// ─── Step Indicator ──────────────────────────────────────────────────────────

const STEPS = ['Cart', 'Your Data', 'Payment', 'Done'];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center w-full max-w-lg mx-auto mb-10 px-2">
      {STEPS.map((label, i) => {
        const active = i + 1 === current;
        const done = i + 1 < current;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                  ${done || active ? 'bg-[#111111] text-white' : 'bg-[#e5e5e5] text-[#888]'}`}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`mt-1.5 text-xs font-medium ${active ? 'text-[#111111]' : 'text-[#aaa]'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 mt-[-12px] ${done ? 'bg-[#111111]' : 'bg-[#e5e5e5]'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Step 1: Cart Review ─────────────────────────────────────────────────────

function CartReview({ onNext }: { onNext: () => void }) {
  const { cart, removeFromCart, totalAmount } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[#888] text-base mb-6">Your basket is empty.</p>
        <Link href="/" className="text-[#111111] text-sm font-semibold underline underline-offset-4">
          Browse Campaigns
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-[#111111] mb-6">Your Basket</h2>
      <div className="space-y-0 mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b border-[#f0f0f0]">
            <div className="relative w-14 h-14 bg-[#f5f5f5] shrink-0 overflow-hidden rounded-lg">
              <Image
                src={item.activity.image || '/placeholder.jpg'}
                alt={item.activity.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#111111] truncate">{item.activity.title}</p>
              <p className="text-xs text-[#888] mt-0.5">Qty: {item.quantity}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-[#111111]">
                €{(item.amount * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-xs text-[#aaa] hover:text-red-500 transition-colors mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center py-4 border-t-2 border-[#111111]">
        <span className="text-sm font-semibold text-[#111111] uppercase tracking-wider">Total</span>
        <span className="text-xl font-bold text-[#111111]">€{totalAmount.toFixed(2)}</span>
      </div>

      <button
        onClick={onNext}
        className="w-full mt-6 bg-[#111111] text-white py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-[#333] transition-colors rounded-xl"
      >
        Next →
      </button>
    </div>
  );
}

// ─── Step 2: Donor Information ────────────────────────────────────────────────

function DonorForm({ onNext, onBack }: { onNext: (data: DonorDetails) => void; onBack: () => void }) {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<DonorDetails>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="bg-white rounded-2xl p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-[#111111] mb-6">Your Data</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#888] mb-1.5">First Name *</label>
            <input
              {...register('firstName', { required: 'Required' })}
              className="w-full bg-[#f8f8f8] px-4 py-3 text-sm text-[#111111] placeholder-[#bbb] focus:outline-none focus:bg-[#f0f0f0] transition-colors rounded-lg"
              placeholder="First name"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-[#888] mb-1.5">Last Name *</label>
            <input
              {...register('lastName', { required: 'Required' })}
              className="w-full bg-[#f8f8f8] px-4 py-3 text-sm text-[#111111] placeholder-[#bbb] focus:outline-none focus:bg-[#f0f0f0] transition-colors rounded-lg"
              placeholder="Last name"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#888] mb-1.5">Email Address *</label>
          <input
            type="email"
            {...register('email', { required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
            className="w-full bg-[#f8f8f8] px-4 py-3 text-sm text-[#111111] placeholder-[#bbb] focus:outline-none focus:bg-[#f0f0f0] transition-colors rounded-lg"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#888] mb-1.5">Phone (Optional)</label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full bg-[#f8f8f8] px-4 py-3 text-sm text-[#111111] placeholder-[#bbb] focus:outline-none focus:bg-[#f0f0f0] transition-colors rounded-lg"
            placeholder="+1 234 567 890"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#888] mb-1.5">Message (Optional)</label>
          <textarea
            {...register('message')}
            rows={3}
            className="w-full bg-[#f8f8f8] px-4 py-3 text-sm text-[#111111] placeholder-[#bbb] focus:outline-none focus:bg-[#f0f0f0] transition-colors resize-none rounded-lg"
            placeholder="Leave a message of support..."
          />
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 px-6 py-3.5 text-sm font-semibold text-[#111111] bg-[#f0f0f0] hover:bg-[#e5e5e5] transition-colors rounded-xl"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-[#111111] text-white py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-[#333] transition-colors rounded-xl"
        >
          Next →
        </button>
      </div>
    </form>
  );
}

// ─── Step 3: Payment ──────────────────────────────────────────────────────────

function PaymentStep({
  onBack,
  onSuccess,
  donorDetails,
  tempOrderId,
}: {
  onBack: () => void;
  onSuccess: () => void;
  donorDetails: DonorDetails;
  tempOrderId: string | null;
}) {
  const { cart, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState<string | null>(null);

  const processPayment = async (method: 'paypal' | 'pesapal') => {
    setLoading(method);
    try {
      const { data } = await api.post('/orders/checkout', {
        items: cart.items,
        paymentMethod: method,
        donorDetails: {
          name: `${donorDetails.firstName} ${donorDetails.lastName}`.trim(),
          email: donorDetails.email,
          phone: donorDetails.phone || '',
          message: donorDetails.message || '',
        },
        tempOrderId,
      });

      if (data.redirectUrl) {
        clearCart();
        window.location.href = data.redirectUrl;
      } else if (data.order) {
        clearCart();
        onSuccess();
      } else {
        throw new Error('No payment URL returned');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err.message || 'Payment failed. Please try again.');
      setLoading(null);
    }
  };

  const isLoading = loading !== null;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-[#111111] mb-1">Payment</h2>
      <p className="text-sm text-[#888] mb-8">
        Total:{' '}
        <span className="font-bold text-[#111111]">€{totalAmount.toFixed(2)}</span>
      </p>
      <hr className='border-[#bababa] my-2 border-dashed border-[0.5px]' />
      <div className="space-y-3">
        {/* PayPal */}
        <button
          onClick={() => processPayment('paypal')}
          disabled={isLoading}
          className="w-full flex items-center justify-between px-5 py-4  bg-white transition-colors disabled:opacity-50 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex">
              <Image
                src="/paypal.png"
                alt="PayPal"
                width={100}
                height={100}
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[#111111]">PayPal</p>
              <p className="text-xs text-[#888]">Fast, secure checkout</p>
            </div>
          </div>
          <span className="text-sm text-[#888] font-medium">
            {loading === 'paypal' ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#888] border-t-transparent rounded-full animate-spin" />
                Redirecting…
              </span>
            ) : '→'}
          </span>
        </button>
        <hr className='border-[#bababa] my-2 border-dashed border-[0.5px]' />
        {/* Pesapal */}
        <button
          onClick={() => processPayment('pesapal')}
          disabled={isLoading}
          className="w-full flex items-center justify-between px-5 py-4 bg-white transition-colors disabled:opacity-50 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="  flex items-center justify-center rounded-lg">
              <Image
                src="/pesapal.png"
                alt="Pesapal"
                width={100}
                height={100}
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[#111111]">Pesapal</p>
              <p className="text-xs text-[#888]">Mobile money & local cards</p>
            </div>
          </div>
          <span className="text-sm text-[#888] font-medium">
            {loading === 'pesapal' ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#888] border-t-transparent rounded-full animate-spin" />
                Redirecting…
              </span>
            ) : '→'}
          </span>
        </button>
      </div>
      <hr className='border-[#bababa] my-2 border-dashed border-[0.5px]' />
      <button
        type="button"
        onClick={onBack}
        disabled={isLoading}
        className="mt-6 text-sm text-[#888] hover:text-[#111111] transition-colors"
      >
        ← Back
      </button>
    </div>
  );
}

// ─── Step 4: Done ──────────────────────────────────────────────────────────────

function DoneStep({ name }: { name: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 text-center">
      <div className="w-14 h-14 bg-[#111111] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-[#111111] mb-2">Thank You, {name.split(' ')[0]}!</h2>
      <p className="text-sm text-[#888] mb-1">Your donation is being processed.</p>
      <p className="text-sm text-[#888] mb-10">A confirmation email will be sent to you shortly.</p>

      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-1">Share the goodness</p>
        <div className="flex justify-center gap-3">
          <a
            href="https://twitter.com/intent/tweet?text=I+just+made+a+donation+to+Mina+Foundation!&url=https://minafoundationtz.org"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1da1f2] text-white text-xs font-semibold hover:opacity-90 transition-opacity rounded-lg"
          >Twitter</a>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://minafoundationtz.org"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1877f2] text-white text-xs font-semibold hover:opacity-90 transition-opacity rounded-lg"
          >Facebook</a>
          <a
            href="whatsapp://send?text=I+just+donated+to+Mina+Foundation!+https://minafoundationtz.org"
            className="px-5 py-2.5 bg-[#25d366] text-white text-xs font-semibold hover:opacity-90 transition-opacity rounded-lg"
          >WhatsApp</a>
        </div>
      </div>

      <Link
        href="/"
        className="inline-block mt-10 text-sm text-[#111111] font-semibold underline underline-offset-4 hover:text-[#444] transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { cart } = useCart();
  const [step, setStep] = useState(1);
  const [donorDetails, setDonorDetails] = useState<DonorDetails | null>(null);
  const [tempOrderId, setTempOrderId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleDonorNext = async (data: DonorDetails) => {
    setDonorDetails(data);
    setSaving(true);
    try {
      const { data: res } = await api.post('/orders/temporary', {
        items: cart.items,
        donorDetails: {
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          phone: data.phone || '',
        },
      });
      setTempOrderId(res.orderId);
    } catch {
      // Non-fatal: proceed without pre-save
    } finally {
      setSaving(false);
      setStep(3);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {step < 4 && <StepIndicator current={step} />}

        {step === 1 && <CartReview onNext={() => setStep(2)} />}

        {step === 2 && (
          saving ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-8 h-8 border-2 border-[#111111] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-[#888]">Saving your info…</p>
            </div>
          ) : (
            <DonorForm onNext={handleDonorNext} onBack={() => setStep(1)} />
          )
        )}

        {step === 3 && donorDetails && (
          <PaymentStep
            donorDetails={donorDetails}
            tempOrderId={tempOrderId}
            onBack={() => setStep(2)}
            onSuccess={() => setStep(4)}
          />
        )}

        {step === 4 && donorDetails && (
          <DoneStep name={`${donorDetails.firstName} ${donorDetails.lastName}`} />
        )}
      </div>
    </div>
  );
}
