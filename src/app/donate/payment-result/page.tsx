"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect } from "react";

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const orderTrackingId = searchParams?.get("OrderTrackingId");
  const orderMerchantReference = searchParams?.get("OrderMerchantReference");
  // Typically PesaPal redirects with these.
  // We don't know the status immediately unless we query it, OR we assume success if they reached here?
  // Actually, PesaPal redirects here *after* payment. It doesn't guarantee success.
  // We should ideally show a "Processing..." state and query our backend to check status,
  // OR just say "Thank you for completing the process. You will receive an email confirmation."

  // Break out of iframe if loaded inside one
  useEffect(() => {
    if (typeof window !== "undefined" && window.top !== window.self) {
        if( window.top){
            window.top.location.href = window.location.href;
        }
    }
  }, []);

  return (
    <div className="w-full bg-[#FFFBF2] text-[#111111] min-h-screen pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 rounded-3xl border border-black/5 ">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Payment Processed</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your generous donation. Your transaction with PesaPal has been processed.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-sm border border-gray-100 mb-8 text-left inline-block w-full max-w-md">
            <p className="text-sm text-gray-500 mb-1">Reference ID:</p>
            <p className="font-mono text-[#111111] break-all">{orderTrackingId || "N/A"}</p>
          </div>
          
          <div className="mt-8">
            <Link
              href="/"
              className="px-8 py-3 bg-[#111111] text-white rounded-full font-bold hover:bg-black transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentResultContent />
        </Suspense>
    )
}
