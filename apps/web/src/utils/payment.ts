/**
 * Utility functions for payment processing
 */

/**
 * Format currency amount for display
 * @param amount - The amount to format
 * @param currency - The currency code (default: USD)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: string | number, currency = 'USD'): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(numAmount);
};

/**
 * Validate donation amount
 * @param amount - The donation amount to validate
 * @returns Object with validation result and error message if any
 */
export const validateDonationAmount = (amount: string): { isValid: boolean; errorMessage?: string } => {
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) {
    return { isValid: false, errorMessage: 'Please enter a valid amount' };
  }
  
  if (numAmount < 1) {
    return { isValid: false, errorMessage: 'Minimum donation amount is $1' };
  }
  
  return { isValid: true };
};

/**
 * Get payment method display name from Stripe payment method
 * @param type - The payment method type from Stripe
 * @returns User-friendly payment method name
 */
export const getPaymentMethodDisplayName = (type: string): string => {
  const methodNames: Record<string, string> = {
    'card': 'Credit Card',
    'us_bank_account': 'US Bank Account',
    'sepa_debit': 'SEPA Direct Debit',
    'au_becs_debit': 'BECS Direct Debit',
  };
  
  return methodNames[type] || type;
};