import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PaymentsModule } from './payments/payments.module';
import { DonationsModule } from './donations/donations.module';
import { PrismaModule } from './prisma/prisma.module';
import { ActivitiesModule } from './activities/activities.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CartModule } from "./cart/cart.module";
import { OrdersModule } from "./orders/orders.module";
import { PromotionsModule } from './promotions/promotions.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    PrismaModule,
    ActivitiesModule,
    PaymentsModule,
    DonationsModule,
    MailModule,
    AuthModule,
    UsersModule,
    CartModule,
    OrdersModule,
    PromotionsModule,
    UploadsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
