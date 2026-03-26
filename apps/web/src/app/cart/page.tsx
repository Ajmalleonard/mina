'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Trash } from 'iconsax-reactjs';

export default function CartPage() {
  const { cart, loading, removeFromCart, totalAmount, itemCount } = useCart();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!cart || itemCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h2 className="text-2xl font-bold mb-4">Your Donation Basket is Empty</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          It looks like you haven't added any donation campaigns to your basket yet.
        </p>
        <Button href="/donate" className="rounded-full">
          Browse Campaigns
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Donation Basket</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            <ul className="divide-y divide-gray-100">
              {cart.items.map((item) => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={item.activity.image || '/placeholder.jpg'}
                      alt={item.activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.activity.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Donation Amount: ${item.amount}
                    </p>
                    {item.quantity > 1 && (
                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-gray-900">
                      ${item.amount * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash size="20" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              <span className="text-gray-600">Total Items</span>
              <span className="font-medium">{itemCount}</span>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-gray-900">Total Donation</span>
              <span className="text-2xl font-bold text-green-600">${totalAmount}</span>
            </div>

            <Button href="/checkout" className="w-full rounded-full py-4 text-base">
              Proceed to Payment
            </Button>
            
            <p className="mt-4 text-xs text-center text-gray-500">
              Secure payment processing powered by Stripe and PayPal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
