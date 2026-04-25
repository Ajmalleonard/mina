import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaypalService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.clientId = this.configService.get<string>('PAYPAL_APP_ID') || '';
    this.clientSecret = this.configService.get<string>('PAYPAL_APP_SECRET') || '';
    const env = this.configService.get<string>('PAYPAL_ENV', 'sandbox');
    this.baseUrl = env === 'production'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

    if (!this.clientId || !this.clientSecret) {
      console.warn('PayPal credentials are missing — PayPal payments will fail.');
    }
  }

  private async generateAccessToken(): Promise<string> {
    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch PayPal access token');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('PayPal Auth Error:', error);
      throw new HttpException('Failed to authenticate with PayPal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createOrder(amount: number, currency: string = 'EUR', orderId?: string): Promise<any> {
    const accessToken = await this.generateAccessToken();
    const normalizedCurrency = (currency || 'EUR').toUpperCase();
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'https://minafoundationtz.org';
    const returnUrl = `${frontendUrl}/checkout/paypal-return?orderId=${orderId || ''}`;
    const cancelUrl = `${frontendUrl}/checkout?cancelled=true`;

    try {
      const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              reference_id: orderId || 'donation',
              amount: {
                currency_code: normalizedCurrency,
                value: amount.toFixed(2),
              },
            },
          ],
          application_context: {
            return_url: returnUrl,
            cancel_url: cancelUrl,
            brand_name: 'Mina Foundation',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
          },
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Failed to create PayPal order: ${errBody}`);
      }

      return response.json();
    } catch (error) {
      console.error('PayPal Create Order Error:', error);
      throw new HttpException('Failed to create PayPal order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async captureOrder(orderId: string): Promise<any> {
    const accessToken = await this.generateAccessToken();

    try {
      const response = await fetch(`${this.baseUrl}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Failed to capture PayPal order: ${errBody}`);
      }

      return response.json();
    } catch (error) {
      console.error('PayPal Capture Order Error:', error);
      throw new HttpException('Failed to capture PayPal order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
