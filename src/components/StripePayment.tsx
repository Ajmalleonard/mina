import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { gsap } from 'gsap';

// Use a real test publishable key for development
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51OxCQXSJnCnXYVZYHVQnJgTXDTXXwQjgxRvQzBVuuBNsNwXtgSvjdkjLMnJgTXDTXXwQjgxRvQzBVuuBNsNwXtgSvjdkjLM');

interface PaymentFormProps {
  amount: string;
  isMonthly: boolean;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, isMonthly, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError('Card element not found');
      return;
    }

    setIsProcessing(true);

    try {
      // Create a payment intent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          isMonthly: isMonthly,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      const { clientSecret } = data;

      // Confirm the payment with Stripe.js
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement as any,
        },
      });

      if (error) {
        throw new Error(error.message || 'Payment failed');
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess();
      } else {
        throw new Error(`Payment status: ${paymentIntent.status}`);
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="p-4 border border-green-200 rounded-md bg-white">
        <label className="block text-sm font-medium text-green-700 mb-2">
          Card Details
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
              },
            },
          }}
          className="p-3 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : isMonthly ? 'Start Monthly Donation' : 'Donate Now'}
      </button>
    </form>
  );
};

interface StripePaymentProps {
  amount: string;
  isMonthly: boolean;
}

const StripePayment: React.FC<StripePaymentProps> = ({ amount, isMonthly }) => {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate payment form entrance
    if (formRef.current && paymentStatus === 'idle') {
      gsap.from(formRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    }
    
    // Animate success message
    if (successRef.current && paymentStatus === 'success') {
      gsap.from(successRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      });
    }
    
    // Animate error message
    if (errorRef.current && paymentStatus === 'error') {
      gsap.from(errorRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [paymentStatus]);

  const handleSuccess = () => {
    setPaymentStatus('success');
  };

  const handleError = (error: string) => {
    setPaymentStatus('error');
    setErrorMessage(error);
  };

  if (paymentStatus === 'success') {
    return (
      <div ref={successRef} className="text-center p-6 bg-green-50 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-green-600 mb-4"
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
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank You for Your Donation!</h3>
        <p className="text-gray-700">
          Your {isMonthly ? 'monthly' : 'one-time'} donation of ${amount} has been processed successfully.
        </p>
        <p className="text-sm text-green-600 mt-4">
          A receipt has been sent to your email address.
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      {paymentStatus === 'error' ? (
        <div ref={errorRef} className="text-center p-6 bg-red-50 rounded-lg mb-4">
          <p className="text-red-700 font-medium">{errorMessage}</p>
          <button
            onClick={() => setPaymentStatus('idle')}
            className="mt-4 text-green-700 hover:text-green-900 font-medium"
          >
            Try Again
          </button>
        </div>
      ) : null}
      
      <div ref={formRef}>
        <PaymentForm
          amount={amount}
          isMonthly={isMonthly}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </Elements>
  );
};

export default StripePayment;