import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminActivitiesController } from './admin-activities.controller';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';

@Module({
  imports: [AuthModule],
  controllers: [ActivitiesController, AdminActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
