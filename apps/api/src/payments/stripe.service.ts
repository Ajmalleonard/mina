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
   * @returns The client secret for the frontend to confirm payment
   */
  async createPaymentIntent(amount: number, isMonthly?: boolean): Promise<string> {
    const amountInCents = Math.round(amount * 100);

    if (amountInCents < 100) {
      throw new Error('Minimum donation is $1');
    }

    this.logger.log(`Creating PaymentIntent for $${amount} (${amountInCents} cents)`);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: {
        isMonthly: isMonthly ? 'true' : 'false',
        source: 'mina-foundation',
      },
    });

    return paymentIntent.client_secret!;
  }
}
