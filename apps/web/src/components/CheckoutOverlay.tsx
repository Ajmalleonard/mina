import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';

interface CheckoutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: string;
  activityTitle: string;
  amount: number;
}

export default function CheckoutOverlay({
  isOpen,
  onClose,
  activityId,
  activityTitle,
  amount,
}: CheckoutOverlayProps) {
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    message: '',
    paymentMethod: 'paypal', // default
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { t } = useI18n();

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    try {
      const response = await fetch(`${apiUrl}/payments/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount,
          currency: 'USD',
          activityId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment initiation failed');
      }

      if (data.payment && data.payment.url) {
        window.location.href = data.payment.url;
      } else {
        throw new Error('No redirect URL provided by payment gateway');
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="bg-white max-w-lg w-full p-8 border border-[#111111] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold hover:text-gray-500"
        >
          ×
        </button>
        
        <h2 className="text-2xl font-bold mb-2 text-[#111111]">{t('checkout.title')}</h2>
        <p className="text-sm text-gray-600 mb-6 border-b border-[#111111] pb-4">
          {t('checkout.lead').replace('{amount}', `$${amount}`).replace('{activity}', activityTitle)}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">{t('checkout.full_name')}</label>
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleInputChange}
              className="w-full border border-[#111111] p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#111111]"
              placeholder={t('checkout.placeholder.name')}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">{t('checkout.email')}</label>
            <input
              type="email"
              name="donorEmail"
              value={formData.donorEmail}
              onChange={handleInputChange}
              className="w-full border border-[#111111] p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#111111]"
              placeholder={t('checkout.placeholder.email')}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">{t('checkout.phone')}</label>
            <input
              type="tel"
              name="donorPhone"
              value={formData.donorPhone}
              onChange={handleInputChange}
              className="w-full border border-[#111111] p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#111111]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">{t('checkout.message')}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={2}
              className="w-full border border-[#111111] p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#111111]"
              placeholder={t('checkout.placeholder.message')}
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">{t('checkout.payment_method')}</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`border border-[#111111] p-3 text-center cursor-pointer transition-colors ${formData.paymentMethod === 'paypal' ? 'bg-[#111111] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <span className="font-bold text-sm uppercase">{t('checkout.payment.paypal')}</span>
              </label>
              <label className={`border border-[#111111] p-3 text-center cursor-pointer transition-colors ${formData.paymentMethod === 'pesapal' ? 'bg-[#111111] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pesapal"
                  checked={formData.paymentMethod === 'pesapal'}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <span className="font-bold text-sm uppercase">{t('checkout.payment.pesapal')}</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#95E18A] text-[#111111] p-4 text-sm font-bold uppercase tracking-widest hover:bg-[#85c97b] transition-colors border border-[#111111] mt-6 disabled:opacity-50"
          >
            {loading ? t('checkout.processing') : t('checkout.proceed')}
          </button>
        </form>
      </div>
    </div>
  );
}
