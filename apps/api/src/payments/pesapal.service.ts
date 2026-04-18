import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { CreatePesapalOrderDto } from './dto/payment.dto';

@Injectable()
export class PesapalService {
  private readonly logger = new Logger(PesapalService.name);
  private readonly baseUrl: string;
  private readonly consumerKey: string;
  private readonly consumerSecret: string;
  private readonly appUrl: string;
  private readonly frontendUrl: string;

  constructor(private configService: ConfigService) {
    const env = this.configService.get<string>('PESAPAL_ENV', 'sandbox');
    this.baseUrl =
      env === 'production'
        ? 'https://pay.pesapal.com/v3/api'
        : 'https://cybqa.pesapal.com/pesapalv3/api';

    this.consumerKey = this.configService.get<string>('PESAPAL_CONSUMER_KEY', '');
    this.consumerSecret = this.configService.get<string>('PESAPAL_CONSUMER_SECRET', '');
    this.appUrl = this.configService.get<string>('APP_URL', 'http://localhost:3000');
    this.frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000');

    if (!this.consumerKey || !this.consumerSecret) {
      this.logger.warn('PesaPal credentials are missing — PesaPal payments will fail.');
    }
  }

  /**
   * Authenticate with PesaPal to get a Bearer token (valid for 5 minutes).
   */
  private async getAccessToken(): Promise<string> {
    this.logger.log('Authenticating with PesaPal...');

    const response = await fetch(`${this.baseUrl}/Auth/RequestToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        consumer_key: this.consumerKey,
        consumer_secret: this.consumerSecret,
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      this.logger.error(`PesaPal auth failed (${response.status}): ${responseText}`);
      throw new HttpException(
        `PesaPal authentication failed`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data = JSON.parse(responseText);
    if (!data.token) {
      throw new HttpException(
        'No token in PesaPal response',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return data.token;
  }

  /**
   * Register the IPN (Instant Payment Notification) URL with PesaPal.
   */
  private async registerIPN(token: string): Promise<string> {
    const ipnUrl = `${this.appUrl}/payments/pesapal/ipn`;

    const response = await fetch(`${this.baseUrl}/URLSetup/RegisterIPN`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: ipnUrl,
        ipn_notification_type: 'POST',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`IPN registration failed (${response.status}): ${errorText}`);
      throw new HttpException(
        'Failed to register IPN',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data = await response.json();
    return data.ipn_id;
  }

  /**
   * Create a PesaPal order and return the redirect URL.
   */
  async createOrder(dto: CreatePesapalOrderDto) {
    // 1. Authenticate
    const token = await this.getAccessToken();

    // 2. Register IPN
    const notificationId = await this.registerIPN(token);

    // 3. Build order
    const orderId = uuidv4();
    const callbackUrl = `${this.frontendUrl}/donate/payment-result`;

    const orderData: any = {
      id: orderId,
      currency: 'USD',
      amount: dto.amount,
      description: dto.description || 'Donation to Mina Foundation',
      callback_url: callbackUrl,
      notification_id: notificationId,
      billing_address: {
        email_address: dto.email,
        first_name: dto.firstName,
        last_name: dto.lastName,
        country_code: 'TZ',
      },
    };

    // 4. Add subscription details for monthly donations
    if (dto.isMonthly) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 5);

      const formatDate = (date: Date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}-${m}-${y}`;
      };

      orderData.subscription_details = {
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        frequency: 'MONTHLY',
      };
    }

    // 5. Submit order
    this.logger.log(`Submitting order ${orderId} to PesaPal`);
    const response = await fetch(
      `${this.baseUrl}/Transactions/SubmitOrderRequest`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Order submission failed: ${errorText}`);
      throw new HttpException(
        'Payment gateway error',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await response.json();

    if (result.error) {
      this.logger.error(`Pesapal order creation failed: ${JSON.stringify(result.error)}`);
      throw new HttpException(
        result.error.message || 'Pesapal gateway error',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.log(`Order ${orderId} created successfully`);

    return {
      redirect_url: result.redirect_url,
      order_tracking_id: result.order_tracking_id,
      merchant_reference: result.merchant_reference,
    };
  }

  /**
   * Get PesaPal transaction status by order tracking ID.
   */
  async getTransactionStatus(orderTrackingId: string) {
    const token = await this.getAccessToken();

    const response = await fetch(
      `${this.baseUrl}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new HttpException(
        `Failed to get transaction status: ${response.status}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return response.json();
  }
}
