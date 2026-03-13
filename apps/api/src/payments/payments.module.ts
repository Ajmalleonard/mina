import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsController } from './payments.controller';
import { StripeService } from './stripe.service';
import { PesapalService } from './pesapal.service';
import { PaypalService } from './paypal.service';

@Module({
  imports: [ConfigModule],
  controllers: [PaymentsController],
  providers: [StripeService, PesapalService, PaypalService],
  exports: [StripeService, PesapalService, PaypalService],
})
export class PaymentsModule {}
