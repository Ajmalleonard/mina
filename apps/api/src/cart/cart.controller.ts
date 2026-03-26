import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('add')
  addToCart(@Request() req, @Body() body: { activityId: string; amount: number; quantity?: number }) {
    return this.cartService.addToCart(req.user.userId, body.activityId, body.amount, body.quantity || 1);
  }

  @Delete(':itemId')
  removeFromCart(@Request() req, @Param('itemId') itemId: string) {
    return this.cartService.removeFromCart(req.user.userId, itemId);
  }
}
