import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsController } from './payments.controller';
import { StripeService } from './stripe.service';
import { PesapalService } from './pesapal.service';
import { PaypalService } from './paypal.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [ConfigModule, PrismaModule, MailModule],
  controllers: [PaymentsController],
  providers: [StripeService, PesapalService, PaypalService],
  exports: [StripeService, PesapalService, PaypalService],
})
export class PaymentsModule {}
