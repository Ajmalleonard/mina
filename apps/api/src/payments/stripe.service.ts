import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey || secretKey === 'sk_test_your_stripe_secret_key') {
      this.logger.warn('Stripe secret key is not configured — Stripe payments will fail.');
    }
    this.stripe = new Stripe(secretKey || '', {
      apiVersion: '2023-10-16',
    });
  }

  /**
   * Create a Stripe PaymentIntent.
   * @param amount Amount in dollars
   * @param isMonthly Whether this is a recurring donation
   * @param metadata Additional metadata
   * @returns The client secret and id
   */
  async createPaymentIntent(amount: number, isMonthly?: boolean, metadata: Record<string, string> = {}): Promise<{ clientSecret: string; id: string }> {
    const amountInCents = Math.round(amount * 100);

    if (amountInCents < 50) { // Stripe minimum is usually 50 cents
      throw new Error('Minimum donation is $0.50');
    }

    this.logger.log(`Creating PaymentIntent for $${amount} (${amountInCents} cents)`);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd', // Should be dynamic based on order currency
      metadata: {
        isMonthly: isMonthly ? 'true' : 'false',
        source: 'mina-foundation',
        ...metadata,
      },
    });

    return { clientSecret: paymentIntent.client_secret!, id: paymentIntent.id };
  }
}
