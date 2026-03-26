"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const status = searchParams?.get("status");
  const orderId = searchParams?.get("orderId");
  const trackingId = searchParams?.get("OrderTrackingId"); // Pesapal legacy

  // Break out of iframe if loaded inside one (for Pesapal)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.top !== window.self &&
      window.top
    ) {
      window.top.location.href = window.location.href;
    }
  }, []);

  const isSuccess = status === "success" || trackingId;

  return (
    <div className="w-full bg-[#FFFBF2] text-[#111111] min-h-screen pt-32 pb-16 flex flex-col items-center">
      <div className="max-w-md w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 rounded-3xl border border-black/5">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-4">
            {isSuccess ? "Payment Successful" : "Payment Failed"}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {isSuccess
              ? "Thank you for your generous donation. Your transaction has been processed successfully."
              : "Unfortunately, your payment could not be processed. Please try again."}
          </p>

          {(orderId || trackingId) && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-8 text-left inline-block w-full">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">
                Order Reference
              </p>
              <p className="font-mono text-[#111111] break-all text-sm">
                {orderId || trackingId}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Button href="/" className="w-full rounded-full">
              Return to Home
            </Button>
            {!isSuccess && (
              <Button
                href="/checkout"
                variant="outline"
                className="w-full rounded-full"
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading payment status...
        </div>
      }
    >
      <PaymentResultContent />
    </Suspense>
  );
}
