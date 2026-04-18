'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CloseCircle, Trash } from 'iconsax-reactjs';
import OptimizedImage from '@/components/OptimizedImage';

export default function CartDrawer() {
  const { cart, isDrawerOpen, closeDrawer, removeFromCart, totalAmount, itemCount } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-10000 transition-opacity"
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-10001 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#111111]">
            Basket <span className="text-[#aaa] font-normal">({itemCount})</span>
          </h2>
          <button
            onClick={closeDrawer}
            className="p-1 text-[#aaa] hover:text-[#111111] transition-colors"
          >
            <CloseCircle size="22" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-[#aaa] text-sm">Your basket is empty.</p>
              <button
                onClick={closeDrawer}
                className="text-xs text-[#111111] underline underline-offset-4 hover:text-[#555] transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <ul className="space-y-0">
              {cart.items.map((item) => (
                <li key={item.id} className="flex gap-4 items-center py-4 border-b border-[#f5f5f5]">
                  <div className="relative h-14 w-14 bg-[#f5f5f5] shrink-0 overflow-hidden">
                    <OptimizedImage
                      src={item.activity.image || '/images/placeholder.jpg'}
                      alt={item.activity.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[#111111] truncate">{item.activity.title}</h3>
                    <p className="text-xs text-[#aaa] mt-0.5">
                      €{item.amount.toFixed(2)} {item.quantity > 1 && `× ${item.quantity}`}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-[#111111]">
                      €{(item.amount * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#ccc] hover:text-red-400 transition-colors"
                    >
                      <Trash size="16" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#f0f0f0]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-medium text-[#888] uppercase tracking-widest">Total</span>
              <span className="text-lg font-bold text-[#111111]">€{totalAmount.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="block w-full text-center bg-[#111111] text-white py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#333] transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
