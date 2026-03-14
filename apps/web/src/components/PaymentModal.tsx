"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  redirectUrl,
}: PaymentModalProps) {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !redirectUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-white">
          <h3 className="text-lg font-bold text-[#111111]">Secure Payment</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full text-gray-500 hover:text-[#111111]"
            aria-label="Close payment modal"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 w-full bg-gray-50 relative">
          <iframe
            src={redirectUrl}
            className="w-full h-full border-0 absolute inset-0"
            title="PesaPal Payment"
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}
