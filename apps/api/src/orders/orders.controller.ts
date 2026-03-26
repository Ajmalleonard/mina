import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('checkout')
  createOrder(@Request() req, @Body() body: { items: any[]; paymentMethod: string; donorDetails: any }) {
    const userId = req.user?.userId || null;
    return this.ordersService.createOrderFromItems(body.items, body.paymentMethod, body.donorDetails, userId);
  }

  @Post('temporary')
  saveTemporaryOrder(@Request() req, @Body() body: { items: any[]; donorDetails: any }) {
    const userId = req.user?.userId || null;
    return this.ordersService.upsertTemporaryOrder(body.items, body.donorDetails, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserOrders(@Request() req) {
    return this.ordersService.getUserOrders(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOrder(@Request() req, @Param('id') id: string) {
    return this.ordersService.getOrder(id, req.user.userId);
  }
}
