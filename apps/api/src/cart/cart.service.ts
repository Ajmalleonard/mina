import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../prisma/generated/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { activity: true } } },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: { include: { activity: true } } },
      });
    }

    return cart;
  }

  async addToCart(userId: string, activityId: string, amount: number, quantity: number = 1) {
    const cart = await this.getCart(userId);
    
    const existingItem = cart.items.find(
      (item) => item.activityId === activityId && item.amount === amount
    );

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          activityId,
          amount,
          quantity,
        },
      });
    }
  }

  async removeFromCart(userId: string, cartItemId: string) {
    const cart = await this.getCart(userId);
    const item = cart.items.find((i) => i.id === cartItemId);
    if (!item) {
      throw new NotFoundException('Item not found in cart');
    }

    return this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }
  
  async clearCart(userId: string) {
    const cart = await this.getCart(userId);
    return this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }
}
