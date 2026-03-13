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
    // Assuming Sandbox for now; change to prod URL when ready
    this.baseUrl = 'https://api-m.sandbox.paypal.com';
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

  async createOrder(amount: number, currency: string = 'USD'): Promise<any> {
    const accessToken = await this.generateAccessToken();

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
              amount: {
                currency_code: currency,
                value: amount.toFixed(2),
              },
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create PayPal order');
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
        throw new Error('Failed to capture PayPal order');
      }

      return response.json();
    } catch (error) {
      console.error('PayPal Capture Order Error:', error);
      throw new HttpException('Failed to capture PayPal order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
