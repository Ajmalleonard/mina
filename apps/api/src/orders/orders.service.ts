import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { PesapalService } from '../payments/pesapal.service';
import { PaypalService } from '../payments/paypal.service';
import { MailService } from '../mail/mail.service';
import { Prisma, Order } from '../../prisma/generated/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
    private pesapalService: PesapalService,
    private paypalService: PaypalService,
    private mailService: MailService,
  ) {}

  async createOrderFromItems(items: any[], paymentMethod: string, donorDetails: any, userId?: string) {
    if (!items || items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);

    // Create Order
    const order = await this.prisma.order.create({
      data: {
        userId,
        totalAmount,
        currency: 'USD', 
        paymentMethod,
        donorEmail: donorDetails.email,
        donorName: donorDetails.name,
        donorPhone: donorDetails.phone,
        status: 'PENDING',
        items: {
          create: items.map(item => ({
            amount: item.amount * item.quantity, 
            activityId: item.activityId,
            currency: 'USD',
            donorEmail: donorDetails.email,
            donorName: donorDetails.name,
          }))
        }
      },
    });

    // If logged in, optionally clear cart (though we now use local storage mostly)
    if (userId) {
      try {
        await this.cartService.clearCart(userId);
      } catch (e) {
        // Ignore if no backend cart exists
      }
    }

    // Process Payment
    let paymentResponse: any = {};
    
    if (paymentMethod === 'pesapal') {
      const pesapalOrder = await this.pesapalService.createOrder({
        amount: totalAmount,
        email: donorDetails.email,
        firstName: donorDetails.name.split(' ')[0] || 'Generous',
        lastName: donorDetails.name.split(' ').slice(1).join(' ') || 'Donor',
        description: `Donation Order ${order.id}`,
      });
      await this.prisma.order.update({
        where: { id: order.id },
        data: { paymentId: pesapalOrder.order_tracking_id },
      });
      paymentResponse.redirectUrl = pesapalOrder.redirect_url;
    } else if (paymentMethod === 'paypal') {
      const pesapalOrder = await this.pesapalService.createOrder({
        amount: totalAmount,
        email: donorDetails.email,
        firstName: donorDetails.name.split(' ')[0] || 'Generous',
        lastName: donorDetails.name.split(' ').slice(1).join(' ') || 'Donor',
        description: `Donation Order ${order.id}`,
      });
      await this.prisma.order.update({
        where: { id: order.id },
        data: { paymentId: pesapalOrder.order_tracking_id },
      });
      paymentResponse.redirectUrl = pesapalOrder.redirect_url;
    } else if (paymentMethod === 'paypal') {
      const paypalOrder = await this.paypalService.createOrder(totalAmount, 'EUR', order.id);
      const approveLink = paypalOrder.links.find((link: any) => link.rel === 'approve');
      await this.prisma.order.update({
        where: { id: order.id },
        data: { paymentId: paypalOrder.id },
      });
      paymentResponse.redirectUrl = approveLink?.href;
      paymentResponse.paypalOrderId = paypalOrder.id;
    }

    // Send confirmation email (non-blocking)
    if (donorDetails.email) {
      this.mailService.sendDonationConfirmationEmail(
        donorDetails.email,
        donorDetails.name,
        totalAmount,
        'EUR',
        items.map((item) => ({
          title: item.activity?.title || item.activityId,
          amount: item.amount,
          quantity: item.quantity,
        })),
      ).catch(() => { /* ignore email errors */ });
    }

    return { order, ...paymentResponse };
  }

  async upsertTemporaryOrder(items: any[], donorDetails: any, userId?: string) {
    if (!items || items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);

    const order = await this.prisma.order.create({
      data: {
        userId,
        totalAmount,
        currency: 'EUR',
        paymentMethod: 'pending',
        donorEmail: donorDetails.email,
        donorName: donorDetails.name,
        donorPhone: donorDetails.phone || null,
        status: 'PENDING',
        items: {
          create: items.map(item => ({
            amount: item.amount * item.quantity,
            activityId: item.activityId,
            currency: 'EUR',
            donorEmail: donorDetails.email,
            donorName: donorDetails.name,
          }))
        }
      },
    });

    return { orderId: order.id, totalAmount };
  }

  async getOrder(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { activity: true } } },
    });
    
    if (!order || order.userId !== userId) {
       throw new NotFoundException('Order not found');
    }
    
    return order;
  }
  
  async getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { activity: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
