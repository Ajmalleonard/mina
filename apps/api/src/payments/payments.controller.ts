import { Controller, Post, Body, Get, Query, Req, Res, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './stripe.service';
import { PesapalService } from './pesapal.service';
import { PaypalService } from './paypal.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateStripeIntentDto, CreatePesapalOrderDto } from './dto/payment.dto';

@Controller('payments')
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);

  constructor(
    private readonly stripeService: StripeService,
    private readonly pesapalService: PesapalService,
    private readonly paypalService: PaypalService,
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  @Post('checkout')
  async checkout(@Body() body: any) {
    const { donorName, donorEmail, donorPhone, message, amount, currency, paymentMethod, activityId } = body;

    // 1. Validate activity
    if (!activityId) throw new HttpException('Activity ID is required', HttpStatus.BAD_REQUEST);
    const activity = await this.prisma.activity.findUnique({ where: { id: activityId } });
    if (!activity) throw new HttpException('Activity not found', HttpStatus.NOT_FOUND);

    // 2. Create pending Donation record
    const donation = await this.prisma.donation.create({
      data: {
        donorName: donorName || 'Anonymous',
        donorEmail: donorEmail || 'no-reply@minafoundation.org',
        donorPhone: donorPhone || null,
        message: message || null,
        amount: Number(amount),
        currency: currency || 'USD',
        paymentMethod,
        activityId: activity.id,
        status: 'pending',
      },
    });

    // 3. Send Initiation Email
    if (donorEmail) {
      this.mailService.sendDonationInitiatedEmail(
        donorEmail,
        donorName || 'Generous Donor',
        Number(amount),
        currency || 'USD',
        activity.title,
      ).catch(err => this.logger.error('Email failed: ', err));
    }

    // 4. Call Payment Gateway
    let paymentResponse: any = null;
    
    if (paymentMethod === 'paypal') {
      const order = await this.paypalService.createOrder(Number(amount), currency || 'USD');
      // Update donation with tracking ID
      await this.prisma.donation.update({
        where: { id: donation.id },
        data: { trackingId: order.id },
      });
      // Paypal returns links, the frontend needs the "approve" link
      const approveLink = order.links.find((link: any) => link.rel === 'approve');
      paymentResponse = { type: 'redirect', url: approveLink?.href, orderId: order.id };
    } 
    else if (paymentMethod === 'pesapal') {
      const splitName = (donorName || 'Generous Donor').split(' ');
      const pesapalOrder = await this.pesapalService.createOrder({
        amount: Number(amount),
        email: donorEmail || 'no-reply@minafoundation.org',
        firstName: splitName[0] || 'Generous',
        lastName: splitName.slice(1).join(' ') || 'Donor',
        description: `Donation for ${activity.title}`,
      });
      
      // Pesapal generates its own tracking ID
      await this.prisma.donation.update({
        where: { id: donation.id },
        data: { trackingId: pesapalOrder.order_tracking_id },
      });
      paymentResponse = { type: 'redirect', url: pesapalOrder.redirect_url };
    }
    else {
      throw new HttpException('Unsupported payment method', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'Checkout initiated',
      donationId: donation.id,
      payment: paymentResponse,
    };
  }

  @Post('paypal/create-order')
  async createPaypalOrder(@Body('amount') amount: number, @Body('currency') currency: string) {
    return this.paypalService.createOrder(amount, currency);
  }

  @Post('paypal/capture-order')
  async capturePaypalOrder(@Body('orderID') orderID: string) {
    return this.paypalService.captureOrder(orderID);
  }

  /**
   * POST /payments/stripe/create-intent
   * Creates a Stripe PaymentIntent and returns the client secret.
   */
  @Post('stripe/create-intent')
  async createStripeIntent(@Body() dto: CreateStripeIntentDto) {
    this.logger.log(`Creating Stripe intent: $${dto.amount}`);
    const clientSecret = await this.stripeService.createPaymentIntent(
      dto.amount,
      dto.isMonthly,
    );
    return { clientSecret };
  }

  /**
   * POST /payments/pesapal/order
   * Authenticates with PesaPal, registers IPN, and submits a new order.
   */
  @Post('pesapal/order')
  async createPesapalOrder(@Body() dto: CreatePesapalOrderDto) {
    this.logger.log(`Creating PesaPal order: $${dto.amount} for ${dto.email}`);
    return this.pesapalService.createOrder(dto);
  }

  /**
   * GET /payments/pesapal/ipn
   * Handles PesaPal IPN callbacks (Instant Payment Notification).
   */
  @Get('pesapal/ipn')
  async handlePesapalIpnGet(
    @Query('OrderTrackingId') orderTrackingId: string,
    @Query('OrderMerchantReference') orderMerchantReference: string,
  ) {
    this.logger.log(`IPN GET received: ${orderTrackingId}`);
    if (!orderTrackingId) {
      return { error: 'Missing OrderTrackingId', status: 400 };
    }
    const status = await this.pesapalService.getTransactionStatus(orderTrackingId);
    this.logger.log(`IPN transaction status: ${JSON.stringify(status)}`);
    return { status: 200, message: 'IPN Received' };
  }

  /**
   * POST /payments/pesapal/ipn
   * Handles PesaPal IPN callbacks via POST.
   */
  @Post('pesapal/ipn')
  async handlePesapalIpnPost(@Body() body: any) {
    this.logger.log(`IPN POST received: ${JSON.stringify(body)}`);
    const orderTrackingId = body?.OrderTrackingId;
    if (orderTrackingId) {
      const status = await this.pesapalService.getTransactionStatus(orderTrackingId);
      this.logger.log(`IPN transaction status: ${JSON.stringify(status)}`);
    }
    return { status: 200, message: 'IPN Received' };
  }
}
