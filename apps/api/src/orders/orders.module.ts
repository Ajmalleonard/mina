import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CartModule } from '../cart/cart.module';
import { PaymentsModule } from '../payments/payments.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [PrismaModule, CartModule, PaymentsModule, MailModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
